import React, { useEffect, useMemo, useState } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import moment from 'moment';
import api from '../constants/api';
import message from './Message';

// Status -> badge color, matching the Completed/In progress/Delayed/Pending look
const STATUS_COLOR = {
  Completed: 'success',
  InProgress: 'primary',
  Delayed: 'danger',
  Pending: 'secondary',
};

const STATUS_LABEL = {
  Completed: 'Completed',
  InProgress: 'In progress',
  Delayed: 'Delayed',
  Pending: 'Pending',
};

export default function ProjectWeeklyTarget({
  id,
  weeklyTargetById,
  getWeeklyTargetById,
  setEditWeeklyTargetModal,
  setWeeklyTargetEditData,
}) {
  ProjectWeeklyTarget.propTypes = {
    id: PropTypes.any,
    weeklyTargetById: PropTypes.array,
    getWeeklyTargetById: PropTypes.func,
    setEditWeeklyTargetModal: PropTypes.func,
    setWeeklyTargetEditData: PropTypes.func,
  };

  const [addModal, setAddModal] = useState(false);
  const [monthFilter, setMonthFilter] = useState(moment().format('YYYY-MM'));
  const [staffFilter, setStaffFilter] = useState('');
  const [employee, setEmployee] = useState([]);

  const [insertTarget, setInsertTarget] = useState({
    employee_id: '',
    target_title: '',
    week_start_date: '',
    week_end_date: '',
    due_date: '',
    extended_due_date: '',
    remarks: '',
  });

  const toggleAdd = () => setAddModal((prev) => !prev);

  const getStaffName = () => {
    api
      .post('projecttask/getEmployeeByID', { project_id: id })
      .then((res) => {
        setEmployee(Array.isArray(res.data.data) ? res.data.data : []);
      })
      .catch(() => {
        setEmployee([]);
      });
  };

  const handleInputs = (e) => {
    setInsertTarget({ ...insertTarget, [e.target.name]: e.target.value });
  };

  const insertWeeklyTarget = () => {
    if (!insertTarget.target_title || !insertTarget.employee_id || !insertTarget.week_start_date) {
      message('Please fill Staff, Target and Week before submitting.', 'error');
      return;
    }
    api
      .post('/weeklytarget/insertWeeklyTarget', { ...insertTarget, project_id: id })
      .then(() => {
        message('Weekly target added successfully.', 'success');
        getWeeklyTargetById();
        setAddModal(false);
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
  };

  useEffect(() => {
    getStaffName();
    getWeeklyTargetById(monthFilter, staffFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthFilter, staffFilter]);

  // Group the flat list into weeks, in the shape the screenshot shows
  const weeks = useMemo(() => {
    if (!weeklyTargetById) return [];
    const map = {};
    weeklyTargetById.forEach((t) => {
      const key = `${t.week_start_date}_${t.week_end_date}`;
      if (!map[key]) {
        map[key] = {
          week_start_date: t.week_start_date,
          week_end_date: t.week_end_date,
          targets: [],
        };
      }
      map[key].targets.push(t);
    });
    return Object.values(map).sort((a, b) =>
      moment(a.week_start_date).diff(moment(b.week_start_date)),
    );
  }, [weeklyTargetById]);

  return (
    <Form>
      {/* Filters */}
      <Row className="align-items-end mb-3">
        <Col md="3">
          <FormGroup>
            <Label>Month</Label>
            <Input
              type="month"
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Staff</Label>
            <Input
              type="select"
              value={staffFilter}
              onChange={(e) => setStaffFilter(e.target.value)}
            >
              <option value="">All staff</option>
              {employee.map((member) => (
                  <option key={member.employee_id} value={member.employee_id}>
                    {member.first_name}
                  </option>
                ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md="3" className="mb-3">
          <Button color="primary" className="shadow-none" onClick={toggleAdd}>
            + Add weekly target
          </Button>
        </Col>
      </Row>

      {/* Add weekly target modal */}
      <Modal size="lg" isOpen={addModal} toggle={toggleAdd}>
        <ModalHeader toggle={toggleAdd}>Add weekly target</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="4">
              <FormGroup>
                <Label>Staff</Label>
                <Input type="select" name="employee_id" onChange={handleInputs} value={insertTarget.employee_id}>
                  <option value="">Please Select</option>
                  {employee.map((member) => (
                      <option key={member.employee_id} value={member.employee_id}>
                        {member.first_name}
                      </option>
                    ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Week start</Label>
                <Input
                  type="date"
                  name="week_start_date"
                  onChange={handleInputs}
                  value={insertTarget.week_start_date}
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Week end</Label>
                <Input
                  type="date"
                  name="week_end_date"
                  onChange={handleInputs}
                  value={insertTarget.week_end_date}
                />
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <Label>Target</Label>
                <Input
                  type="text"
                  name="target_title"
                  onChange={handleInputs}
                  value={insertTarget.target_title}
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>DL (Due date)</Label>
                <Input type="date" name="due_date" onChange={handleInputs} value={insertTarget.due_date} />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>EDL (Extended due date)</Label>
                <Input
                  type="date"
                  name="extended_due_date"
                  onChange={handleInputs}
                  value={insertTarget.extended_due_date}
                />
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <Label>Remarks</Label>
                <Input
                  type="text"
                  name="remarks"
                  placeholder="Optional notes"
                  onChange={handleInputs}
                  value={insertTarget.remarks}
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className="shadow-none" onClick={insertWeeklyTarget}>
            Submit
          </Button>
          <Button color="secondary" className="shadow-none" onClick={toggleAdd}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Weeks, grouped */}
      {weeks.length === 0 && <p className="text-muted">No weekly targets for this filter yet.</p>}

      {weeks.map((week) => (
        <div key={`${week.week_start_date}_${week.week_end_date}`} className="border rounded p-3 mb-3">
          <h6 className="mb-3">
            Week ({moment(week.week_start_date).format('DD MMM')} –{' '}
            {moment(week.week_end_date).format('DD MMM')})
          </h6>
          <Table className="display border border-secondary rounded" responsive>
            <thead>
              <tr>
                <td>Staff</td>
                <td>Target</td>
                <td>DL</td>
                <td>EDL</td>
                <td>Status</td>
                <td>Completion date</td>
                <td>Delay days</td>
                <td>Remarks</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {week.targets.map((t) => (
                <tr key={t.weekly_target_id}>
                  <td>{t.first_name}</td>
                  <td>{t.target_title}</td>
                  <td>{t.due_date ? moment(t.due_date).format('DD/MM/YYYY') : '—'}</td>
                  <td>{t.extended_due_date ? moment(t.extended_due_date).format('DD/MM/YYYY') : '—'}</td>
                  <td>
                    <Badge color={STATUS_COLOR[t.status] || 'secondary'}>
                      {STATUS_LABEL[t.status] || t.status}
                    </Badge>
                  </td>
                  <td>{t.completion_date ? moment(t.completion_date).format('DD/MM/YYYY') : '—'}</td>
                  <td className={t.delay_days > 0 ? 'text-danger fw-bold' : ''}>{t.delay_days || 0}</td>
                  <td>{t.remarks || '—'}</td>
                  <td>
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setWeeklyTargetEditData(t);
                        setEditWeeklyTargetModal(true);
                      }}
                    >
                      <Icon.Edit2 size={16} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
    </Form>
  );
}