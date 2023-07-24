import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';

const ProjectTimesheetDetails = () => {
  //All state variables
  const [projectTimesheet, setProjectTimesheet] = useState({
    task_title: '',
  });
//Navigation and Parameters
  const navigate = useNavigate();
//Milestone data in projectTimesheet
  const handleInputs = (e) => {
    setProjectTimesheet({ ...projectTimesheet, [e.target.name]: e.target.value });
  };
//Insert Milestone
  const insertTimesheet = () => {
    if (projectTimesheet.task_title !== '')
    api.post('/projecttimesheet/insertTimeSheet', projectTimesheet)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        console.log(insertedDataId);
        message('timesheet inserted successfully.', 'success');
        setTimeout(() => {
          navigate(`/ProjectTimesheetEdit/${insertedDataId}`);
        }, 300);
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
      else {
        message('Please fill all required fields.', 'error');
      }
  };
  useEffect(() => {}, []);
  return (
    <div>
      <BreadCrumbs />
      <ToastContainer />
      <Row>
        <Col md="6" xs="12">
          {/* Key Details */}
          <ComponentCard title="Timesheet Details">
          <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      {' '}
                      Title <span className="required"> *</span>{' '}
                    </Label>
                    <Input type="text" name="task_title" onChange={handleInputs} />
                    </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
          <div className="pt-3 mt-3 d-flex align-items-center gap-2">
            <Button color="primary"
              onClick={() => {
                insertTimesheet();
              }}
              type="button"
              className="btn mr-2 shadow-none"
            >Save & Continue
            </Button>
            <Button
              onClick={() => {
                navigate('/ProjectTimesheet');
              }}
              type="button"
              className="btn btn-dark shadow-none" 
            >Go to List
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

export default ProjectTimesheetDetails;
