/* eslint-disable no-use-before-define, react/button-has-type, jsx-a11y/label-has-associated-control, react/no-array-index-key, react/prop-types */
import { useState, useEffect } from 'react';

/**
 * Working Hours Report page.
 *
 * Drop this file into your PMS React project (e.g. src/pages/WorkingHoursReport.jsx)
 * and add a route + sidebar link pointing to it (see instructions below the component).
 *
 * It calls your backend at:
 *   GET {API_BASE_URL}/reports/getWorkingHoursReport?year=YYYY&month=M
 *
 * Update API_BASE_URL below to match wherever your pmsutsAPI is hosted.
 */

const API_BASE_URL = 'http://localhost:3007'; // change to your live API URL when deploying

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function WorkingHoursReport() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [appliedYear, setAppliedYear] = useState(now.getFullYear());
  const [appliedMonth, setAppliedMonth] = useState(now.getMonth() + 1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReport(appliedYear, appliedMonth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedYear, appliedMonth]);

  async function fetchReport(y, m) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/reports/getWorkingHoursReport?year=${y}&month=${m}`);
      const json = await res.json();
      if (json.msg !== 'Success') throw new Error(json.msg || 'Failed to load report');
      setData(json.data);
    } catch (err) {
      setError('Could not load the report. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleApplyFilter() {
    setAppliedYear(year);
    setAppliedMonth(month);
  }

  function handleExport() {
    if (!data) return;
    const rows = [
      ['#', 'Staff Name', 'Total Hours (Hrs)'],
      ...data.staffList
        .slice()
        .sort((a, b) => b.total_hours - a.total_hours)
        .map((s, i) => [i + 1, s.name, s.total_hours]),
      ['', 'Total', data.totalHours],
    ];
    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `working-hours-${data.monthLabel.replace(' ', '-')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const sortedStaff = data
    ? [...data.staffList].sort((a, b) => b.total_hours - a.total_hours)
    : [];

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.iconBadge}>🕐</div>
          <div>
            <h1 style={styles.title}>Working Hours Report</h1>
            <p style={styles.subtitle}>Summary of working hours by staff for the selected year and month</p>
          </div>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.generatedOn}>
            <span style={{ marginRight: 6 }}>📅</span>
            <div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>Report Generated On:</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>
                {now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} {' | '}
                {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
          <button style={styles.exportBtn} onClick={handleExport}>⬇ Export Report ▾</button>
        </div>
      </div>

      <div style={styles.filterRow}>
        <div>
          <label style={styles.filterLabel}>📅 Year</label>
          <select style={styles.select} value={year} onChange={(e) => setYear(Number(e.target.value))}>
            {[year - 1, year, year + 1].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={styles.filterLabel}>📅 Month</label>
          <select style={styles.select} value={month} onChange={(e) => setMonth(Number(e.target.value))}>
            {MONTHS.map((m, i) => (
              <option key={i} value={i + 1}>{m} {year}</option>
            ))}
          </select>
        </div>
        <button style={styles.filterBtn} onClick={handleApplyFilter}>⏷ Apply Filter</button>
      </div>

      {loading && <div style={styles.loading}>Loading report...</div>}
      {error && <div style={styles.errorBox}>{error}</div>}

      {!loading && !error && data && (
        <>
          <div style={styles.cardsRow}>
            <StatCard icon="👥" iconBg="#ede9fe" label="Total Staff" value={data.totalStaff} sub="Active Staff" />
            <StatCard icon="🕐" iconBg="#d1fae5" label="Total Hours" value={data.totalHours} sub="This Month" />
            <StatCard icon="📅" iconBg="#fef3c7" label="Average Hours / Staff" value={data.avgHoursPerStaff} sub="This Month" />
            <StatCard icon="📈" iconBg="#dbeafe" label="Highest Hours" value={data.highest?.total_hours ?? '-'} sub={data.highest?.name ?? '-'} />
            <StatCard icon="🕐" iconBg="#fee2e2" label="Lowest Hours" value={data.lowest?.total_hours ?? '-'} sub={data.lowest?.name ?? '-'} />
          </div>

          <div style={styles.mainRow}>
            <div style={styles.tableCard}>
              <h3 style={styles.cardTitle}>{data.monthLabel.toUpperCase()} - WORKING HOURS SUMMARY</h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>#</th>
                    <th style={styles.th}>Staff Name</th>
                    <th style={{ ...styles.th, textAlign: 'right' }}>Total Hours (Hrs)</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedStaff.map((s, i) => (
                    <tr key={i}>
                      <td style={styles.td}>{i + 1}</td>
                      <td style={{ ...styles.td, fontWeight: 600 }}>{s.name}</td>
                      <td style={{ ...styles.td, textAlign: 'right' }}>{s.total_hours}</td>
                    </tr>
                  ))}
                  <tr style={{ background: '#f9fafb', fontWeight: 700 }}>
                    <td style={styles.td}></td>
                    <td style={styles.td}>Total</td>
                    <td style={{ ...styles.td, textAlign: 'right' }}>{data.totalHours}</td>
                  </tr>
                </tbody>
              </table>
              <p style={styles.footerNote}>
                Showing data for {data.monthLabel} &nbsp;|&nbsp; Total Working Hours in Month: {data.totalHours} &nbsp;|&nbsp; Average Hours / Staff: {data.avgHoursPerStaff}
              </p>
            </div>

            <div style={styles.sideCol}>
              <div style={styles.sideCard}>
                <h3 style={styles.cardTitle}>TOP 5 STAFF BY TOTAL HOURS</h3>
                <BarList items={data.top5.map((s) => ({ label: s.name, value: s.total_hours }))} color="#2563eb" max={data.top5[0]?.total_hours || 1} />
              </div>
              <div style={styles.sideCard}>
                <h3 style={styles.cardTitle}>REPORT FEATURES</h3>
                <ul style={styles.featureList}>
                  <li>✅ Current month data shown by default</li>
                  <li>✅ Filter by Year & Month</li>
                  <li>✅ Export to Excel / PDF</li>
                  <li>✅ Top 5 Staff by Total Hours</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ icon, iconBg, label, value, sub }) {
  return (
    <div style={styles.statCard}>
      <div style={{ ...styles.statIcon, background: iconBg }}>{icon}</div>
      <div>
        <div style={styles.statLabel}>{label}</div>
        <div style={styles.statValue}>{value}</div>
        <div style={styles.statSub}>{sub}</div>
      </div>
    </div>
  );
}

function BarList({ items, color, max }) {
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={styles.barRow}>
          <div style={styles.barLabel}>{i + 1}. {item.label}</div>
          <div style={styles.barTrack}>
            <div style={{ ...styles.barFill, width: `${(item.value / max) * 100}%`, background: color }} />
          </div>
          <div style={styles.barValue}>{item.value}</div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  page: { fontFamily: 'Arial, sans-serif', padding: 24, background: '#f9fafb', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 },
  headerLeft: { display: 'flex', alignItems: 'center', gap: 12 },
  iconBadge: { width: 48, height: 48, borderRadius: 10, background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 },
  title: { margin: 0, fontSize: 22, color: '#111827' },
  subtitle: { margin: 0, fontSize: 13, color: '#6b7280' },
  headerRight: { display: 'flex', alignItems: 'center', gap: 16 },
  generatedOn: { display: 'flex', alignItems: 'center' },
  exportBtn: { background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  filterRow: { display: 'flex', gap: 16, alignItems: 'flex-end', background: '#fff', padding: 16, borderRadius: 10, marginBottom: 20, border: '1px solid #e5e7eb', flexWrap: 'wrap' },
  filterLabel: { display: 'block', fontSize: 12, color: '#374151', marginBottom: 6, fontWeight: 600 },
  select: { padding: '8px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 13, minWidth: 160 },
  filterBtn: { background: '#fff', border: '1px solid #2563eb', color: '#2563eb', borderRadius: 8, padding: '9px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  loading: { padding: 40, textAlign: 'center', color: '#6b7280' },
  errorBox: { padding: 16, background: '#fee2e2', color: '#991b1b', borderRadius: 8 },
  cardsRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 },
  statCard: { background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', padding: 16, display: 'flex', gap: 12, alignItems: 'center' },
  statIcon: { width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 },
  statLabel: { fontSize: 12, color: '#6b7280' },
  statValue: { fontSize: 22, fontWeight: 700, color: '#111827' },
  statSub: { fontSize: 12, color: '#9ca3af' },
  mainRow: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, alignItems: 'flex-start' },
  tableCard: { background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', padding: 20 },
  sideCol: { display: 'flex', flexDirection: 'column', gap: 20 },
  sideCard: { background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', padding: 20 },
  cardTitle: { fontSize: 13, fontWeight: 700, color: '#2563eb', marginTop: 0, marginBottom: 14, letterSpacing: 0.3 },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: { textAlign: 'left', padding: '10px 8px', borderBottom: '2px solid #e5e7eb', color: '#6b7280', fontSize: 12 },
  td: { padding: '10px 8px', borderBottom: '1px solid #f3f4f6', color: '#111827' },
  footerNote: { fontSize: 12, color: '#6b7280', marginTop: 12, borderTop: '1px solid #f3f4f6', paddingTop: 12 },
  barRow: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: 12 },
  barLabel: { width: 90, flexShrink: 0, color: '#374151' },
  barTrack: { flex: 1, background: '#f3f4f6', borderRadius: 6, height: 10, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 6 },
  barValue: { width: 28, textAlign: 'right', color: '#111827', fontWeight: 600 },
  featureList: { listStyle: 'none', padding: 0, margin: 0, fontSize: 13, color: '#374151', lineHeight: 2 },
};