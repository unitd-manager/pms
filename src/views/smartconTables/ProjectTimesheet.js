import React, { useEffect, useState, useContext } from 'react';
import {
  Row,
  Form,
  ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  Table,
  Label,
  Input,
  Col,
  FormGroup,
  Button,
  CardBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

export default function ProjectTimeSheet({
  addContactToggless,
  addContactModalss,
  setEditTimeSheetEditModal,
  id,
  timeSheetById,
  setContactDatass,
  getTimeSheetById,
  userSearchData,
  setUserSearchData
}) {
  ProjectTimeSheet.propTypes = {
    addContactToggless: PropTypes.func,
    setEditTimeSheetEditModal: PropTypes.func,
    addContactModalss: PropTypes.bool,
    id: PropTypes.any,
    timeSheetById: PropTypes.any,
    setContactDatass: PropTypes.func,
    getTimeSheetById: PropTypes.func,
    userSearchData: PropTypes.func,
    setUserSearchData: PropTypes.func
  };

  const [insertTimeSheet, setInsertTimesheet] = useState({
    task_title: '',
    first_name: '',
    date: '',
    hours: '',
    status: '',
    description: '',
    project_milestone_id: '',
    project_task_id: '',
  });
  const sortedData = [...userSearchData];
  //get staff details
  const { loggedInuser } = useContext(AppContext);
  //const [employeeTime, setEmployee] = useState();

  // Gettind data from Job By Id
  const editJobById = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        console.log(res.data.data);
        //setEmployee(res.data.data);
      })
      .catch(() => { });
  };
  //Milestone data in milestoneDetails
  const handleInputsTime = (e) => {
    setInsertTimesheet({ ...insertTimeSheet, [e.target.name]: e.target.value });
  };
  //Insert Milestone
  const inserttimeSheets = () => {
    const newContactWithCompany = insertTimeSheet;
    newContactWithCompany.creation_date = creationdatetime;
    newContactWithCompany.created_by = loggedInuser.first_name;
    newContactWithCompany.project_id = id;

    api
      .post('/projecttimesheet/insertTimeSheet', newContactWithCompany)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        console.log(insertedDataId);
        message('TimeSheet inserted successfully.', 'success');
        getTimeSheetById();
        setTimeout(() => {
          addContactToggless(false);
        }, 300);
        window.location.reload();
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
  };
  const [milestones, setMilestones] = useState([]);
  const [taskdetail, setTaskDetail] = useState([]);
  const [StaffDetail, setstaffDetail] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [employee, setEmployee] = useState();  // Gettind data from Job By Id
  const [filteredData, setFilteredData] = useState([]);

  const getStaffNamefilter = () => {
    api
      .post('projecttask/getEmployeeByID', { project_id: id })
      .then((res) => {
        setEmployee(res.data.data);
      })
      .catch(() => { });
  };
  const [hoveredCreationDate, setHoveredCreationDate] = useState('');

  const displayCreationDate = (creationDate) => {
    setHoveredCreationDate(creationDate);
  };

  const hideCreationDate = () => {
    setHoveredCreationDate('');
  };
  
  console.log(filteredData);
  const handleSearch = () => {
    const newData = timeSheetById
      .filter((y) => y.first_name === (companyName === '' ? y.first_name : companyName))
    setUserSearchData(newData);
    // Store the filtered data in the state variable
    setFilteredData(newData);
  };
  const [page, setPage] = useState(0);

  const employeesPerPage = 10;
  const numberOfEmployeesVistited = page * employeesPerPage;
  const displayEmployees = sortedData.slice(
    numberOfEmployeesVistited,
    numberOfEmployeesVistited + employeesPerPage,
  );

  console.log('displayEmployees', displayEmployees);
  const totalPages = Math.ceil(userSearchData.length / employeesPerPage);
  const changePage = ({ selected }) => {
    setPage(selected);
  };
  // Api call for getting project name dropdown
  const getMilestoneName = () => {
    api
      .post('/projecttimesheet/getMilestoneTitle', { project_id: id })
      .then((res) => {
        setMilestones(res.data.data);
      })
      .catch(() => {
        message('Milestone not found', 'info');
      });
  };

  // Api call for getting milestone dropdown based on project ID
  const getTaskName = (projectId) => {
    api
      .post('/projecttimesheet/getTaskByID', { project_milestone_id: projectId })
      .then((res) => {
        setTaskDetail(res.data.data);
      })
      .catch(() => {
        message('Task not found', 'info');
      });
  };
  // Api call for getting milestone dropdown based on project ID
  const getStaffName = (projectId) => {
    api
      .post('/projecttimesheet/getStaffByID', { project_task_id: projectId })
      .then((res) => {
        setstaffDetail(res.data.data);
      })
      .catch(() => {
        message('Task not found', 'info');
      });
  };

  useEffect(() => {
    editJobById();
  }, [id]);

  useEffect(() => {
    getMilestoneName();
    getStaffNamefilter();
  }, [id]);

  useEffect(() => {
    if (insertTimeSheet.project_milestone_id) {
      // Use taskdetails.project_milestone_id directly to get the selected project ID
      const selectedTask = insertTimeSheet.project_milestone_id;
      getTaskName(selectedTask);
    }
  }, [insertTimeSheet.project_milestone_id]);
  useEffect(() => {
    if (insertTimeSheet.project_task_id) {
      // Use taskdetails.project_milestone_id directly to get the selected project ID
      const selectedStaff = insertTimeSheet.project_task_id;
      getStaffName(selectedStaff);
    }
  }, [insertTimeSheet.project_task_id]);

  //Structure of timeSheetById list view
  const Projecttimesheetcolumn = [
    {
      name: '#',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
    },
    {
      name: 'Title',
    },
    {
      name: 'Staff',
    },
    {
      name: 'Date',
    },
    {
      name: 'Hours',
    },
    {
      name: 'Total Hours',
    },
    {
      name: 'Status',
    },
    {
      name: 'Description',
    },

  ];
  return (
    <>
    <div className="MainDiv">
    <div className=" pt-xs-25">
          <br />
          <Card>
            <CardBody>
              <Row>
                <Col md="2">
                  <FormGroup>
                    <Label>Select Staff </Label>
                    <Input
                      type="select"
                      name="employee_id"
                      onChange={(e) => setCompanyName(e.target.value)} // Update companyName state
                      value={companyName}
                    >
                      <option value="">Please Select</option>
                      {employee &&
                        employee.map((ele) => {
                          return (
                            // ele.e_count === 0 && (
                            <option key={ele.employee_id} value={ele.first_name}>
                              {ele.first_name}
                            </option>
                          );
                          // );
                        })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="1" className="mt-3">
                  <Button color="primary" className="shadow-none" onClick={() => handleSearch()}>
                    Go
                  </Button>
                </Col>
              </Row>
              <span
                onClick={() => {
                  // Clear the filter criteria for both Select Staff and Select Category
                  setCompanyName('');
                  // Restore the full data
                  setUserSearchData(timeSheetById);

                  // Clear the filtered data
                  setFilteredData([]);
                }}
                style={{
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Back to List
              </span>

            </CardBody>
          </Card>
          <Form>
          <FormGroup>
            <Button color="primary" className="shadow-none" onClick={addContactToggless.bind(null)}>
              Add New{' '}
            </Button>
            <Modal size="lg" isOpen={addContactModalss} toggle={addContactToggless.bind(null)}>
              <ModalHeader toggle={addContactToggless.bind(null)}>New Task</ModalHeader>
              <ModalBody>
                <Row>
                  <Col md="12">
                    <Card>
                      <CardBody>
                        <Form>
                          <Row>
                            <Col md="4">
                              <Label>Milestone Title</Label>
                              <FormGroup>
                                <Input
                                  type="select"
                                  onChange={(e) => {
                                    handleInputsTime(e);
                                  }}
                                  value={insertTimeSheet && insertTimeSheet.project_milestone_id}
                                  name="project_milestone_id"
                                >
                                  <option value="selected">Please Select</option>
                                  {milestones &&
                                    milestones.map((e) => {
                                      return (
                                        <option
                                          key={e.project_milestone_id}
                                          value={e.project_milestone_id}
                                        >
                                          {' '}
                                          {e.milestone_title}{' '}
                                        </option>
                                      );
                                    })}
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Task</Label>
                                <Input
                                  type="select"
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.project_task_id}
                                  name="project_task_id"
                                >
                                  <option value="" selected>
                                    Please Select
                                  </option>
                                  {taskdetail &&
                                    taskdetail.map((e) => {
                                      return (
                                        <option key={e.project_task_id} value={e.project_task_id}>
                                          {e.task_title}
                                        </option>
                                      );
                                    })}
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label> Staff Name</Label>
                                <Input
                                  type="select"
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.employee_id}
                                  name="employee_id"
                                >
                                  <option value="" selected>
                                    Please Select
                                  </option>
                                  {StaffDetail &&
                                    StaffDetail.map((e) => {
                                      return (
                                        <option key={e.employee_id} value={e.employee_id}>
                                          {e.first_name}
                                        </option>
                                      );
                                    })}
                                </Input>
                              </FormGroup>
                            </Col>
                            {/* <Col md="4">
                              <FormGroup>
                                <Label>Staff Name</Label>
                                <Input
                                  type="select"
                                  name="employee_id"
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.employee_id} // Set the default employee name
                                > */}
                            {/* {insertTimeSheet && insertTimeSheet.employee_id ? ( // Render default employee name if it's set
                                    <option value={insertTimeSheet.employee_id}>
                                      {insertTimeSheet.employee_id}
                                    </option>
                                  ) : (
                                    <option  disabled>
                                      Select Staff Name
                                    </option>
                                  )} */}
                            {/* {StaffDetail &&
                                    StaffDetail.map((e) => (
                                      <option key={e.project_task_id} value={e.employee_id}>
                                        {e.first_name}
                                      </option>
                                    ))}
                                </Input>
                              </FormGroup>
                            </Col> */}
                            <Col md="4">
                              <FormGroup>
                                <Label>Date</Label>
                                <Input
                                  type="date"
                                  onChange={handleInputsTime}
                                  value={
                                    insertTimeSheet &&
                                    moment(insertTimeSheet.date).format('YYYY-MM-DD')
                                  }
                                  name="date"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Hours</Label>
                                <Input
                                  type="number"
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.hours}
                                  name="hours"
                                />
                              </FormGroup>
                            </Col>

                            <Col md="4">
                              <FormGroup>
                                <Label>Status</Label>
                                <Input
                                  type="select"
                                  name="status"
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.status}
                                >
                                  {' '}
                                  <option value="" selected="selected">
                                    Please Select
                                  </option>
                                  <option value="Pending">Pending</option>
                                  <option value="InProgress">InProgress</option>
                                  <option value="Completed">Completed</option>
                                  <option value="OnHold">OnHold</option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Description</Label>
                                <Input
                                  type="textarea"
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.description}
                                  name="description"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    inserttimeSheets();
                  }}
                >
                  Submit
                </Button>
                <Button
                  color="secondary"
                  className="shadow-none"
                  onClick={addContactToggless.bind(null)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </FormGroup>
       
      <Table id="example" className="display border border-secondary rounded">
        <thead>
          <tr>
            {Projecttimesheetcolumn.map((cell) => {
              return <td key={cell.name}>{cell.name}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {displayEmployees &&
            displayEmployees.map((element, index) => {
              return (
                <tr key={element.projecttimesheet_id}>
                  <td>{index + 1}</td>
                  <td>
                    <span
                      onClick={() => {
                        setContactDatass(element);
                        setEditTimeSheetEditModal(true);
                      }}
                    >
                      <Icon.Edit2 />
                    </span>
                  </td>
                  <td>{element.task_title}</td>
                  <td>
                    <span
                      onMouseEnter={() => displayCreationDate(element.creation_date)}

                      onMouseLeave={() => hideCreationDate()}
                    >
                      {element.first_name}</span></td>
                  {/* Modify the following block for the modification date */}

                  <td>{element.date}</td>
                  <td>{element.hours}</td>
                  <td>{element.actual_hours}</td>
                  <td>{element.status}</td>
                  <td>{element.description}</td>

                </tr>
              );
            })}
          {hoveredCreationDate && (
            <tr>
              <td colSpan="9">Creation Date: {hoveredCreationDate}</td>
            </tr>
          )}
        </tbody>
      </Table>
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
      </Form>
      </div>
      </div>
      </>
  );
}
