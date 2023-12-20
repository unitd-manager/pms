import React, { useContext, useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import {Button } from 'reactstrap';
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
            {leaves &&
              leaves.map((element,i) => {
                return (
                  <tr key={element.leave_id}>
                    <td>{i+1}</td>
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
