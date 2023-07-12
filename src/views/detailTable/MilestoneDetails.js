import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';

const MilestoneDetails = () => {
  //All state variables
  const [projectdetails, setProjectDetails] = useState();
  const [milestoneDetails, setMilestoneDetails] = useState({
    milestone_title: '',
  });

  //Navigation and Parameters
  const navigate = useNavigate();

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
  //Milestone data in milestoneDetails
  const handleInputsmilestoneDetails = (e) => {
    setMilestoneDetails({ ...milestoneDetails, [e.target.name]: e.target.value });
  };
  //Insert Milestone
  const insertMilestone = () => {
    if (milestoneDetails.milestone_title !== ''){
      api
        .post('/milestone/insertmilestone', milestoneDetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          console.log(insertedDataId);
          message('Milestone inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/MilestoneEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
      }else {
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
                      <Input
                        type="text"
                        name="milestone_title"
                        onChange={handleInputsmilestoneDetails}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <Label>Project Title</Label>
                      <Input type="select" name="project_id" onChange={handleInputsmilestoneDetails}>
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
                        insertMilestone();
                      }}
                      type="button"
                      className="btn mr-2 shadow-none"
                    >
                      Save & Continue
                    </Button>
                    <Button
                      onClick={() => {
                        navigate('/Milestone');
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

export default MilestoneDetails;
