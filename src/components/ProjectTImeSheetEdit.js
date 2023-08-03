import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  ModalBody,
  Modal,
  ModalHeader,
  ModalFooter,
  Form,
} from 'reactstrap';
import PropTypes from 'prop-types';
import '../views/form-editor/editor.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import moment from 'moment';
import message from './Message';
import api from '../constants/api';
import ComponentCard from './ComponentCard';


const ProjectTimeSheetEdit = ({ editTimeSheetModal, setEditTimeSheetEditModal, contactDatass, getTimeSheetById, id }) => {
  ProjectTimeSheetEdit.propTypes = {
    editTimeSheetModal: PropTypes.bool,
    setEditTimeSheetEditModal: PropTypes.func,
    contactDatass: PropTypes.object,
    getTimeSheetById:PropTypes.func,
    id:PropTypes.any,

  };

  //All state variable
  const [timeSheetProject, setTimeSheetProject] = useState();
  const [employeeTime, setEmployeeTime] = useState();
  const [milestoneTimesheet, setMilestoneTimeSheet] = useState([]);
  const [taskTimeSheet, setTaskTimeSheet] = useState([]);
  

  // Gettind data from Job By Id
  const editJobByIdss = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        console.log(res.data.data);
        setEmployeeTime(res.data.data);
      })
      .catch(() => {});
  };
  //milestone data in milestone
  const handleInputs = (e) => {
    setTimeSheetProject({ ...timeSheetProject, [e.target.name]: e.target.value });
  };

  const editTimeSheetProject = () => {
    api
      .post('/projecttimesheet/editTimeSheet', timeSheetProject)
      .then(() => {
        message('Record editted successfully', 'success');
        getTimeSheetById();
        setTimeout(() => {
          setEditTimeSheetEditModal(false);
        }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

   // Api call for getting milestone name dropdown
   const getMilestoneTime = () => {
    api
      .post('/projecttimesheet/getMilestoneTitle',{ project_id: id })
      .then((res) => {
        setMilestoneTimeSheet(res.data.data);
      })
      .catch(() => {
        message('Milestone not found', 'info');
      });
  };

  // Api call for getting task dropdown based on project ID
  const getTaskTime = (projectId) => {
    api
      .post('/projecttimesheet/getTaskByID', { project_milestone_id: projectId })
      .then((res) => {
        setTaskTimeSheet(res.data.data);
      })
      .catch(() => {
        message('Task not found', 'info');
      });
  };

  useEffect(() => {
    editJobByIdss();
    setTimeSheetProject(contactDatass);
  }, [contactDatass]);

  useEffect(() => { 
    getMilestoneTime();
  }, [id]);
  useEffect(() => {
    if (timeSheetProject && timeSheetProject.project_milestone_id) {
      // Use taskdetails.project_milestone_id directly to get the selected project ID
      const selectedTask = timeSheetProject.project_milestone_id;
      getTaskTime(selectedTask);
    }
  }, [timeSheetProject && timeSheetProject.project_milestone_id]);



  return (
    <>
      <Modal size="lg" isOpen={editTimeSheetModal}>
        <ModalHeader>
          <Button
            color="secondary"
            onClick={() => {
              setEditTimeSheetEditModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          {/* milestone Details */}
          <Form>
            <FormGroup>
              <ComponentCard title="TimeSheet Details">
                {' '}
                <div>
                  <Form>
                    <Row>
                      <Col md="3">
                        <FormGroup>
                          <Label>Title</Label>
                          <Input
                            type="text"
                            onChange={handleInputs}
                            value={timeSheetProject && timeSheetProject.task_title}
                            name="task_title"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                    <FormGroup>
                      <Label>Milestone Title</Label>
                      <Input type="select" 
                      name="project_milestone_id"
                    value={timeSheetProject && timeSheetProject.project_milestone_id}  
                     onChange={(e) => {
                        handleInputs(e)
                  const selectedTask = e.target.value;
                  getTaskTime(selectedTask);
                }}>
                        <option>Select Project</option>
                        {milestoneTimesheet &&
                          milestoneTimesheet.map((e) => (
                            <option key={e.project_id} value={e.project_milestone_id}>
                              {e.milestone_title}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Task</Label>
                      <Input
                    type="select"
                    name="project_task_id"
                    value={timeSheetProject && timeSheetProject.project_task_id}
                    onChange={handleInputs}
                    >
                     <option defaultValue="selected">Please Select</option>
                        {taskTimeSheet &&
                          taskTimeSheet.map((e) => (
                            <option
                              key={e.project_milestone_id}
                              value={e.project_task_id}
                            >
                              {e.task_title}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Staff</Label>
                          <Input
                            type="select"
                            name="employee_id"
                            onChange={handleInputs}
                            value={timeSheetProject && timeSheetProject.employee_id}
                          >
                            <option value="selected">Please Select</option>
                            {employeeTime &&
                              employeeTime.map((ele) => {
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
                          <Label>Date</Label>
                          <Input
                            type="date"
                            onChange={handleInputs}
                            value={moment(timeSheetProject && timeSheetProject.date).format(
                              'YYYY-MM-DD',
                            )}  
                            name="date"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label>Hours</Label>
                          <Input
                            type="numbers"
                            onChange={handleInputs}
                            value={timeSheetProject && timeSheetProject.hours}
                            name="hours"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label>Description</Label>
                          <Input
                            type="textarea"
                            onChange={handleInputs}
                            value={timeSheetProject && timeSheetProject.description}
                            name="description"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </ComponentCard>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Row>
            <div className="pt-3 mt-3 d-flex align-items-center gap-2">
              <Button
                color="primary"
                onClick={() => {
                  editTimeSheetProject();
                }}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setEditTimeSheetEditModal(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Row>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ProjectTimeSheetEdit;
