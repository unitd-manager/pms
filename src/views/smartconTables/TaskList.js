import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button, Label, Card, CardBody, Col, Row, Input, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const ProjectTask = () => {
  const [projectTask, setProjectTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [userSearchData, setUserSearchData] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [page, setPage] = useState(0);

  const employeesPerPage = 20;
  const numberOfEmployeesVisited = page * employeesPerPage;

  const getProjectTask = () => {
    setLoading(true);
    api
      .get('/projecttask/getProjectTask')
      .then((res) => {
        const allTasks = res.data.data;

        // Filter for current month
        const currentMonth = moment().month();
        const currentYear = moment().year();
        const filteredTasks = allTasks.filter((task) => {
          const taskDate = moment(task.start_date);
          return taskDate.month() === currentMonth && taskDate.year() === currentYear;
        });

        // Sort by start date descending
        const sortedTasks = filteredTasks.sort((a, b) =>
          moment(b.start_date).diff(moment(a.start_date))
        );

        setProjectTask(sortedTasks);
        setUserSearchData(sortedTasks);
        setLoading(false);

        // Initialize DataTables only once
        setTimeout(() => {
          $('#example').DataTable({
            destroy: true,
            pagingType: 'full_numbers',
            pageLength: 20,
            processing: true,
            dom: 'Bfrtip',
            searching: false,
            buttons: [
              {
                extend: 'print',
                text: 'Print',
                className: 'shadow-none btn btn-primary',
              },
            ],
          });
        }, 500);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const editJobById = () => {
    api
      .get('/projecttask/getEmployee')
      .then((res) => {
        setEmployee(res.data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getProjectTask();
    editJobById();
  }, []);

  const handleSearch = () => {
    let filtered = projectTask;

    if (companyName !== '') {
      filtered = filtered.filter((y) => y.first_name === companyName);
    }

    if (categoryName !== '') {
      filtered = filtered.filter((x) => x.status === categoryName);
    }

    if (searchKeyword !== '') {
      filtered = filtered.filter((task) =>
        task.first_name?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    setUserSearchData(filtered);
  };

  const displayEmployees = userSearchData.slice(
    numberOfEmployeesVisited,
    numberOfEmployeesVisited + employeesPerPage
  );

  const totalPages = Math.ceil(userSearchData.length / employeesPerPage);

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const columns = [
    { name: '#', selector: 'project_task_id', grow: 0, wrap: true, width: '4%' },
    {
      name: 'Edit',
      selector: 'edit',
      cell: (row) => (
        <Link to={`/TaskEdit/${row.project_task_id}`}>
          <Icon.Edit2 />
        </Link>
      ),
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    { name: 'Title', selector: 'task_title', sortable: true, grow: 0, wrap: true },
    {
      name: 'Start date',
      selector: 'start_date',
      sortable: true,
      grow: 2,
      wrap: true,
      cell: (row) =>
        row.start_date ? moment(row.start_date).format('DD-MM-YYYY') : '',
    },
    {
      name: 'End Date',
      selector: 'end_date',
      sortable: true,
      grow: 0,
      wrap: true,
      cell: (row) => (row.end_date ? moment(row.end_date).format('DD-MM-YYYY') : ''),
    },
    { name: 'Completion', selector: 'completion', sortable: true, grow: 0, wrap: true },
    { name: 'Status', selector: 'status', sortable: true, grow: 0, wrap: true },
    { name: 'Task Type', selector: 'task_type', sortable: true, grow: 0, wrap: true },
    { name: 'Priority', selector: 'priority', sortable: true, grow: 0, wrap: true },
    { name: 'Actual Hours', selector: 'actual_hours', sortable: true, grow: 0, wrap: true },
    { name: 'Est Hours', selector: 'estimated_hours', sortable: true, grow: 0, wrap: true },
    { name: 'Name', selector: 'first_name', sortable: true, grow: 0, wrap: true },
    { name: 'Description', selector: 'description', sortable: true, grow: 0, wrap: true },
  ];

  return (
    <div className="MainDiv">
      <div className="pt-xs-25">
        <BreadCrumbs />
        <Card>
          <CardBody>
            <Row>
              <Col md="2">
                <FormGroup>
                  <Label>Select Staff</Label>
                  <Input
                    type="select"
                    name="employee_id"
                    onChange={(e) => setCompanyName(e.target.value)}
                  >
                    <option value="">Please Select</option>
                    {employee &&
                      employee.map((ele) => (
                        <option key={ele.employee_id} value={ele.first_name}>
                          {ele.first_name}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup>
                  <Label>Select Category</Label>
                  <Input
                    type="select"
                    name="status"
                    onChange={(e) => setCategoryName(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="Pending">Pending</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Completed">Completed</option>
                    <option value="OnHold">OnHold</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Search Staff Name</Label>
                  <Input
                    type="text"
                    placeholder="Search by staff name..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="1" className="mt-3">
                <Button color="primary" className="shadow-none" onClick={handleSearch}>
                  Go
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>

        <CommonTable
          loading={loading}
          title="Task List"
          Button={
            <Link to="/ProjectTaskDetails">
              <Button color="primary" className="shadow-none">
                Add New
              </Button>
            </Link>
          }
        >
          <thead>
            <tr>
              {columns.map((cell) => (
                <td key={cell.name}>{cell.name}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayEmployees &&
              displayEmployees.map((element, index) => (
                <tr key={element.project_task_id}>
                  <td>{numberOfEmployeesVisited + index + 1}</td>
                  <td>
                    <Link to={`/TaskEdit/${element.project_task_id}`}>
                      <Icon.Edit2 />
                    </Link>
                  </td>
                  <td>{element.task_title}</td>
                  <td>
                    {element.start_date
                      ? moment(element.start_date).format('DD-MM-YYYY')
                      : ''}
                  </td>
                  <td>
                    {element.end_date
                      ? moment(element.end_date).format('DD-MM-YYYY')
                      : ''}
                  </td>
                  <td>{element.completion}</td>
                  <td>{element.status}</td>
                  <td>{element.task_type}</td>
                  <td>{element.priority}</td>
                  <td>{element.actual_hours}</td>
                  <td>{element.estimated_hours}</td>
                  <td>{element.first_name}</td>
                  <td>{element.description}</td>
                </tr>
              ))}
          </tbody>
        </CommonTable>

        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageCount={totalPages}
          onPageChange={changePage}
          containerClassName="navigationButtons"
          previousLinkClassName="previousButton"
          nextLinkClassName="nextButton"
          disabledClassName="navigationDisabled"
          activeClassName="navigationActive"
        />
      </div>
    </div>
  );
};

export default ProjectTask;
