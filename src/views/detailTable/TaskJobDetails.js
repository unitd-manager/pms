import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';

const TaskJobDetails = () => {
  //All state variables
  const [employeeTeam, setEmployeeTeam] = useState();
  const [teamdetails, setTeamDetails] = useState({
employee_id:'',first_name:''});
//Navigation and Parameters
const { id } = useParams();
const navigate = useNavigate();
   // Gettind data from Job By Id
   const editJob = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        console.log(res.data.data);
        setEmployeeTeam(res.data.data);
      })
      .catch(() => {});
  };
//Milestone data in teamdetails
  const handleInputsTeamDetails = (e) => {
    setTeamDetails({ ...teamdetails, [e.target.name]: e.target.value });
  };

//Insert Milestone
  const insertTeamDetails = () => {
    api.post('/projectteam/insertTeam', teamdetails)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        message('Team inserted successfully.', 'success');
        setTimeout(() => {
          navigate(`/TaskJobEdit/${insertedDataId}`);
        }, 300);
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
     
  };
  useEffect(() => {
    editJob();
  }, [id]); 
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
                    <Label>
                      {' '}
                      Title <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                    type="select"
                    name="employee_id"
                    onChange={(e) => {
                      handleInputsTeamDetails(e);
                    }}>
                    <option defaultValue="" selected >Please Select</option>
                    {employeeTeam &&
                      employeeTeam.map((ele) => {
                        return (
                           (<option key={ele.employee_id} value={ele.employee_id}>
                            {ele.first_name}
                          </option>)
                        );
                      })}
                  </Input>      
                    </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
          <div className="pt-3 mt-3 d-flex align-items-center gap-2">
            <Button color="primary"
              onClick={() => {
                insertTeamDetails();
              }}
              type="button"
              className="btn mr-2 shadow-none"
            >Save & Continue
            </Button>
            <Button
              onClick={() => {
                navigate('/TaskJob');
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

export default TaskJobDetails;
