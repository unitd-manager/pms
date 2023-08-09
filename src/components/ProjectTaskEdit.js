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

const ProjectTaskEdit = ({
  editTaskEditModal,
  setEditTaskEditModal,
  contactDatas,
  getTaskById,
  id,
}) => {
  ProjectTaskEdit.propTypes = {
    editTaskEditModal: PropTypes.bool,
    setEditTaskEditModal: PropTypes.func,
    contactDatas: PropTypes.object,
    getTaskById: PropTypes.func,
    id: PropTypes.any,
  };

  //All state variable
  const [taskProject, setTaskProject] = useState();
  const [employees, setEmployees] = useState();
  const [milestonesTaskEdit, setMilestonesTaskEdit] = useState([]);


  // Gettind data from Job By Id
  const editJobByIds = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        console.log(res.data.data);
        setEmployees(res.data.data);
      })
      .catch(() => {});
  };

   // Api call for getting project name dropdown
   const getMilestoneTask = () => {
    api
      .post('/projecttimesheet/getMilestoneTitle',{ project_id: id })
      .then((res) => {
        setMilestonesTaskEdit(res.data.data);
      })
      .catch(() => {
        message('Milestone not found', 'info');
      });
  };


  const handleInputs = (e) => {
    setTaskProject({ ...taskProject, [e.target.name]: e.target.value });
  };

  const editTaskProject = () => {
    if (taskProject.task_title !== '') {
      api
        .post('/projecttask/editTask', taskProject)
        .then(() => {
          message('Record editted successfully', 'success');
          getTaskById();
          setTimeout(() => {
            setEditTaskEditModal(false);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('error');
    }
  };

  useEffect(() => {
    editJobByIds();
    setTaskProject(contactDatas);
  }, [contactDatas]);

  useEffect(() => { 
    getMilestoneTask();
  }, [id]);

  return (
    <>
      <Modal size="lg" isOpen={editTaskEditModal}>
        <ModalHeader>
          <Button
            color="secondary"
            onClick={() => {
              setEditTaskEditModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          {/* task Details */}
          <Form>
            <FormGroup>
              <ComponentCard title="Task Details">
                {' '}
                <div>
                  <Form>
                    <Row>
                    <Col md="4">
                    <FormGroup>
                      <Label>Milestone Title</Label>
                      <Input type="select" 
                      name="project_milestone_id"
                    value={taskProject && taskProject.project_milestone_id}  
                    onChange={handleInputs}
                >
                        <option>Select Project</option>
                        {milestonesTaskEdit &&
                          milestonesTaskEdit.map((e) => (
                            <option key={e.project_id} value={e.project_milestone_id}>
                              {e.milestone_title}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label>Title</Label>
                          <Input
                            type="text"
                            onChange={handleInputs}
                            value={taskProject && taskProject.task_title}
                            name="task_title"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Staff</Label>
                          <Input
                            type="select"
                            name="employee_id"
                            onChange={handleInputs}
                            value={taskProject && taskProject.employee_id}
                          >
                            <option value="selected">Please Select</option>
                            {employees &&
                              employees.map((ele) => {
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
                            onChange={handleInputs}
                            value={moment(taskProject && taskProject.start_date).format(
                              'DD-MM-YYYY',
                            )}
                            name="start_date"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label>End date</Label>
                          <Input
                            type="date"
                            onChange={handleInputs}
                            value={moment(taskProject && taskProject.end_date).format('DD-MM-YYYY')}
                            name="end_date"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label>Act Comp date</Label>
                          <Input
                            type="date"
                            onChange={handleInputs}
                            value={moment(taskProject && taskProject.actual_completed_date).format('DD-MM-YYYY')}
                            name="actual_completed_date"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Actual Hours</Label>
                          <br />
                  <span>{taskProject && taskProject.actual_hours}</span>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Est Hours</Label>
                          <Input
                            type="numbers"
                            name="estimated_hours"
                            onChange={handleInputs}
                            value={taskProject && taskProject.estimated_hours}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Completion</Label>
                          <Input
                            type="text"
                            name="completion"
                            onChange={handleInputs}
                            value={taskProject && taskProject.completion}
                          />
                        </FormGroup>
                      </Col>
                     
                      <Col md="4">
                        <FormGroup>
                          <Label>Status</Label>
                          <Input
                            type="select"
                            name="status"
                            onChange={handleInputs}
                            value={taskProject && taskProject.status}
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
                          <Label>Task type</Label>
                          <Input
                            type="select"
                            name="task_type"
                            onChange={handleInputs}
                            value={taskProject && taskProject.task_type}
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
                            onChange={handleInputs}
                            value={taskProject && taskProject.priority}
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
                      <Col md="12">
                        <FormGroup>
                          <Label>Description</Label>
                          <Input
                            type="textarea"
                            name="description"
                            onChange={handleInputs}
                            value={taskProject && taskProject.description}
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
                  editTaskProject();
                }}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setEditTaskEditModal(false);
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

export default ProjectTaskEdit;
