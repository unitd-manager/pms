import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';

const ProjectTaskDetails = () => {
  //All state variables
  const [projectdetails, setProjectDetails] = useState();
  const [taskdetails, setTaskDetails] = useState({
    task_title: '',
  });
  //Navigation and Parameters
  const navigate = useNavigate();
  //Milestone data in taskdetails
  const handleInputs = (e) => {
    setTaskDetails({ ...taskdetails, [e.target.name]: e.target.value });
  };

  //Api call for getting project name dropdown
  const getProjectname = () => {
    api
      .get('/projecttask/getProjectTitle')
      .then((res) => {
        setProjectDetails(res.data.data);
        console.log(res.data.data[0]);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };

  //Insert Milestone
  const insertTaskDetails = () => {
    if (taskdetails.task_title !== '')
      api
        .post('/projecttask/insertTask', taskdetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          //console.log(insertedDataId);
          message('task inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/TaskEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    else {
      message('Please fill all required fields.', 'warning');
    }
  };
  useEffect(() => {
    getProjectname();
  }, []);
  return (
    <div>
      <BreadCrumbs />
      <ToastContainer />
      <Row>
        <Col md="6" xs="12">
          {/* Key Details */}
          <ComponentCard title=" Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <Label>
                        {' '}
                        Title <span className="required"> *</span>{' '}
                      </Label>
                      <Input type="text" name="task_title" onChange={handleInputs} />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <Label>Project Title</Label>
                      <Input type="select" name="project_id" onChange={handleInputs}>
                        <option>Select Project</option>
                        {projectdetails &&
                          projectdetails.map((e) => {
                            return (
                              <option key={e.project_id} value={e.project_id}>
                                {e.title}
                              </option>
                            );
                          })}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        insertTaskDetails();
                      }}
                      type="button"
                      className="btn mr-2 shadow-none"
                    >
                      Save & Continue
                    </Button>
                    <Button
                      onClick={() => {
                        navigate('/TaskList');
                      }}
                      type="button"
                      className="btn btn-dark shadow-none"
                    >
                      Go to List
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default ProjectTaskDetails;
