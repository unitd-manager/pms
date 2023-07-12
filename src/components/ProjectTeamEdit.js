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
import message from './Message';
import api from '../constants/api';
import ComponentCard from './ComponentCard';

const ProjectTeamEdit = ({ editTeamModal, setEditTeamEditModal, contactDataTeam, getTeamById }) => {
  ProjectTeamEdit.propTypes = {
    editTeamModal: PropTypes.bool,
    setEditTeamEditModal: PropTypes.func,
    contactDataTeam: PropTypes.object,
    getTeamById: PropTypes.func
  };

  //All state variable
  const [teamPojects, setTeamProjects] = useState();
  const [employeeTeam, setEmployeeTeam] = useState();

  // Gettind data from Job By Id
  const editJobTeam = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        console.log(res.data.data);
        setEmployeeTeam(res.data.data);
      })
      .catch(() => {});
  };
  //milestone data in milestone
  const handleInputs = (e) => {
    setTeamProjects({ ...teamPojects, [e.target.name]: e.target.value });
  };

  const editTeamProjectss = () => {
    api
      .post('/projectteam/editTeam', teamPojects)
      .then(() => {
        message('Record editted successfully', 'success');
        getTeamById();
        setTimeout(() => {
          contactDataTeam(false);
        }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    editJobTeam();
    setTeamProjects(contactDataTeam);
  }, [contactDataTeam]);

  return (
    <>
      <Modal size="lg" isOpen={editTeamModal}>
        <ModalHeader>
          <Button
            color="secondary"
            onClick={() => {
              setEditTeamEditModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          {/* milestone Details */}
          <Form>
            <FormGroup>
              <ComponentCard title="Team Details">
                {' '}
                <div>
                  <Form>
                    <Row>
                      <Col md="3">
                        <FormGroup>
                          <Label>Name</Label>
                          <Input
                            type="select"
                            name="employee_id"
                            onChange={handleInputs}
                            value={teamPojects && teamPojects.employee_id}
                          >
                            <option value="" defaultValue='selected' >
                  </option>
                            {employeeTeam &&
                              employeeTeam.map((ele) => {
                                return (
                                  ele.e_count === 0 &&(<option key={ele.employee_id} value={ele.employee_id}>
                                    {ele.first_name}
                                  </option>)
                                );
                                
                              })}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label>Designation</Label>
                          <br />
                  <span>{teamPojects && teamPojects.designation}</span>
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label>Department</Label>
                          <br />
                  <span>{teamPojects && teamPojects.department}</span>
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
                  editTeamProjectss();
                }}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setEditTeamEditModal(false);
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

export default ProjectTeamEdit;
