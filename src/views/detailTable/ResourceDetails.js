import React, { useState } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import { useNavigate} from 'react-router-dom';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs'
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';

const ResourceDetails = () => {
  //All const variables
  const navigate = useNavigate()
  const [contentDetails, setContentDetails] = useState({
    title: "",
    creation_date:moment(),
    content_date:moment(),
    content_type:''
  });
  //setting data in contentDetails
  const handleInputs = (e) => {
    setContentDetails({ ...contentDetails, [e.target.name]: e.target.value });
  }

  //Insert Content Data
  const insertData = () => {  
    if (contentDetails.title !== ''){
    api.post('/content/insertResource', contentDetails)
    .then((res) => {
      const insertedDataId= res.data.data.insertId
      message('Data inserted successfully.','success')
      setTimeout(()=> {
        navigate(`/ResourceEdit/${insertedDataId}`)
      },300);     
    })
    .catch(() => {
      message('Network connection error.', 'error');
    });
  }else {
  message('Please fill all required fields.', 'error');
}
};

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="6">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                <Col md="12">
                    <Label>Title</Label>
                    <Input type="text"
                      onChange={handleInputs}
                      value={contentDetails && (contentDetails.title)}
                      name="title" />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                  <Button className='shadow-none'
                    color="primary"
                    onClick={() => {
                      insertData();
                    }}>
                    Save
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
}
export default ResourceDetails