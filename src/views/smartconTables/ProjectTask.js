import React, { useEffect, useState } from 'react';
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
// import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import moment from 'moment';
import message from '../../components/Message';
import api from '../../constants/api';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';


export default function ProjectTask({
  addContactToggle,
  addContactModal,
  setEditTaskEditModal,
  id,
  taskById,
  setContactData,
  getTaskById,

}) {
  ProjectTask.propTypes = {
    addContactToggle: PropTypes.func,
    setEditTaskEditModal: PropTypes.func,
    addContactModal: PropTypes.bool,
    id: PropTypes.any,
    taskById: PropTypes.any,
    setContactData: PropTypes.func,
    getTaskById: PropTypes.func,

  };
  console.log('rafi', taskById);
  const [insertTask, setInsertTask] = useState({
    task_title: '',
    first_name: '',
    start_date: '',
    end_date: '',
    completion: '',
    status: '',
    task_type: '',
    actual_completed_date: '',
    description:'',
  });
  const [projectdetail, setProjectDetail] = useState([]);
  const [milestoneDetail, setMilestones] = useState([]);

  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [attachmentModal, setAttachmentModal] = useState(false);

  const [employee, setEmployee] = useState();
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState();
  const [moduleId, setModuleId] = useState('');

  const [updateFile, setUpdateFile] = useState(true);
  // Gettind data from Job By Id
  const editJobById = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        console.log(res.data.data);
        setEmployee(res.data.data);
      })
      .catch(() => {});
  };
  //Milestone data in milestoneDetails
  const handleInputsmilestone = (e) => {
    setInsertTask({ ...insertTask, [e.target.name]: e.target.value });
  };
  //Insert Milestone
  const insertMilestone = () => {
    if (insertTask.task_title !== '') {
      const newContactWithCompanyId = insertTask;
      newContactWithCompanyId.project_id = id;
      api
        .post('/projecttask/insertTask', newContactWithCompanyId)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          console.log(insertedDataId);
          message('Task inserted successfully.', 'success');
          getTaskById()
          setTimeout(() => {addContactToggle(false)}, 300);
          window.location.reload();

        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
        message( 'error');
    }
  };
   // Api call for getting project name dropdown
   const getProjectnames = () => {
    api
      .get('/projecttask/getProjectTitle')
      .then((res) => {
        setProjectDetail(res.data.data);
      })
      .catch(() => {
        message('Projects not found', 'info');
      });
  };

  // Api call for getting milestone dropdown based on project ID
  const getMilestones = (projectId) => {
    api
      .post('/projecttask/getMilestoneById', { project_id: projectId })
      .then((res) => {
        setMilestones(res.data.data);
      })
      .catch(() => {
        message('Milestones not found', 'info');
      });
  };

  //attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
    console.log('inside DataForAttachment');
  };
  useEffect(() => {
    editJobById();
    dataForAttachment();
    getProjectnames();
  }, [id]);

  useEffect(() => {
    if (insertTask.project_id) {
      // Use taskdetails.project_id directly to get the selected project ID
      const selectedProject = insertTask.project_id;
      getMilestones(selectedProject);
    }
  }, [insertTask.project_id]);


  //Structure of projectTask list view
  const Projecttaskcolumn = [
    {
      name: 'ID',
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
      name: 'Start Date',
    },
    {
      name: 'End Date',
    },
    {
      name: 'Actual Comp Date',
    },
    {
      name: 'Actual Hours',
    },
    {
      name: 'Est Hours',
    },
    {
      name: 'Completion',
    },
    {
      name: 'Status',
    },
    {
      name: 'Task Type',
    },
    {
      name: 'Priority',
    },
    {
      name: 'File',
    },
  ];
  return (
    <Form>
      <Row>
        <Col md="3">
          <FormGroup>
            <Button color="primary" className="shadow-none" onClick={addContactToggle.bind(null)}>
              Add New Task{' '}
            </Button>
            <Modal size="xl" isOpen={addContactModal} toggle={addContactToggle.bind(null)}>
              <ModalHeader toggle={addContactToggle.bind(null)}>New Task</ModalHeader>
              <ModalBody>
                <Row>
                  <Col md="12">
                    <Card>
                      <CardBody>
                        <Form>
                          <Row>
                          
                            <Col md="4">
                    <FormGroup>
                      <Label>Project Title</Label>
                      <Input type="select" name="project_id"   onChange={(e) => {
                        handleInputsmilestone(e)
                  const selectedProject = e.target.value;
                  getMilestones(selectedProject);
                }}>
                        <option>Select Project</option>
                        {projectdetail &&
                          projectdetail.map((e) => (
                            <option key={e.project_id} value={e.project_id}>
                              {e.title}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Milestone</Label>
                      <Input type="select" name="project_milestone_id" onChange={handleInputsmilestone}>
                        <option>Select Milestone</option>
                        {milestoneDetail &&
                          milestoneDetail.map((e) => (
                            <option
                              key={e.project_id}
                              value={e.project_milestone_id}
                            >
                              {e.milestone_title}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                              <FormGroup>
                                <Label>Title</Label>
                                <Input
                                  type="text"
                                  name="task_title"
                                  onChange={handleInputsmilestone}
                                  value={insertTask && insertTask.task_title}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Staff</Label>
                                <Input
                                  type="select"
                                  name="employee_id"
                                  onChange={(e) => {
                                    handleInputsmilestone(e);
                                  }}
                                >
                                  <option value="" selected>
                                    Please Select
                                  </option>
                                  {employee &&
                                    employee.map((ele) => {
                                      return (
                                        ele.e_count === 0 && (
                                          <option key={ele.employee_id} value={ele.employee_id}>
                                            {ele.first_name}
                                          </option>
                                        )
                                      );
                                    })}
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md="3">
                              <FormGroup>
                                <Label>Start date</Label>
                                <Input
                                  type="date"
                                  onChange={handleInputsmilestone}
                                  value={
                                    insertTask && moment(insertTask.start_date).format('YYYY-MM-DD')
                                  }
                                  name="start_date"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="3">
                              <FormGroup>
                                <Label>End date</Label>
                                <Input
                                  type="date"
                                  onChange={handleInputsmilestone}
                                  value={
                                    insertTask && moment(insertTask.end_date).format('YYYY-MM-DD')
                                  }
                                  name="end_date"
                                />
                              </FormGroup>
                            </Col>
                            
                            <Col md="4">
                              <FormGroup>
                                <Label>Est Hours</Label>
                                <Input
                                  type="text"
                                  name="estimated_hours"
                                  onChange={handleInputsmilestone}
                                  value={insertTask && insertTask.estimated_hours}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Completion</Label>
                                <Input
                                  type="text"
                                  name="completion"
                                  onChange={handleInputsmilestone}
                                  value={insertTask && insertTask.completion}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                            <FormGroup>
                          <Label>Status</Label>
                          <Input
                            type="select"
                            name="status"
                            onChange={handleInputsmilestone}
                            value={insertTask && insertTask.status}
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
                          <Label>Task Type</Label>
                          <Input
                            type="select"
                            name="task_type"
                            onChange={handleInputsmilestone}
                            value={insertTask && insertTask.task_type}
                            >
                            {' '}
                            <option value="" selected="selected">
                              Please Select
                            </option>
                            <option value="Development">Development</option>
                            <option value="ChangeRequest">ChangeRequest</option>
                            <option value="Issues">Issues</option>      
                          </Input>
                        </FormGroup>
                            </Col>
                            <Col md="4">
                            <FormGroup>
                          <Label>Priority</Label>
                          <Input
                            type="select"
                            name="priority"
                            onChange={handleInputsmilestone}
                            value={insertTask && insertTask.priority}
                            >
                            {' '}
                            <option value="" selected="selected">
                              Please Select
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>    
                            <option value="4">4</option>      
                            <option value="5">5</option>      
  
                          </Input>
                        </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Descrition</Label>
                                <Input
                                  type="textarea"
                                  name="description"
                                  onChange={handleInputsmilestone}
                                  value={insertTask && insertTask.description}
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
                    insertMilestone();
                 
                  }}
                >
                  Submit
                </Button>
                <Button
                  color="secondary"
                  className="shadow-none"
                  onClick={addContactToggle.bind(null)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </FormGroup>
        </Col>
      </Row>
      <Table
        id="example"
        className="display border border-secondary rounded"
        title="projectTask List"
      >
        <thead>
          <tr>
            {Projecttaskcolumn.map((cell) => {
              return <td key={cell.name}>{cell.name}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {taskById &&
            taskById.map((element, index) => {
              return (
                <tr key={element.project_task_id}>
                  <td>{index + 1}</td>
                  <td>
                      <span
                        onClick={() => {
                          setContactData(element);
                          setEditTaskEditModal(true);
                        }}
                      >
                        <Icon.Edit2 />
                      </span>
                  </td>
                  <td>{element.task_title}</td>
                  <td>{element.first_name}</td>
                  <td>{moment(element.start_date).format('YYYY-MM-DD')}</td>
                  <td>{moment(element.end_date).format('YYYY-MM-DD')}</td>
                  <td>{moment(element.actual_completed_date).format('YYYY-MM-DD')}</td>
                  <td>{element.actual_hours}</td>
                  <td>{element.estimated_hours}</td>
                  <td>{element.completion}</td>
                  <td>{element.status}</td>
                  <td>{element.task_type}</td>
                  <td>{element.priority}</td>
                  <td>
                      <span
                        onClick={() => {
                          setRoomName('Task');
                          setFileTypes(['JPG', 'PNG', 'GIF', 'PDF']);
                          dataForAttachment();
                          setAttachmentModal(true);
                          setModuleId(element.project_task_id);
                        }}
                      >
                        <Icon.Plus />
                      </span>
                      <AttachmentModalV2
                        moduleId={moduleId}
                        attachmentModal={attachmentModal}
                        setAttachmentModal={setAttachmentModal}
                        roomName={roomName}
                        fileTypes={fileTypes}
                        altTagData="TaskRelated Data"
                        desc="TaskRelated Data"
                        recordType="RelatedPicture"
                        mediaType={attachmentData.modelType}
                        updateFile={updateFile}
                        setUpdateFile={setUpdateFile}
                      />
                    <ViewFileComponentV2
                      moduleId={element.project_task_id}
                      roomName="Task"
                      recordType="RelatedPicture"
                      updateFile={updateFile}
                      setUpdateFile={setUpdateFile}
                    />
                   </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Form>
  );
}
