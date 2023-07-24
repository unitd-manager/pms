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
}) => {
  ProjectTaskEdit.propTypes = {
    editTaskEditModal: PropTypes.bool,
    setEditTaskEditModal: PropTypes.func,
    contactDatas: PropTypes.object,
    getTaskById: PropTypes.func,
  };

  //All state variable
  const [taskProject, setTaskProject] = useState();
  const [employees, setEmployees] = useState();

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
          {/* milestone Details */}
          <Form>
            <FormGroup>
              <ComponentCard title="Task Details">
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
                              'YYYY-MM-DD',
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
                            value={moment(taskProject && taskProject.end_date).format('YYYY-MM-DD')}
                            name="end_date"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label>Actual Comp date</Label>
                          <Input
                            type="date"
                            onChange={handleInputs}
                            value={moment(taskProject && taskProject.actual_completed_date).format('YYYY-MM-DD')}
                            name="actual_completed_date"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Actual Hours</Label>
                          <Input
                            type="numbers"
                            name="actual_hours"
                            onChange={handleInputs}
                            value={taskProject && taskProject.actual_hours}
                          />
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
                          <Label>Description</Label>
                          <Input
                            type="textarea"
                            name="description"
                            onChange={handleInputs}
                            value={taskProject && taskProject.description}
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
