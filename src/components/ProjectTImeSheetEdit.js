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


const ProjectTimeSheetEdit = ({ editTimeSheetModal, setEditTimeSheetEditModal, contactDatass, getTimeSheetById }) => {
  ProjectTimeSheetEdit.propTypes = {
    editTimeSheetModal: PropTypes.bool,
    setEditTimeSheetEditModal: PropTypes.func,
    contactDatass: PropTypes.object,
    getTimeSheetById:PropTypes.func,
  };

  //All state variable
  const [timeSheetProject, setTimeSheetProject] = useState();
  const [employeeTime, setEmployeeTime] = useState();

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

  useEffect(() => {
    editJobByIdss();
    setTimeSheetProject(contactDatass);
  }, [contactDatass]);

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
