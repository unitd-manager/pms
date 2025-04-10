import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import moment from 'moment';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const ProjectTimeSheet = () => {
  // State variables
  const [timeSheet, setTimesheet] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch timesheet data
  const getTimesheet = () => {
    setLoading(true);
    api
      .get('/projecttimesheet/getProjectTimesheet')
      .then((res) => {
        const allData = res.data.data;

        // Get last month's 5th and this month's 5th
        const lastMonth5th = moment().subtract(1, 'months').date(5).startOf('day');
        const thisMonth5th = moment().date(5).endOf('day');

        // Filter data: Show only records between last month's 5th and this month's 5th
        const filteredData = allData.filter((entry) => {
          const entryDate = moment(entry.date, 'YYYY-MM-DD');
          return entryDate.isBetween(lastMonth5th, thisMonth5th, null, '[]'); // Inclusive range
        });

        setTimesheet(filteredData);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getTimesheet();
  }, []);

  // Initialize DataTable after data is loaded
  useEffect(() => {
    if (timeSheet) {
      setTimeout(() => {
        $('#timesheetTable').DataTable({
          destroy: true, // Prevent multiple initializations
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip', // Enables search filter and buttons
          buttons: [
            {
              extend: 'print',
              text: 'Print',
              className: 'btn btn-primary',
            },
          ],
        });
      }, 100);
    }
  }, [timeSheet]); // Runs only when `timeSheet` is updated

  // Define table columns
  const columns = [
    { name: '#', selector: 'project_timesheet_id', grow: 0, wrap: true, width: '4%' },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    { name: 'Project Title', selector: 'title', sortable: true, grow: 0, wrap: true },
    { name: 'Title', selector: 'task_title', sortable: true, grow: 0, wrap: true },
    { name: 'Date', selector: 'date', sortable: true, grow: 0, wrap: true },
    { name: 'Name', selector: 'first_name', sortable: true, grow: 2, wrap: true },
    { name: 'Hours', selector: 'hours', sortable: true, grow: 0, wrap: true },
    { name: 'Status', selector: 'status', sortable: true, grow: 0, wrap: true },
    { name: 'Description', selector: 'description', sortable: true, grow: 0, wrap: true },
  ];

  return (
    <div className="MainDiv">
      <div className="pt-xs-25">
        <BreadCrumbs />
        <CommonTable loading={loading} title="TimeSheet List">
          <table id="timesheetTable" className="display">
            <thead>
              <tr>
                {columns.map((cell) => (
                  <th key={cell.name}>{cell.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSheet &&
                timeSheet.map((element, index) => (
                  <tr key={element.project_timesheet_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/ProjectTimesheetEdit/${element.project_timesheet_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.title}</td>
                    <td>{element.task_title}</td>
                    <td>{element.date ? moment(element.date).format('DD-MM-YYYY') : ''}</td>
                    <td>{element.first_name}</td>
                    <td>{element.hours}</td>
                    <td>{element.status}</td>
                    <td>{element.description}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </CommonTable>
      </div>
    </div>
  );
};

export default ProjectTimeSheet;
