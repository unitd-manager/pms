import React, { useState } from 'react';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Button,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import api from '../../constants/api';
import message from '../Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';


const EditFollowupItemModal = ({ editFollowupModal, setEditFollowupModal, projectdetails,FetchFollowupItemData }) => {
    EditFollowupItemModal.propTypes = {
    editFollowupModal: PropTypes.bool,
    setEditFollowupModal: PropTypes.func,
    FetchFollowupItemData: PropTypes.object,
    projectdetails:PropTypes.object,
  };
const {id}=useParams();
  const [lineItemData, setLineItemData] = useState(null);
  
  const { loggedInuser } = React.useContext(AppContext);

  const handleData = (e) => {
    setLineItemData({ ...lineItemData, [e.target.name]: e.target.value });
  };
  

  const UpdateData = () => {
    lineItemData.lead_id=id;
    //lineItemData.amount=totalAmount;
    lineItemData.modification_date = creationdatetime;
    lineItemData.modified_by = loggedInuser.first_name;
    
    api
      .post('/lead/editFollowupItem', lineItemData)
      .then((res) => {
        console.log('edit Line Item', res.data.data);
        message('Edit Line Item Udated Successfully.', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 300);      })
      .catch(() => {
        message('Unable to edit Line Item. please fill all fields', 'error');
      });
  };
  

  React.useEffect(() => {
    setLineItemData(FetchFollowupItemData);
  }, [FetchFollowupItemData]);

  return (
    <>
      <Modal isOpen={editFollowupModal}>
        <ModalHeader>Line Items</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Row>
              <Label sm="2">Task Description</Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="description"
                  defaultValue={lineItemData && lineItemData.description}
                  onChange={handleData}
                  
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">Due Date</Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="due_date"
                  defaultValue={lineItemData && lineItemData.due_date}
                  onChange={handleData}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">Assigned To</Label>
              <Col sm="10">
                <Input
                  type="select"
                  name="employee_id"
                  defaultValue={lineItemData && lineItemData.employee_id}
                  onChange={handleData}>

<option value="" selected="selected">
                      Please Select
                    </option>
                    {projectdetails &&
                      projectdetails.map((ele) => {
                        return <option value={ele.value}>{ele.first_name}</option>;
                      })}
                  </Input>
                 
               
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">Priority</Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="priority"
                  defaultValue={lineItemData && lineItemData.priority}
                  onChange={handleData}
                >
                
                </Input>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">Status</Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="status"
                  defaultValue={lineItemData && lineItemData.status}
                  onChange={handleData}
                    
                  
                />
                 
              </Col>
            </Row>
          </FormGroup>
          
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            type="button"
            onClick={() => {
              UpdateData();
              setEditFollowupModal(false);
            }}
          >
            Save & Continue
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
                setEditFollowupModal(false);
            }}
          >
            {' '}
            Cancel{' '}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditFollowupItemModal;
