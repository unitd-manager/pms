import React, { useContext, useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button, Input, FormGroup, Label, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import moment from 'moment';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import AppContext from '../../context/AppContext';
// import ApiButton from '../../components/ApiButton'

const Leaves = () => {
  //Const Variables
  const [leaves, setLeaves] = useState(null);
  const [staffFilter, setStaffFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [leaveTypeFilter, setLeaveTypeFilter] = useState('');
  const { loggedInuser } = useContext(AppContext);
  const [mail, setMail] = useState(null);

  const getMail = async () => {
    try {
      const response = await api.get('/setting/getMail');
      const adminEmails = response.data.data.map((item) => item.value);
      setMail(adminEmails);
      console.log('adminEmails', adminEmails);
    } catch (error) {
      // Handle error
    }
  };
  
  const getLeave = () => {
    const userEmail = loggedInuser.email;
  
    // Check if the logged-in user's email is in the array of admin emails
    if (mail.includes(userEmail)) {
      // If the logged-in user is admin, fetch all leave records
      api
        .get('/leave/getAllLeave')
        .then((res) => {
          setLeaves(res.data.data);
        })
        .catch(() => {
          // Handle error
        });
    } else {
      // If the logged-in user is not admin, fetch leave records for the logged-in user
      api
        .post('/leave/getLeave', { email: userEmail })
        .then((res) => {
          setLeaves(res.data.data);
        })
        .catch(() => {
          // Handle error
        });
    }
  };
  
  useEffect(() => {
    getMail();
  }, []);

  useEffect(() => {
    if (mail !== null) {
      getLeave();
    }
  }, [mail]);

  // derive filtered leaves based on staff name and month
  const filteredLeaves = React.useMemo(() => {
    if (!leaves) return null;
    return leaves.filter((l) => {
      // staff filter
      if (staffFilter && l.employee_name !== staffFilter) return false;

      // leave type filter
      if (leaveTypeFilter && l.leave_type !== leaveTypeFilter) return false;

      // month filter (input type=month returns YYYY-MM)
      if (monthFilter) {
        try {
          const from = moment(l.from_date);
          const to = moment(l.to_date);
          const monthStart = moment(`${monthFilter}-01`);
          const monthEnd = monthStart.clone().endOf('month');

          // include if ranges overlap
          if (to.isBefore(monthStart, 'day') || from.isAfter(monthEnd, 'day')) return false;
        } catch (e) {
          return false;
        }
      }

      return true;
    });
  }, [leaves, staffFilter, monthFilter, leaveTypeFilter]);
  //  stucture of leave list view
  const columns = [
    {
      name: 'id',
      selector: 'leave_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },

    {
      name: 'Employee Name',
      selector: 'employee_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Designation',
      selector: 'designation',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      grow: 0,
    },
    {
      name: 'From date',
      selector: 'from_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'To date',
      selector: '	to_date',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: 'No of Days(Current Month)',
      selector: 'no_of_days',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'No of Days(Next Month)',
      selector: 'no_of_days_next_month',
      sortable: true,
      width: 'auto',
    },
    {
      name: 'Leave Type',
      selector: 'leave_type',
      sortable: true,
      width: 'auto',
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs/>
  {/* <ApiButton></ApiButton> */}
        <Row className="mb-2 align-items-end">
          <Col md="4">
            <FormGroup>
              <Label for="staffFilter">Staff Name</Label>
              <Input
                type="select"
                id="staffFilter"
                value={staffFilter}
                onChange={(e) => setStaffFilter(e.target.value)}
              >
                <option value="">All Staff</option>
                {leaves &&
                  Array.from(new Set(leaves.map((l) => l.employee_name))).map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label for="monthFilter">Month</Label>
              <Input
                type="month"
                id="monthFilter"
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md="2">
            <FormGroup>
              <Label for="leaveTypeFilter">Leave Type</Label>
              <Input
                type="select"
                id="leaveTypeFilter"
                value={leaveTypeFilter}
                onChange={(e) => setLeaveTypeFilter(e.target.value)}
              >
                <option value="">All Types</option>
                {leaves && Array.from(new Set(leaves.map((l) => l.leave_type))).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md="2">
            <div>
              <Button
                color="secondary"
                className="shadow-none mt-2"
                onClick={() => {
                  setStaffFilter('');
                  setMonthFilter('');
                  setLeaveTypeFilter('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </Col>
        </Row>
        <CommonTable
          title="Leave List"
          Button={
            <Link to="/LeaveDetails">
              <Button color="primary" className="shadow-none">
                Add New
              </Button>
            </Link>
          }
        >
           <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {filteredLeaves &&
              filteredLeaves.map((element, i) => {
                return (
                  <tr key={element.leave_id}>
                    <td>{i + 1}</td>
                    <td>
                      <Link to={`/LeavesEdit/${element.leave_id}/${element.employee_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.employee_name}</td>
                    <td>{element.designation}</td>
                    <td>{element.status}</td>
                    <td>{moment(element.from_date).format('YYYY-MM-DD')}</td>
                    <td>{moment(element.to_date).format('YYYY-MM-DD')}</td>
                    <td>{element.no_of_days}</td>
                    <td>{element.no_of_days_next_month}</td>
                    <td>{element.leave_type}</td>
                  </tr>
                );
              })}
          </tbody>
          </CommonTable>
      </div>
    </div>
  );
};

export default Leaves;
