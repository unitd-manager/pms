import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';

const ProjectTimesheetDetails = () => {
  //All state variables
  const [projectTimesheet, setProjectTimesheet] = useState({
    task_title: '',
    project_milestone_id:"",
    project_task_id:"",
    project_id:'',
  });
//Navigation and Parameters
const { id } = useParams();
  const navigate = useNavigate();
//Timesheet data in projectTimesheet
  const handleInputs = (e) => {
    setProjectTimesheet({ ...projectTimesheet, [e.target.name]: e.target.value });
  };
  const [milestones, setMilestones] = useState([]);
  const [taskdetail, setTaskDetail] = useState([]);
  const [projectTime, setProjectTime] = useState([]);

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

  //Api call for getting project name dropdown
  const getProjectTime = () => {
    api
      .get('/projecttask/getProjectTitle')
      .then((res) => {
        setProjectTime(res.data.data);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };
  // Api call for getting milestone dropdown based on project ID
const getMilestoneTime = () => {
  api
    .post('/projecttimesheet/getMilestoneTitle', { project_id: projectTimesheet.project_id })
    .then((res) => {
      // Assuming the response data is an array of milestones with keys: milestone_id and milestone_title
      const milestoneTimeSheet = res.data.data;
      setMilestones(milestoneTimeSheet);
    })
    .catch(() => {
      message('Milestone not found', 'info');
    });
};


  // Api call for getting milestone dropdown based on project ID
  const getTaskTime = (projectIds) => {
    api
      .post('/projecttimesheet/getTaskByID', { project_milestone_id: projectIds })
      .then((res) => {
        setTaskDetail(res.data.data);
      })
      .catch(() => {
        message('Task not found', 'info');
      });
  };
  useEffect(() => {
    getProjectTime();
  }, [id]); 

  useEffect(() => { 
    if (projectTimesheet.project_id) {
      // Use taskdetails.project_id directly to get the selected project ID
      const selectedTimesheet = projectTimesheet.project_id;
      getMilestoneTime(selectedTimesheet);
    }
  }, [projectTimesheet.project_id]);

  useEffect(() => {
    if (projectTimesheet.project_milestone_id) {
      // Use taskdetails.project_milestone_id directly to get the selected project ID
      const selectedTask = projectTimesheet.project_milestone_id;
      getTaskTime(selectedTask);
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
                <Col md="12">
                    <FormGroup>
                      <Label>Project Title</Label>
                      <Input type="select" name="project_id"   onChange={(e) => {
                        handleInputs(e)
                  const selectedTimesheet = e.target.value;
                  getMilestoneTime(selectedTimesheet);
                }}>
                        <option>Select Project</option>
                        {projectTime &&
                          projectTime.map((e) => (
                            <option key={e.project_id} value={e.project_id}>
                              {e.title}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                <Col md="4">
                    <FormGroup>
                      <Label>Milestone Title</Label>
                      <Input type="select" name="project_milestone_id"   onChange={(e) => {
                        handleInputs(e)
                  const selectedTask = e.target.value;
                  getTaskTime(selectedTask);
                }}>
                        <option>Select Project</option>
                        {milestones &&
                          milestones.map((e) => (
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
