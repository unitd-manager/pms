import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Card,
  CardBody,
} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import * as Icon from 'react-feather';
import { useNavigate, useParams, Link } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';
import DeleteButton from '../../components/DeleteButton';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';

const TaskJobEdit = () => {
  //All state variable
  //const [projectTask, setProjectTask] = useState(null);
  const [projectTeam, setProjectTeam] = useState();
  //const [taskdetails, setTaskDetails] = useState();
  const [projecttaskdetails, setProjectTaskDetails] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState();
  const [employeeTeam, setEmployeeTeam] = useState();

  //navigation and parameters
  const { id } = useParams();
  const navigate = useNavigate();

  const applyChanges = () => {};
  const backToList = () => {
    navigate('/TaskJob');
  };
  // const addtaskToggle = () => {
  //   setAddTaskModal(!addTaskModal);
  // };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  //  Gettind data from Job By Id
  const editJob = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        console.log(res.data.data);
        setEmployeeTeam(res.data.data);
      })
      .catch(() => {});
  };
  //TaskJob data in TaskJob
  const handleInputsProjectteam = (e) => {
    setProjectTeam({ ...projectTeam, [e.target.name]: e.target.value });
  };

  //getting data from TaskJob by Id
  const getTeamById = () => {
    api.post('/projectteam/getTeamById', { project_team_id: id }).then((res) => {
      setProjectTeam(res.data.data[0]);
    });
  };

  //Update TaskJob
  const editTaskJob = () => {
    api
      .post('/projectteam/editTeam', projectTeam)
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  const [taskeditData, setTaskEditData] = useState();
  //getting payment data By Loan Id
  const getProjectTaskById = () => {
    api
      .post('/Projectteam/getTeamTaskById', { project_team_id: id })
      .then((res) => {
        setTaskEditData(res.data.data[0]);
      })
      .catch(() => {
        message('Loan Data Not Found', 'info');
      });
  };
  const getTaskById = () => {
    api
      .post('/Projectteam/getTeamTaskById', { project_team_id: id })
      .then((res) => {
        setProjectTaskDetails(res.data.data);
      })
      .catch(() => {
        message('Loan Data Not Found', 'info');
      });
  };
  //attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
    console.log('inside DataForAttachment');
  };

  // const getProjectTask = () => {
  //      api.get('/projecttask/getProjectTask')
  //     .then((res) => {
  //       setProjectTask(res.data.data);
  //     }).catch(()=>{

  //     });
  //   };

  // const getProjectTaskById = () => {
  //   api.post('/projecttask/getProjectTaskId', { project_task_id: id }).then((res) => {
  //     setProjectTaskDetails(res.data.data);

  //   });
  // };
  // console.log(projecttaskdetails);

  const handleTaskInputs = (e) => {
    setTaskEditData({ ...taskeditData, [e.target.name]: e.target.value });
  };

  //Logic for edit data in db

  const editTaskData = () => {
    api
      .post('/Projecttask/editTask', taskeditData)
      .then(() => {
        message('Record editted successfully', 'success');
        window.location.reload();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  const columns = [
    {
      name: '#',
      selector: 'project_task_id',
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
      name: 'Title',
      selector: 'task_title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Start date',
      selector: 'start_date',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'End Date',
      selector: 'end_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Completion',
      selector: 'completion',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Task Type',
      selector: 'task_type',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Actual Hours',
      selector: 'actual_hours',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Name',
      selector: 'first_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
  ];

  useEffect(() => {
    getTeamById();
    editJob();
    getProjectTaskById();
    getTaskById();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <Form>
        <FormGroup>
          <ToastContainer></ToastContainer>
          <ComponentCardV2>
            <Row>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editTaskJob();
                    navigate('/TaskJob');
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editTaskJob();
                    applyChanges();
                  }}
                >
                  Apply
                </Button>
              </Col>
              <Col>
                <Button
                  type="submit"
                  className="btn btn-dark shadow-none"
                  onClick={(e) => {
                    if (window.confirm('Are you sure you want to cancel? ')) {
                      navigate('/TaskJob');
                    } else {
                      e.preventDefault();
                    }
                  }}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <DeleteButton
                  id={id}
                  columnname="project_team_id"
                  tablename="project_team"
                ></DeleteButton>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="dark"
                  onClick={() => {
                    backToList();
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row>
          </ComponentCardV2>
        </FormGroup>
      </Form>
      {/* projectTeam Details */}
      <Form>
        <FormGroup>
          <ComponentCard title="Project Team Details">
            {' '}
            <ToastContainer></ToastContainer>
            <div>
              <BreadCrumbs />

              <ComponentCard>
                <Form>
                  <Row>
                    <Col md="3">
                      <FormGroup>
                        <Label>Name</Label>
                        <Input
                          type="select"
                          name="employee_id"
                          onChange={handleInputsProjectteam}
                          value={projectTeam && projectTeam.employee_id}
                        >
                          <option value="" defaultValue="selected"></option>
                          {employeeTeam &&
                            employeeTeam.map((ele) => {
                              return (
                                <option key={ele.employee_id} value={ele.employee_id}>
                                  {ele.first_name}
                                </option>
                              );
                            })}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Designation</Label>
                        <br />
                        <span>{projectTeam && projectTeam.designation}</span>
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Department</Label>
                        <br />
                        <span>{projectTeam && projectTeam.department}</span>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </ComponentCard>
            </div>
          </ComponentCard>
          <ComponentCard title="More Details">
            <ToastContainer></ToastContainer>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={activeTab === '1' ? 'active' : ''}
                  onClick={() => {
                    toggle('1');
                  }}
                >
                  Task
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === '2' ? 'active' : ''}
                  onClick={() => {
                    toggle('2');
                  }}
                >
                  Attachment
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent className="p-4" activeTab={activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col md="6">
                    <Modal size="lg" isOpen={addTaskModal}>
                      <ModalHeader>
                        Edit Task
                        <Button
                          color="secondary"
                          onClick={() => {
                            setAddTaskModal(false);
                          }}
                        >
                          X
                        </Button>
                      </ModalHeader>
                      <ModalBody>
                        <Row>
                          <Col md="12">
                            <Card>
                              <CardBody>
                                <Form>
                                  <Row>
                                    <Col>
                                      <FormGroup>
                                        <Label>Title</Label>
                                        <Input
                                          type="text"
                                          name="task_title"
                                          onChange={handleTaskInputs}
                                          value={taskeditData && taskeditData.task_title}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="4">
                                      <FormGroup>
                                        <Label>Start Date</Label>
                                        <Input
                                          type="date"
                                          name="start_date"
                                          value={
                                            taskeditData
                                              ? moment(taskeditData.start_date).format('YYYY-MM-DD')
                                              : ''
                                          }
                                          onChange={handleTaskInputs}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="4">
                                      <FormGroup>
                                        <Label>End Date</Label>
                                        <Input
                                          type="date"
                                          name="end_date"
                                          value={
                                            taskeditData
                                              ? moment(taskeditData.end_date).format('YYYY-MM-DD')
                                              : ''
                                          }
                                          onChange={handleTaskInputs}
                                        />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col md="4">
                                      <FormGroup>
                                        <Label>Completion</Label>
                                        <Input
                                          type="text"
                                          name="completion"
                                          onChange={handleTaskInputs}
                                          value={taskeditData && taskeditData.completion}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="4">
                                      <FormGroup>
                                        <Label>Status</Label>
                                        <Input
                                          type="text"
                                          name="status"
                                          onChange={handleTaskInputs}
                                          value={taskeditData && taskeditData.status}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="4">
                                      <FormGroup>
                                        <Label>Actual Hours</Label>
                                        <Input
                                          type="text"
                                          name="actual_hours"
                                          onChange={handleTaskInputs}
                                          value={taskeditData && taskeditData.actual_hours}
                                        />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col md="4">
                                      <FormGroup>
                                        <Label>Name</Label>
                                        <Input
                                          type="text"
                                          name="first_name"
                                          onChange={handleTaskInputs}
                                          value={taskeditData && taskeditData.first_name}
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
                            editTaskData();
                            setAddTaskModal(false);
                          }}
                        >
                          Save & Continue
                        </Button>
                        <Button
                          className="shadow-none"
                          color="secondary"
                          onClick={() => {
                            setAddTaskModal(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </Col>
                </Row>
                <Row>
                  <div className="container">
                    <Table id="example" className="display border border-secondary rounded">
                      <thead>
                        <tr>
                          {columns.map((cell) => {
                            return <td key={cell.name}>{cell.name}</td>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {projecttaskdetails &&
                          projecttaskdetails.map((element, index) => {
                            return (
                              <tr key={element.project_task_id}>
                                <td>{index + 1}</td>
                                <td>
                                  <Link to="">
                                    <span
                                      onClick={() => {
                                        setAddTaskModal(true);
                                        setTaskEditData(element);
                                      }}
                                    >
                                      <Icon.Edit2 />
                                    </span>
                                  </Link>
                                </td>
                                <td>{element.task_title}</td>
                                <td>{element.start_date ? element.start_date : ''}</td>
                                <td>{element.end_date ? element.end_date : ''}</td>
                                <td>{element.completion}</td>
                                <td>{element.status}</td>
                                <td>{element.task_type}</td>
                                <td>{element.hours}</td>
                                <td>{element.first_name}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  </div>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Form>
                  <FormGroup>
                    <ComponentCard title="Attachments">
                      <Row>
                        <Col xs="12" md="3" className="mb-3">
                          <Button
                            className="shadow-none"
                            color="primary"
                            onClick={() => {
                              setRoomName('TaskJob');
                              setFileTypes(['JPG', 'PNG', 'GIF', 'PDF']);
                              dataForAttachment();
                              setAttachmentModal(true);
                            }}
                          >
                            <Icon.File className="rounded-circle" width="20" />
                          </Button>
                        </Col>
                      </Row>
                      <AttachmentModalV2
                        moduleId={id}
                        roomName={roomName}
                        fileTypes={fileTypes}
                        altTagData="TaskJobRelated Data"
                        recordType="RelatedPicture"
                        desc="TaskJobRelated Data"
                        modelType={attachmentData.modelType}
                        attachmentModal={attachmentModal}
                        setAttachmentModal={setAttachmentModal}
                      />
                      <ViewFileComponentV2
                        moduleId={id}
                        roomName="TimesheetList"
                        recordType="RelatedPicture"
                      />
                    </ComponentCard>
                  </FormGroup>
                </Form>
              </TabPane>
            </TabContent>
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};

export default TaskJobEdit;
