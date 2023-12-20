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


const EditLineItemModal = ({ editLineModal, setEditLineModal, FetchLineItemData }) => {
  EditLineItemModal.propTypes = {
    editLineModal: PropTypes.bool,
    setEditLineModal: PropTypes.func,
    FetchLineItemData: PropTypes.object,
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
      .post('/lead/editCommunicationItem', lineItemData)
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
    setLineItemData(FetchLineItemData);
  }, [FetchLineItemData]);

  return (
    <>
      <Modal isOpen={editLineModal}>
        <ModalHeader>Line Items</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Row>
              <Label sm="2">Interaction Date</Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="communication_date"
                  defaultValue={lineItemData && lineItemData.communication_date}
                  onChange={handleData}
                  disabled
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">Interaction Type</Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="communication_type"
                  defaultValue={lineItemData && lineItemData.communication_type}
                  onChange={handleData}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">Topic</Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="topic"
                  defaultValue={lineItemData && lineItemData.topic}
                  onChange={handleData}
                 
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">Description</Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="description"
                  defaultValue={lineItemData && lineItemData.description}
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
          <FormGroup>
            <Row>
              <Label sm="2">Result</Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="result"
                  defaultValue={lineItemData && lineItemData.result}
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
              setEditLineModal(false);
            }}
          >
            Save & Continue
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setEditLineModal(false);
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

export default EditLineItemModal;
