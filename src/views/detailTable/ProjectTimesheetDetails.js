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
    project_milestone_id:"",
    project_task_id:""
  });
//Navigation and Parameters
  const navigate = useNavigate();
//Timesheet data in projectTimesheet
  const handleInputs = (e) => {
    setProjectTimesheet({ ...projectTimesheet, [e.target.name]: e.target.value });
  };
  const [milestones, setMilestones] = useState([]);
  const [taskdetail, setTaskDetail] = useState([]);

   // Api call for getting project name dropdown
   const getMilestoneName = () => {
    api
      .get('/projecttimesheet/getMilestoneTitle')
      .then((res) => {
        setMilestones(res.data.data);
      })
      .catch(() => {
        message('Milestone not found', 'info');
      });
  };

  // Api call for getting milestone dropdown based on project ID
  const getTaskName = (projectId) => {
    api
      .post('/projecttimesheet/getTaskByID', { project_milestone_id: projectId })
      .then((res) => {
        setTaskDetail(res.data.data);
      })
      .catch(() => {
        message('Task not found', 'info');
      });
  };
//Insert Timesheet
  const insertTimesheet = () => {
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
      
  };

  useEffect(() => {
  
    getMilestoneName();
  }, []);
  useEffect(() => {
    if (projectTimesheet.project_milestone_id) {
      // Use taskdetails.project_milestone_id directly to get the selected project ID
      const selectedTask = projectTimesheet.project_milestone_id;
      getTaskName(selectedTask);
    }
  }, [projectTimesheet.project_milestone_id]);
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
                <Col md="4">
                    <FormGroup>
                      <Label>Milestone Title</Label>
                      <Input type="select" name="milestone_title"   onChange={(e) => {
                        handleInputs(e)
                  const selectedTask = e.target.value;
                  getTaskName(selectedTask);
                }}>
                        <option>Select Project</option>
                        {milestones &&
                          milestones.map((e) => (
                            <option key={e.project_milestone_id} value={e.project_milestone_id}>
                              {e.milestone_title}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Task</Label>
                      <Input type="select" name="project_task_id" onChange={handleInputs}>
                        <option>Select Task</option>
                        {taskdetail &&
                          taskdetail.map((e) => (
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
