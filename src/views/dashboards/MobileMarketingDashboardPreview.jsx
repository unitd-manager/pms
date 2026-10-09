import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  AlertCircle, Calendar, CheckCircle, Clock, Filter, Layers, List, RefreshCw, X,
} from 'react-feather';
import { Chart } from 'react-google-charts';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import './mobileMarketingDashboardPreview.scss';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const PROJECT_TITLE = 'Digital Marketing Website';
// Temporarily hides: Milestone timeline, Task status, Progress by milestone.
// Set to true to show them again.
const SHOW_HIDDEN_SECTIONS = false;
// Every <Chart> asks for the same packages so Google's loader is only set up once.
const CHART_PACKAGES = ['corechart', 'controls', 'gantt'];
const EMPTY_FILTERS = {
  startDate: '', endDate: '', milestoneId: '', taskId: '', employeeId: '', status: '',
};
const COLORS = {
  done: '#25a578',
  progress: '#e8a33d',
  pending: '#c9d1de',
  overdue: '#d9534f',
  primary: '#4e6cf5',
  muted: '#9aa5b8',
};
const BUCKET_LABEL = { done: 'Done', progress: 'In progress', pending: 'Not started' };
const STATUS_OPTIONS = [
  ['done', 'Done'],
  ['progress', 'In progress'],
  ['pending', 'Not started'],
  ['overdue', 'Overdue'],
];
const AXIS_TEXT = { color: '#596780', fontSize: 11 };
const LABEL_TEXT = { color: '#34415a', fontSize: 11 };
const GRID = { color: '#edf0f5' };
const TASK_PAGE = 20;
const DAY_MS = 86400000;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const normalize = (value) => String(value || '').trim().toLowerCase();

const getRows = (response, resourceName) => {
  const rows = response && response.data && response.data.data;
  if (!Array.isArray(rows)) throw new Error(`PMS returned an invalid ${resourceName} response.`);
  return rows;
};

// PMS stores dates as text, in either yyyy-mm-dd or dd-mm-yyyy form.
const parseDate = (value) => {
  if (!value) return null;
  const text = String(value).trim();
  const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
  const dmy = text.match(/^(\d{2})-(\d{2})-(\d{4})/);
  if (dmy) return new Date(Number(dmy[3]), Number(dmy[2]) - 1, Number(dmy[1]));
  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatDate = (date) => {
  if (!date) return 'No date';
  const sameYear = date.getFullYear() === new Date().getFullYear();
  return date.toLocaleDateString(undefined, sameYear
    ? { day: 'numeric', month: 'short' }
    : { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatHours = (value) => (Number.parseFloat(value) || 0)
  .toLocaleString(undefined, { maximumFractionDigits: 1 });

const dateKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const fullName = (employee) => `${employee.first_name || ''} ${employee.last_name || ''}`.trim();

const getEmployeeName = (item, employees) => {
  const direct = item.employee_name || item.first_name || item.staff_name;
  if (direct) return direct;
  const match = employees.find((entry) => String(entry.employee_id) === String(item.employee_id));
  return match ? fullName(match) : 'Unassigned';
};

// Maps the free-text PMS statuses (Completed, InProgress, Not Started, OnHold ...)
// onto three buckets. Returns null when the text is blank or unrecognised.
const statusBucket = (value) => {
  const text = normalize(value);
  if (!text) return null;
  if (/^(not|un)/.test(text) || text.includes('pending') || text.includes('hold')) return 'pending';
  if (text.includes('complet') || text === 'done' || text.includes('closed')) return 'done';
  if (text.includes('progress') || text.includes('ongoing') || text.includes('started') || text === 'wip') return 'progress';
  return null;
};

// The completion column is messy ("100%", "completed", "1", ""), so only
// trust percentages and words, never a bare number.
const completionBucket = (value) => {
  const text = normalize(value);
  if (!text) return null;
  const pct = text.match(/^(\d+(?:\.\d+)?)\s*%$/);
  if (pct) {
    const n = Number(pct[1]);
    if (n >= 100) return 'done';
    return n > 0 ? 'progress' : 'pending';
  }
  return statusBucket(text);
};

// Deadline for a task: its end date, otherwise its start date (flagged as approximate).
const taskDue = (task) => {
  const end = parseDate(task.end_date);
  if (end) return { date: end, approx: false };
  const start = parseDate(task.start_date);
  return start ? { date: start, approx: true } : null;
};

const dueLabel = (days) => {
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return 'Due today';
  return `Due in ${days}d`;
};

const dueTone = (days) => {
  if (days < 0) return 'overdue';
  if (days <= 7) return 'soon';
  return 'ok';
};

// ---------------------------------------------------------------------------
// Small presentational components
// ---------------------------------------------------------------------------
const Empty = ({ children }) => <p className="marketing-empty">{children}</p>;
Empty.propTypes = { children: PropTypes.node.isRequired };

const Section = ({
  title, count, note, children,
}) => (
  <section className="marketing-section marketing-chart-section">
    <div className="marketing-section__heading">
      <h2>{title}</h2>
      {count !== undefined && <span className="marketing-count">{count}</span>}
    </div>
    {note && <p className="marketing-chart__note">{note}</p>}
    {children}
  </section>
);
Section.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  note: PropTypes.string,
  children: PropTypes.node.isRequired,
};
Section.defaultProps = { count: undefined, note: '' };

const StatusPill = ({ bucket, label }) => (
  <span className={`marketing-status marketing-status--${bucket}`}>{label || BUCKET_LABEL[bucket]}</span>
);
StatusPill.propTypes = { bucket: PropTypes.string.isRequired, label: PropTypes.string };
StatusPill.defaultProps = { label: '' };

const DueBadge = ({ days }) => (
  <span className={`marketing-due marketing-due--${dueTone(days)}`}>{dueLabel(days)}</span>
);
DueBadge.propTypes = { days: PropTypes.number.isRequired };

const ProgressBar = ({ done, progress, total }) => {
  const pct = (n) => (total ? `${(n / total) * 100}%` : '0%');
  return (
    <div className="marketing-progress" role="img" aria-label={`${done} of ${total} tasks done`}>
      <span className="marketing-progress__done" style={{ width: pct(done) }} />
      <span className="marketing-progress__progress" style={{ width: pct(progress) }} />
    </div>
  );
};
ProgressBar.propTypes = {
  done: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

const DashboardFilters = ({
  milestones, tasks, employees, filters, setFilter, applyPreset,
}) => {
  const select = (id, label, name, allLabel, options) => (
    <label htmlFor={id}>
      <span>{label}</span>
      <select id={id} value={filters[name]} onChange={(e) => setFilter(name, e.target.value)}>
        <option value="">{allLabel}</option>
        {options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
      </select>
    </label>
  );

  return (
    <section className="marketing-filter-panel" aria-label="Dashboard filters">
      <div className="marketing-filter-presets">
        {[['week', 'Last 7 days'], ['month', 'Last 30 days'], ['thisMonth', 'This month'], ['all', 'All time']].map(([key, text]) => (
          <button type="button" key={key} onClick={() => applyPreset(key)}>{text}</button>
        ))}
      </div>
      <label htmlFor="marketing-start-date">
        <span>From date</span>
        <input id="marketing-start-date" type="date" value={filters.startDate} onChange={(e) => setFilter('startDate', e.target.value)} />
      </label>
      <label htmlFor="marketing-end-date">
        <span>To date</span>
        <input id="marketing-end-date" type="date" value={filters.endDate} onChange={(e) => setFilter('endDate', e.target.value)} />
      </label>
      {select('marketing-milestone', 'Milestone', 'milestoneId', 'All milestones', milestones)}
      {select('marketing-task', 'Task', 'taskId', 'All tasks', tasks)}
      {select('marketing-employee', 'Employee', 'employeeId', 'All employees', employees)}
      {select('marketing-status', 'Status', 'status', 'All statuses', STATUS_OPTIONS)}
    </section>
  );
};
DashboardFilters.propTypes = {
  milestones: PropTypes.arrayOf(PropTypes.array).isRequired,
  tasks: PropTypes.arrayOf(PropTypes.array).isRequired,
  employees: PropTypes.arrayOf(PropTypes.array).isRequired,
  filters: PropTypes.objectOf(PropTypes.string).isRequired,
  setFilter: PropTypes.func.isRequired,
  applyPreset: PropTypes.func.isRequired,
};

const DeadlineGroup = ({
  title, tone, items, limit,
}) => (
  <div className={`marketing-deadline-group marketing-deadline-group--${tone}`}>
    <h3>
      {title}
      <span>{items.length}</span>
    </h3>
    {items.slice(0, limit).map((item) => (
      <article className="marketing-list-item" key={item.key}>
        <div className="marketing-list-item__main">
          <span className="marketing-list-item__eyebrow">{item.kind}</span>
          <h4>{item.title}</h4>
          {item.owner && <span className="marketing-list-item__meta">{item.owner}</span>}
        </div>
        <div className="marketing-list-item__side">
          <span className="marketing-list-item__date">
            {formatDate(item.date)}
            {item.approx ? ' (start)' : ''}
          </span>
          <DueBadge days={item.days} />
        </div>
      </article>
    ))}
    {items.length > limit && <p className="marketing-chart__note">{`+${items.length - limit} more. Use filters to narrow.`}</p>}
  </div>
);
DeadlineGroup.propTypes = {
  title: PropTypes.string.isRequired,
  tone: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  limit: PropTypes.number,
};
DeadlineGroup.defaultProps = { limit: 6 };

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------
const MobileMarketingDashboardPreview = () => {
  const [project, setProject] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [timesheets, setTimesheets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [taskLimit, setTaskLimit] = useState(TASK_PAGE);
  const [loadedAt, setLoadedAt] = useState(null);

  const loadProjectData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const projects = getRows(await api.get('/project/getProjects'), 'projects');
      const selected = projects.find((item) => normalize(item.title) === normalize(PROJECT_TITLE));
      if (!selected) throw new Error(`The "${PROJECT_TITLE}" project was not found in PMS.`);

      const body = { project_id: selected.project_id };
      const [ms, ts, tm, em] = await Promise.all([
        api.post('/milestone/getMilestoneProjectById', body),
        api.post('/projecttask/getProjectTaskfilterById', body),
        api.post('/projecttimesheet/getTimeSheetProjectById', body),
        api.post('/projecttask/getEmployeeByID', body),
      ]);
      setProject(selected);
      setMilestones(getRows(ms, 'milestones'));
      setTasks(getRows(ts, 'tasks'));
      setTimesheets(getRows(tm, 'timesheets'));
      setEmployees(getRows(em, 'employees'));
      setLoadedAt(new Date());
    } catch (loadError) {
      setError(loadError.message || 'Could not load project data from PMS. Check the connection and refresh.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadProjectData(); }, [loadProjectData]);

  const today = useMemo(() => new Date(new Date().setHours(0, 0, 0, 0)), []);

  // ----- filters ----------------------------------------------------------
  const setFilter = useCallback((name, value) => {
    setFilters((current) => ({
      ...current,
      [name]: value,
      // A task belongs to one milestone, so changing the milestone resets the task.
      ...(name === 'milestoneId' ? { taskId: '' } : {}),
    }));
    setTaskLimit(TASK_PAGE);
  }, []);

  const applyPreset = useCallback((preset) => {
    const end = new Date();
    const start = new Date();
    if (preset === 'week') start.setDate(end.getDate() - 7);
    if (preset === 'month') start.setDate(end.getDate() - 30);
    if (preset === 'thisMonth') start.setDate(1);
    setFilters((current) => ({
      ...current,
      startDate: preset === 'all' ? '' : dateKey(start),
      endDate: preset === 'all' ? '' : dateKey(end),
    }));
    setTaskLimit(TASK_PAGE);
  }, []);

  const inRange = useCallback((date) => {
    const from = parseDate(filters.startDate);
    const to = parseDate(filters.endDate);
    if (!from && !to) return true;
    if (!date) return false;
    return (!from || date >= from) && (!to || date <= to);
  }, [filters.startDate, filters.endDate]);

  const overlapsRange = useCallback((startDate, endDate) => {
    const from = parseDate(filters.startDate);
    const to = parseDate(filters.endDate);
    if (!from && !to) return true;
    const s = startDate || endDate;
    const e = endDate || startDate;
    if (!s) return false;
    return (!to || s <= to) && (!from || e >= from);
  }, [filters.startDate, filters.endDate]);

  const hasFilter = Object.values(filters).some(Boolean);
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  // ----- milestones: remove duplicates PMS sometimes stores twice ---------
  const { uniqueMilestones, milestoneAlias } = useMemo(() => {
    const seen = new Map();
    const alias = {};
    const list = [];
    milestones.forEach((m) => {
      const id = String(m.project_milestone_id);
      const sig = [normalize(m.milestone_title), m.from_date, m.to_date].join('|');
      if (seen.has(sig)) {
        alias[id] = seen.get(sig);
        return;
      }
      seen.set(sig, id);
      list.push(m);
    });
    return { uniqueMilestones: list, milestoneAlias: alias };
  }, [milestones]);

  const milestoneOf = useCallback((task) => {
    const id = String(task.project_milestone_id || '');
    return milestoneAlias[id] || id;
  }, [milestoneAlias]);

  const milestoneTitle = useCallback((id) => {
    const match = uniqueMilestones.find((m) => String(m.project_milestone_id) === String(id));
    return match ? (match.milestone_title || 'Untitled milestone').trim() : '';
  }, [uniqueMilestones]);

  // ----- employees --------------------------------------------------------
  const employeeOptions = useMemo(() => {
    const unique = new Map();
    [...employees, ...tasks, ...timesheets].forEach((item) => {
      if (item.employee_id === undefined || item.employee_id === null || item.employee_id === '') return;
      unique.set(String(item.employee_id), {
        employee_id: item.employee_id,
        first_name: item.first_name || item.employee_name || item.staff_name || '',
        last_name: item.last_name || '',
      });
    });
    return [...unique.values()].sort((a, b) => fullName(a).localeCompare(fullName(b)));
  }, [employees, tasks, timesheets]);

  // ----- task status ------------------------------------------------------
  // Most PMS tasks have a blank status. Fall back to: completion %, then the
  // task's timesheet entries (all completed = done, any entry = in progress).
  const entriesByTask = useMemo(() => {
    const map = new Map();
    timesheets.forEach((entry) => {
      const id = String(entry.project_task_id || '');
      if (!id) return;
      if (!map.has(id)) map.set(id, []);
      map.get(id).push(entry);
    });
    return map;
  }, [timesheets]);

  const taskBucket = useCallback((task) => {
    const fromStatus = statusBucket(task.status);
    if (fromStatus) return fromStatus;
    if (parseDate(task.actual_completed_date)) return 'done';
    const fromCompletion = completionBucket(task.completion);
    if (fromCompletion) return fromCompletion;
    const entries = entriesByTask.get(String(task.project_task_id)) || [];
    if (entries.length === 0) return 'pending';
    return entries.every((entry) => statusBucket(entry.status) === 'done') ? 'done' : 'progress';
  }, [entriesByTask]);

  const isOverdue = useCallback((task) => {
    const due = taskDue(task);
    return Boolean(due) && due.date < today && taskBucket(task) !== 'done';
  }, [taskBucket, today]);

  // ----- filtered data ----------------------------------------------------
  const filteredTasks = useMemo(() => tasks.filter((task) => {
    if (filters.milestoneId && milestoneOf(task) !== filters.milestoneId) return false;
    if (filters.taskId && String(task.project_task_id) !== filters.taskId) return false;
    if (filters.employeeId && String(task.employee_id) !== filters.employeeId) return false;
    if (filters.status) {
      const ok = filters.status === 'overdue' ? isOverdue(task) : taskBucket(task) === filters.status;
      if (!ok) return false;
    }
    // Undated tasks fall back to the day they were created so a date filter does not hide them.
    const due = taskDue(task);
    return inRange(due ? due.date : parseDate(task.creation_date));
  }), [tasks, filters, inRange, isOverdue, taskBucket, milestoneOf]);

  const milestoneRows = useMemo(() => {
    const taskLevelFilter = Boolean(filters.taskId || filters.employeeId || filters.status);
    return uniqueMilestones.map((milestone) => {
      const id = String(milestone.project_milestone_id);
      const linked = filteredTasks.filter((task) => milestoneOf(task) === id);
      const count = (bucket) => linked.filter((task) => taskBucket(task) === bucket).length;
      const done = count('done');
      const progress = count('progress');
      const own = statusBucket(milestone.status);
      let bucket = own || 'pending';
      if (linked.length > 0) {
        if (done === linked.length) bucket = 'done';
        else if (done > 0 || progress > 0) bucket = 'progress';
        else bucket = own === 'done' ? 'done' : own || 'pending';
      }
      const start = parseDate(milestone.from_date);
      const due = parseDate(milestone.to_date);
      const taskDates = linked.map((task) => taskDue(task)).filter(Boolean).map((d) => d.date);
      let end = due || (taskDates.length ? new Date(Math.max(...taskDates)) : null);
      const begin = start || (taskDates.length ? new Date(Math.min(...taskDates)) : null);
      if (begin && (!end || end <= begin)) end = new Date(begin.getTime() + DAY_MS);
      let percent = 0;
      if (linked.length) percent = Math.round((done / linked.length) * 100);
      else if (bucket === 'done') percent = 100;
      return {
        id,
        milestone,
        title: (milestone.milestone_title || 'Untitled milestone').trim(),
        linked,
        total: linked.length,
        done,
        progress,
        pending: linked.length - done - progress,
        percent,
        bucket,
        start: begin,
        end,
        due,
        endIsEstimate: !due,
      };
    }).filter((row) => {
      if (filters.milestoneId && row.id !== filters.milestoneId) return false;
      if (taskLevelFilter && row.total === 0) return false;
      const dateOk = overlapsRange(parseDate(row.milestone.from_date), row.due) || row.total > 0;
      return dateOk;
    });
  }, [uniqueMilestones, filteredTasks, filters, milestoneOf, taskBucket, overlapsRange]);

  const filteredTimesheets = useMemo(() => {
    const allowed = (filters.milestoneId || filters.status)
      ? new Set(tasks
        .filter((task) => (!filters.milestoneId || milestoneOf(task) === filters.milestoneId)
          && (!filters.status || (filters.status === 'overdue' ? isOverdue(task) : taskBucket(task) === filters.status)))
        .map((task) => String(task.project_task_id)))
      : null;
    return timesheets.filter((entry) => {
      if (filters.employeeId && String(entry.employee_id) !== filters.employeeId) return false;
      if (filters.taskId && String(entry.project_task_id) !== filters.taskId) return false;
      if (!inRange(parseDate(entry.date) || parseDate(entry.creation_date))) return false;
      if (allowed && !allowed.has(String(entry.project_task_id || ''))) return false;
      return true;
    });
  }, [timesheets, tasks, filters, inRange, milestoneOf, isOverdue, taskBucket]);

  const hoursLogged = useMemo(() => filteredTimesheets
    .reduce((total, entry) => total + (Number.parseFloat(entry.hours) || 0), 0), [filteredTimesheets]);

  const hoursByTask = useMemo(() => {
    const map = new Map();
    timesheets.forEach((entry) => {
      const id = String(entry.project_task_id || '');
      map.set(id, (map.get(id) || 0) + (Number.parseFloat(entry.hours) || 0));
    });
    return map;
  }, [timesheets]);

  // ----- dropdown options (cascade: task list follows the milestone) ------
  const milestoneOptions = useMemo(() => uniqueMilestones.map((m) => [
    String(m.project_milestone_id),
    (m.milestone_title || 'Untitled milestone').trim(),
  ]), [uniqueMilestones]);

  const taskOptions = useMemo(() => tasks
    .filter((task) => !filters.milestoneId || milestoneOf(task) === filters.milestoneId)
    .map((task) => [
      String(task.project_task_id),
      `${(task.task_title || 'Untitled task').trim()} · ${getEmployeeName(task, employeeOptions)}`,
    ])
    .sort((a, b) => a[1].localeCompare(b[1])), [tasks, filters.milestoneId, milestoneOf, employeeOptions]);

  const employeeFilterOptions = useMemo(() => employeeOptions
    .map((e) => [String(e.employee_id), fullName(e) || `Employee ${e.employee_id}`]), [employeeOptions]);

  // ----- deadlines --------------------------------------------------------
  const deadlines = useMemo(() => {
    const fromMilestones = milestoneRows
      .filter((row) => row.due && row.bucket !== 'done')
      .map((row) => ({
        kind: 'Milestone', key: `m${row.id}`, title: row.title, date: row.due, approx: false, owner: '', bucket: row.bucket,
      }));
    const fromTasks = filteredTasks
      .filter((task) => taskBucket(task) !== 'done' && taskDue(task))
      .map((task) => {
        const due = taskDue(task);
        return {
          kind: 'Task',
          key: `t${task.project_task_id}`,
          title: (task.task_title || 'Untitled task').trim(),
          date: due.date,
          approx: due.approx,
          owner: getEmployeeName(task, employeeOptions),
          bucket: taskBucket(task),
        };
      });
    return [...fromMilestones, ...fromTasks]
      .map((item) => ({ ...item, days: Math.round((item.date - today) / DAY_MS) }))
      .sort((a, b) => a.date - b.date);
  }, [milestoneRows, filteredTasks, employeeOptions, taskBucket, today]);

  // Overdue: the most recently missed first, so year-old records do not bury current ones.
  const overdue = deadlines.filter((item) => item.days < 0).sort((a, b) => b.days - a.days);
  const thisWeek = deadlines.filter((item) => item.days >= 0 && item.days <= 7);
  const next30 = deadlines.filter((item) => item.days > 7 && item.days <= 30);
  const later = deadlines.filter((item) => item.days > 30);
  const overdueTaskCount = overdue.filter((item) => item.kind === 'Task').length;
  const dueSoonTaskCount = thisWeek.filter((item) => item.kind === 'Task').length;
  const noDueOpen = filteredTasks.filter((task) => taskBucket(task) !== 'done' && !taskDue(task));

  // ----- summary numbers --------------------------------------------------
  const taskCounts = useMemo(() => filteredTasks.reduce((counts, task) => {
    const bucket = taskBucket(task);
    return { ...counts, [bucket]: counts[bucket] + 1 };
  }, { done: 0, progress: 0, pending: 0 }), [filteredTasks, taskBucket]);

  const overallPercent = filteredTasks.length
    ? Math.round((taskCounts.done / filteredTasks.length) * 100)
    : null;
  const openTasks = taskCounts.progress + taskCounts.pending;
  const tasksWithoutStatus = tasks.filter((task) => !statusBucket(task.status)).length;
  const chartableMilestones = milestoneRows.filter((row) => row.total > 0);

  // ----- team -------------------------------------------------------------
  const teamRows = useMemo(() => {
    const rows = {};
    const row = (name) => {
      rows[name] = rows[name] || {
        name, done: 0, progress: 0, pending: 0, overdue: 0, hours: 0,
      };
      return rows[name];
    };
    filteredTasks.forEach((task) => {
      const r = row(getEmployeeName(task, employeeOptions));
      r[taskBucket(task)] += 1;
      if (isOverdue(task)) r.overdue += 1;
    });
    filteredTimesheets.forEach((entry) => {
      row(getEmployeeName(entry, employeeOptions)).hours += Number.parseFloat(entry.hours) || 0;
    });
    return Object.values(rows);
  }, [filteredTasks, filteredTimesheets, employeeOptions, taskBucket, isOverdue]);

  const employeeTaskRows = teamRows
    .filter((r) => r.done + r.progress + r.pending > 0)
    .sort((a, b) => (b.done + b.progress + b.pending) - (a.done + a.progress + a.pending));
  const hoursByEmployee = teamRows
    .filter((r) => r.hours > 0)
    .sort((a, b) => b.hours - a.hours);

  const hoursByDay = useMemo(() => Object.entries(filteredTimesheets.reduce((acc, entry) => {
    const date = parseDate(entry.date) || parseDate(entry.creation_date);
    if (!date) return acc;
    const key = dateKey(date);
    return { ...acc, [key]: (acc[key] || 0) + (Number.parseFloat(entry.hours) || 0) };
  }, {})).sort((a, b) => a[0].localeCompare(b[0])), [filteredTimesheets]);

  // ----- task list --------------------------------------------------------
  const taskList = useMemo(() => filteredTasks.map((task) => {
    const due = taskDue(task);
    return {
      task,
      bucket: taskBucket(task),
      due,
      days: due ? Math.round((due.date - today) / DAY_MS) : null,
      owner: getEmployeeName(task, employeeOptions),
      milestone: milestoneTitle(milestoneOf(task)),
      logged: hoursByTask.get(String(task.project_task_id)) || 0,
    };
  }).sort((a, b) => {
    if ((a.bucket === 'done') !== (b.bucket === 'done')) return a.bucket === 'done' ? 1 : -1;
    if (a.due && b.due) return a.due.date - b.due.date;
    if (a.due) return -1;
    return b.due ? 1 : 0;
  }), [filteredTasks, taskBucket, today, employeeOptions, milestoneTitle, milestoneOf, hoursByTask]);

  // -------------------------------------------------------------------------
  // Charts
  // -------------------------------------------------------------------------
  const loader = <div className="marketing-chart__loading">Loading chart…</div>;
  const rowsHeight = (rows, perRow = 46, extra = 80) => `${Math.max(220, rows * perRow + extra)}px`;

  const renderStatusDonut = () => {
    if (filteredTasks.length === 0) return <Empty>No tasks match these filters.</Empty>;
    return (
      <Chart
        chartType="PieChart"
        chartPackages={CHART_PACKAGES}
        width="100%"
        height="250px"
        data={[
          ['Status', 'Tasks'],
          ['Done', taskCounts.done],
          ['In progress', taskCounts.progress],
          ['Not started', taskCounts.pending],
        ]}
        options={{
          backgroundColor: 'transparent',
          pieHole: 0.58,
          colors: [COLORS.done, COLORS.progress, COLORS.pending],
          pieSliceText: 'value',
          pieSliceTextStyle: { color: '#fff', fontSize: 12 },
          legend: { position: 'bottom', textStyle: AXIS_TEXT },
          chartArea: { top: 10, width: '90%', height: '72%' },
        }}
        loader={loader}
      />
    );
  };

  const renderMilestoneProgress = () => {
    if (chartableMilestones.length === 0) return <Empty>No milestones with tasks match these filters.</Empty>;
    return (
      <Chart
        chartType="BarChart"
        chartPackages={CHART_PACKAGES}
        width="100%"
        height={rowsHeight(chartableMilestones.length)}
        data={[
          ['Milestone', 'Done', 'In progress', 'Not started'],
          ...chartableMilestones.map((r) => [r.title, r.done, r.progress, r.pending]),
        ]}
        options={{
          backgroundColor: 'transparent',
          isStacked: 'percent',
          colors: [COLORS.done, COLORS.progress, COLORS.pending],
          chartArea: { left: '34%', top: 36, width: '60%', height: '74%' },
          bar: { groupWidth: '58%' },
          legend: { position: 'top', alignment: 'end', textStyle: AXIS_TEXT },
          hAxis: { format: 'percent', textStyle: AXIS_TEXT, gridlines: GRID },
          vAxis: { textStyle: LABEL_TEXT },
        }}
        loader={loader}
      />
    );
  };

  const renderGantt = () => {
    const rows = milestoneRows.filter((row) => row.start && row.end)
      .sort((a, b) => a.start - b.start);
    if (rows.length === 0) return <Empty>No milestones with dates match these filters.</Empty>;
    return (
      <div className="marketing-chart__scroll">
        <Chart
          chartType="Gantt"
          chartPackages={CHART_PACKAGES}
          width="100%"
          height={`${rows.length * 42 + 70}px`}
          data={[
            [
              { type: 'string', label: 'Task ID' },
              { type: 'string', label: 'Milestone' },
              { type: 'string', label: 'Resource' },
              { type: 'date', label: 'Start' },
              { type: 'date', label: 'End' },
              { type: 'number', label: 'Duration' },
              { type: 'number', label: 'Percent Complete' },
              { type: 'string', label: 'Dependencies' },
            ],
            ...rows.map((r) => [`m${r.id}`, r.title, 'Milestone', r.start, r.end, null, r.percent, null]),
          ]}
          options={{
            height: rows.length * 42 + 70,
            gantt: {
              trackHeight: 42,
              barHeight: 18,
              labelStyle: { fontSize: 11, color: '#34415a' },
              palette: [{ color: COLORS.primary, dark: '#2f49c4', light: '#c9d3fb' }],
            },
          }}
          loader={loader}
        />
      </div>
    );
  };

  const renderDeadlineBuckets = () => {
    const bars = [
      ['Overdue', overdue.length, COLORS.overdue],
      ['This week', thisWeek.length, COLORS.progress],
      ['Next 30 days', next30.length, COLORS.primary],
      ['Later', later.length, COLORS.done],
      ['No due date', noDueOpen.length, COLORS.muted],
    ];
    if (bars.every((b) => b[1] === 0)) return <Empty>No open deadlines match these filters.</Empty>;
    return (
      <Chart
        chartType="ColumnChart"
        chartPackages={CHART_PACKAGES}
        width="100%"
        height="260px"
        data={[
          ['When', 'Open items', { role: 'style' }, { role: 'annotation' }],
          ...bars.map(([label, n, color]) => [label, n, `color: ${color}`, String(n)]),
        ]}
        options={{
          backgroundColor: 'transparent',
          legend: { position: 'none' },
          chartArea: {
            left: 32, top: 18, width: '92%', height: '70%',
          },
          bar: { groupWidth: '62%' },
          hAxis: { textStyle: AXIS_TEXT },
          vAxis: {
            minValue: 0, format: '0', textStyle: AXIS_TEXT, gridlines: GRID,
          },
        }}
        loader={loader}
      />
    );
  };

  const renderEmployeeTasks = () => {
    if (employeeTaskRows.length === 0) return <Empty>No tasks match these filters.</Empty>;
    return (
      <Chart
        chartType="BarChart"
        chartPackages={CHART_PACKAGES}
        width="100%"
        height={rowsHeight(employeeTaskRows.length)}
        data={[
          ['Employee', 'Done', 'In progress', 'Not started'],
          ...employeeTaskRows.map((r) => [r.name, r.done, r.progress, r.pending]),
        ]}
        options={{
          backgroundColor: 'transparent',
          isStacked: true,
          colors: [COLORS.done, COLORS.progress, COLORS.pending],
          chartArea: { left: '26%', top: 36, width: '68%', height: '70%' },
          bar: { groupWidth: '58%' },
          legend: { position: 'top', alignment: 'end', textStyle: AXIS_TEXT },
          hAxis: {
            format: '0', minValue: 0, textStyle: AXIS_TEXT, gridlines: GRID,
          },
          vAxis: { textStyle: LABEL_TEXT },
        }}
        loader={loader}
      />
    );
  };

  const renderHoursByEmployee = () => {
    if (hoursByEmployee.length === 0) return <Empty>No timesheet entries match these filters.</Empty>;
    return (
      <Chart
        chartType="BarChart"
        chartPackages={CHART_PACKAGES}
        width="100%"
        height={rowsHeight(hoursByEmployee.length, 46, 70)}
        data={[
          ['Employee', 'Hours', { role: 'annotation' }],
          ...hoursByEmployee.map((r) => [r.name, r.hours, formatHours(r.hours)]),
        ]}
        options={{
          backgroundColor: 'transparent',
          colors: [COLORS.primary],
          legend: { position: 'none' },
          chartArea: { left: '26%', top: 16, width: '64%', height: '76%' },
          bar: { groupWidth: '58%' },
          hAxis: { minValue: 0, textStyle: AXIS_TEXT, gridlines: GRID },
          vAxis: { textStyle: LABEL_TEXT },
        }}
        loader={loader}
      />
    );
  };

  const renderHoursByDay = () => {
    if (hoursByDay.length === 0) return <Empty>No timesheet entries match these filters.</Empty>;
    return (
      <Chart
        chartType="ColumnChart"
        chartPackages={CHART_PACKAGES}
        width="100%"
        height="260px"
        data={[
          ['Date', 'Hours'],
          ...hoursByDay.map(([key, hours]) => [formatDate(parseDate(key)), hours]),
        ]}
        options={{
          backgroundColor: 'transparent',
          colors: [COLORS.primary],
          legend: { position: 'none' },
          chartArea: {
            left: 36, top: 12, width: '90%', height: '66%',
          },
          bar: { groupWidth: '60%' },
          hAxis: { textStyle: { color: '#758198', fontSize: 10 }, slantedText: true, slantedTextAngle: 45 },
          vAxis: { minValue: 0, textStyle: AXIS_TEXT, gridlines: GRID },
        }}
        loader={loader}
      />
    );
  };

  // -------------------------------------------------------------------------
  // Page sections
  // -------------------------------------------------------------------------
  const renderOverview = () => (
    <>
      <section className="marketing-kpis" aria-label="Project summary">
        <article>
          <span className="marketing-kpi__icon marketing-kpi__icon--green"><CheckCircle size={16} /></span>
          <strong>{overallPercent === null ? '—' : `${overallPercent}%`}</strong>
          <span>Tasks done</span>
        </article>
        <article>
          <span className="marketing-kpi__icon marketing-kpi__icon--blue"><Layers size={16} /></span>
          <strong>{milestoneRows.length}</strong>
          <span>Milestones</span>
        </article>
        <article>
          <span className="marketing-kpi__icon marketing-kpi__icon--amber"><List size={16} /></span>
          <strong>{openTasks}</strong>
          <span>Open tasks</span>
        </article>
        <article>
          <span className="marketing-kpi__icon marketing-kpi__icon--red"><AlertCircle size={16} /></span>
          <strong>{overdueTaskCount}</strong>
          <span>Overdue tasks</span>
        </article>
        <article>
          <span className="marketing-kpi__icon marketing-kpi__icon--amber"><Calendar size={16} /></span>
          <strong>{dueSoonTaskCount}</strong>
          <span>Tasks due this week</span>
        </article>
        <article>
          <span className="marketing-kpi__icon marketing-kpi__icon--blue"><Clock size={16} /></span>
          <strong>{formatHours(hoursLogged)}</strong>
          <span>Hours logged</span>
        </article>
      </section>

      {/* Hidden (not deleted): Task status + Progress by milestone */}
      {SHOW_HIDDEN_SECTIONS && (
        <div className="marketing-grid">
          <Section title="Task status" count={`${filteredTasks.length} tasks`}>
            {renderStatusDonut()}
          </Section>
          <Section
            title="Progress by milestone"
            count={`${chartableMilestones.length} milestones`}
            note="Share of each milestone's tasks that are done, in progress or not started."
          >
            {renderMilestoneProgress()}
          </Section>
        </div>
      )}

      {SHOW_HIDDEN_SECTIONS &&(noDueOpen.length > 0 || tasksWithoutStatus > 0) && (
        <aside className="marketing-dataquality">
          <AlertCircle size={16} />
          <p>
            <strong>Data check.</strong>
            {` ${noDueOpen.length} open tasks have no due date and ${tasksWithoutStatus} of ${tasks.length} tasks have no status in PMS. `}
            Progress is worked out from timesheets for those, and undated tasks cannot appear in Deadlines. Setting an end date and status on tasks makes this dashboard more accurate.
          </p>
        </aside>
      )}
    </>
  );

  // Hidden (not deleted): Milestone timeline
  const renderMilestoneTimeline = () => {
    if (!SHOW_HIDDEN_SECTIONS) return null;
    return (
      <Section
        title="Milestone timeline"
        count={`${milestoneRows.length} milestones`}
        note="Bars show start to end date, filled to the share of tasks done. If a milestone has no end date in PMS, its latest task date is used."
      >
        {renderGantt()}
      </Section>
    );
  };

  const renderMilestoneDetails = () => (
    <Section title="Milestone details" count={`${milestoneRows.length}`}>
      {milestoneRows.length === 0 && <Empty>No milestones match these filters.</Empty>}
      <div className="marketing-cards">
        {[...milestoneRows].sort((a, b) => (a.due || a.start || 0) - (b.due || b.start || 0)).map((row) => {
          const days = row.due ? Math.round((row.due - today) / DAY_MS) : null;
          return (
            <article className="marketing-card" key={row.id}>
              <div className="marketing-card__top">
                <h4>{row.title}</h4>
                <StatusPill bucket={row.bucket} />
              </div>
              <p className="marketing-card__dates">
                {`${formatDate(parseDate(row.milestone.from_date))} → ${row.due ? formatDate(row.due) : 'no end date'}`}
                {days !== null && row.bucket !== 'done' && <DueBadge days={days} />}
              </p>
              <ProgressBar done={row.done} progress={row.progress} total={row.total} />
              <p className="marketing-card__meta">
                {row.total
                  ? `${row.percent}% done · ${row.done} done, ${row.progress} in progress, ${row.pending} not started`
                  : 'No tasks linked to this milestone'}
              </p>
            </article>
          );
        })}
      </div>
    </Section>
  );

  const renderEmployeeCharts = () => (
    <div className="marketing-grid">
      <Section title="Tasks by employee" count={`${employeeTaskRows.length} employees`} note="Each employee's tasks that are done, in progress or not started.">
        {renderEmployeeTasks()}
      </Section>
      <Section title="Hours by employee" count={`${formatHours(hoursLogged)} hrs`}>
        {renderHoursByEmployee()}
      </Section>
    </div>
  );

  const renderHoursByDaySection = () => (
    <Section title="Hours by day" count={`${hoursByDay.length} days`}>
      {renderHoursByDay()}
    </Section>
  );

  const renderTasks = () => (
    <Section title="Tasks" count={`${taskList.length} tasks`} note="Open tasks first, soonest due date on top.">
      {taskList.length === 0 && <Empty>No tasks match these filters.</Empty>}
      <div className="marketing-cards">
        {taskList.slice(0, taskLimit).map((row) => {
          const estimate = Number.parseFloat(row.task.estimated_hours) || 0;
          return (
            <article className="marketing-card" key={row.task.project_task_id}>
              <div className="marketing-card__top">
                <h4>{(row.task.task_title || 'Untitled task').trim()}</h4>
                <StatusPill bucket={row.bucket} />
              </div>
              <p className="marketing-card__meta">
                {row.owner}
                {row.milestone ? ` · ${row.milestone}` : ''}
              </p>
              <p className="marketing-card__dates">
                {row.due ? `${formatDate(row.due.date)}${row.due.approx ? ' (start date)' : ''}` : 'No due date'}
                {row.due && row.bucket !== 'done' && <DueBadge days={row.days} />}
              </p>
              <p className="marketing-card__meta">
                {estimate ? `Estimate ${formatHours(estimate)}h · ` : ''}
                {`Logged ${formatHours(row.logged)}h`}
                {estimate > 0 && row.logged > estimate && <span className="marketing-due marketing-due--overdue">Over estimate</span>}
              </p>
            </article>
          );
        })}
      </div>
      {taskList.length > taskLimit && (
        <button type="button" className="marketing-more" onClick={() => setTaskLimit((n) => n + TASK_PAGE)}>
          {`Show ${Math.min(TASK_PAGE, taskList.length - taskLimit)} more`}
        </button>
      )}
    </Section>
  );

  const renderDeadlinesGlance = () => (
    <Section title="Deadlines at a glance" count={`${deadlines.length} dated open items`}>
      {renderDeadlineBuckets()}
    </Section>
  );

  const renderDeadlineList = () => (
    <Section title="Deadline list" count="Overdue: most recent first">
      <DeadlineGroup title="Overdue" tone="overdue" items={overdue} limit={10} />
      <DeadlineGroup title="Due this week" tone="week" items={thisWeek} limit={10} />
      <DeadlineGroup title="Next 30 days" tone="upcoming" items={next30} limit={10} />
      <DeadlineGroup title="Later" tone="later" items={later} limit={10} />
    </Section>
  );

  const renderTeamSummary = () => (
    <Section title="Team summary" count={`${teamRows.length}`}>
      {teamRows.length === 0 && <Empty>No team activity matches these filters.</Empty>}
      {teamRows.length > 0 && (
        <div className="marketing-table-wrap">
          <table className="marketing-table">
            <thead>
              <tr>
                <th>Employee</th><th>Done</th><th>Open</th><th>Overdue</th><th>Hours</th>
              </tr>
            </thead>
            <tbody>
              {[...teamRows].sort((a, b) => a.name.localeCompare(b.name)).map((r) => (
                <tr key={r.name}>
                  <td>{r.name}</td>
                  <td>{r.done}</td>
                  <td>{r.progress + r.pending}</td>
                  <td className={r.overdue ? 'is-bad' : ''}>{r.overdue}</td>
                  <td>{formatHours(r.hours)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );

  // One page, top to bottom. Reorder by moving lines.
  const sections = [
    renderOverview,            // KPI cards (+ hidden Task status / Progress by milestone)
    renderMilestoneTimeline,   // hidden
    renderMilestoneDetails,
    renderEmployeeCharts,      // Tasks by employee + Hours by employee
    renderHoursByDaySection,
    renderTasks,
    renderDeadlinesGlance,
    renderDeadlineList,
    renderTeamSummary,
  ];

  return (
    <div className="marketing-preview-shell">
      <main className="marketing-dashboard">
        <header className="marketing-intro">
          <div>
            <h1>{project ? project.title : PROJECT_TITLE}</h1>
            <p className="marketing-intro__date">
              {project && project.status ? `${project.status}. ` : ''}
              Progress, milestones and deadlines
              {loadedAt ? ` · updated ${loadedAt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}` : ''}
            </p>
          </div>
          <button type="button" className="marketing-refresh-button" onClick={loadProjectData} disabled={loading}>
            <RefreshCw size={15} className={loading ? 'is-spinning' : ''} />
            <span>Refresh</span>
          </button>
        </header>

        <div className="marketing-filter-toggle">
          <button type="button" onClick={() => setFiltersOpen((open) => !open)} aria-expanded={filtersOpen}>
            <Filter size={15} />
            {filtersOpen ? 'Hide filters' : 'Filters'}
            {hasFilter && <span className="marketing-filter-toggle__count">{activeFilterCount}</span>}
          </button>
          {hasFilter && (
            <button type="button" className="marketing-filter-toggle__clear" onClick={() => setFilters(EMPTY_FILTERS)}>
              <X size={13} />
              Clear filters
            </button>
          )}
        </div>
        {filtersOpen && (
          <DashboardFilters
            milestones={milestoneOptions}
            tasks={taskOptions}
            employees={employeeFilterOptions}
            filters={filters}
            setFilter={setFilter}
            applyPreset={applyPreset}
          />
        )}

        {loading && <div className="marketing-state">Loading project data from PMS…</div>}
        {!loading && error && (
          <div className="marketing-state marketing-state--error" role="alert">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && (
          <div className="marketing-page">
            {sections.map((render, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={index}>{render()}</React.Fragment>
            ))}
            <footer className="marketing-dashboard__footer">
              Status is taken from PMS where recorded, otherwise worked out from timesheets.
            </footer>
          </div>
        )}
      </main>
    </div>
  );
};

export default MobileMarketingDashboardPreview;