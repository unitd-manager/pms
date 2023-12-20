import React, { useState, useEffect,useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';


const LeadDetails = () => {
  
    // Navigation and Parameter Constants
  const navigate = useNavigate();
  const { loggedInuser } = useContext(AppContext);
  //  insertClient
  const [leadForms, setLeadForms] = useState({
    lead_title: '',
    company_id:'',
    employee_id:'',
    source_of_lead:'',
  });

  //Client Functions/Methods
  const handleLeadForms = (e) => {
    setLeadForms({ ...leadForms, [e.target.name]: e.target.value });
  };

  // Client Insert
  const insertLead = () => {
    if(leadForms.lead_title !== '' && leadForms.source_of_lead !== '' ){
      leadForms.creation_date = creationdatetime;
      leadForms.created_by = loggedInuser.first_name;
    api
      .post('/lead/insertLeadCompany', leadForms)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        console.log(insertedDataId);
        message('Lead inserted successfully.', 'success');
        setTimeout(() => {
          navigate(`/LeadEdit/${insertedDataId}`);
        }, 300);
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
    }else{
      message('Please fill all required fields','warning');
  }
  };

  useEffect(() => {
  }, []);
 
  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="6" xs="12">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Title {' '}<span className='required'> *</span>{' '}</Label>

                    <Input
                      type="text"
                      name="lead_title"
                      onChange={(e) => {
                        handleLeadForms(e);
                      }}
                    ></Input>
                  </Col>
                  <Col md="12">
                    <Label>Source of Lead {' '}<span className='required'> *</span>{' '}</Label>

                    <Input
                      type="text"
                      name="source_of_lead"
                      onChange={(e) => {
                        handleLeadForms(e);
                      }}
                    ></Input>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button color="primary"
                      onClick={() => {
                        insertLead();
                      }}
                      type="button"
                      className="btn mr-2 shadow-none"
                    >
                      Save & Continue
                    </Button>
                    <Button 
                      onClick={() => {
                        navigate(-1);
                      }}
                      type="button"
                      className="btn btn-dark shadow-none"
                    >
                      Cancel
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

export default LeadDetails;
