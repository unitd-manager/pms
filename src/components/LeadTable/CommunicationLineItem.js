import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
//import Select from 'react-select';
import * as $ from 'jquery';
import random from 'random';
//import AsyncSelect from 'react-select/async';
import api from '../../constants/api';
import message from '../Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const CommunicationLineItem = ({
  addLineItemModal,
  setAddLineItemModal,
  communicationLine,
  // tenderDetails,
  // getLineItem,
}) => {
  CommunicationLineItem.propTypes = {
    addLineItemModal: PropTypes.bool,
    setAddLineItemModal: PropTypes.func,
    communicationLine: PropTypes.any,
    // tenderDetails: PropTypes.any,
    // getLineItem: PropTypes.any,
  };

  const { loggedInuser } = React.useContext(AppContext);
  const [addLineItem, setAddLineItem] = useState([
    {
      id: random.int(1, 99),
      communication_date: '',
      communication_type: '',
      topic: '',
      description: '',
      status: '',
      result: '',
      supplier_id: '',
      priority: '',
      duration: '',
    },
  ]);

  //Add new line item
  const AddNewLineItem = () => {
    setAddLineItem([
      ...addLineItem,
      {
        id: new Date().getTime().toString(),
        communication_date: '',
        communication_type: '',
        topic: '',
        description: '',
        status: '',
        result: '',
        supplier_id: '',
        priority: '',
        duration: '',
      },
    ]);
  };
  //Insert Invoice Item
  const addLineItemApi = (obj) => {
    //obj.opportunity_id = projectInfo;
    obj.creation_date = creationdatetime;
    obj.created_by = loggedInuser.first_name;
    obj.lead_id = communicationLine;
    api
      .post('/lead/insertCommunicationItems', obj)
      .then(() => {
        message('Line Item Added Successfully', 'sucess');
        //getLineItem(tenderDetails.material_request_id);
        //setAddLineItemModal(false);
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch(() => {
        //message('Cannot Add Line Items', 'error');
      });
  };
  //Invoice item values
  const getAllValues = () => {
    const result = [];
    $('.lineitem tbody tr').each(function input() {
      const allValues = {};
      $(this)
        .find('input')
        .each(function output() {
          const fieldName = $(this).attr('name');
          allValues[fieldName] = $(this).val();
        });
      result.push(allValues);
    });
    //setTotalAmount(0);
    console.log(result);
    result.forEach((element) => {
      addLineItemApi(element);
    });
    console.log(result);
  };

  const ClearValue = (ind) => {
    setAddLineItem((current) =>
      current.filter((obj) => {
        return obj.id !== ind.id;
      }),
    );
  };

  return (
    <>
      <Modal size="xl" isOpen={addLineItemModal}>
        <ModalHeader>
          Add Communication Items
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setAddLineItemModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Form>
                <Row>
                  <Row>
                    <Col md="3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        type="button"
                        onClick={() => {
                          AddNewLineItem();
                        }}
                      >
                        Add Line Item
                      </Button>
                    </Col>
                  </Row>
                  {/* Invoice Item */}
                  <Card>
                    <table className="lineitem">
                      <thead>
                        <tr>
                          <th scope="col">Interaction Date </th>
                          <th scope="col">Interaction Type</th>
                          <th scope="col">Topic </th>
                          <th scope="col">Description</th>
                          <th scope="col">Status</th>
                          <th scope="col">Result</th>
                          <th scope="col">Priority</th>
                          <th scope="col">Duration</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {addLineItem &&
                          addLineItem.map((item) => {
                            return (
                              <tr key={item.id}>
                                <td data-label="Interaction Date">
                                  <Input
                                    Value={item.communication_date}
                                    type="date"
                                    name="communication_date"
                                  />
                                </td>
                                <td data-label="Interaction Type">
                                  <Input
                                    Value={item.communication_type}
                                    type="text"
                                    name="communication_type"
                                  />
                                </td>
                                <td data-label="Topic">
                                  <Input Value={item.topic} type="text" name="topic" />
                                </td>
                                <td data-label="Description">
                                  <Input
                                    Value={item.description}
                                    type="text"
                                    name="description"
                                  />
                                </td>
                                <td data-label="Status">
                                  <Input Value={item.status} type="text" name="status" />
                                </td>
                                <td data-label="Result">
                                  <Input Value={item.result} type="text" name="result" />
                                </td>
                                <td data-label="Priority">
                                  <Input Value={item.priority} type="text" name="priority" />
                                </td>
                                <td data-label="Duration">
                                  <Input Value={item.duration} type="text" name="duration" />
                                </td>
                                <td data-label="Action">
                                  <Input type="hidden" name="id" Value={item.id}></Input>
                                  <span
                                    className="addline"
                                    onClick={() => {
                                      ClearValue(item);
                                    }}
                                  >
                                    Clear
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </Card>
                  <ModalFooter>
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={() => {
                        getAllValues();
                        //setAddLineItemModal(false);
                      }}
                    >
                      {' '}
                      Submit{' '}
                    </Button>
                    <Button
                      className="shadow-none"
                      color="secondary"
                      onClick={() => {
                        setAddLineItemModal(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Row>
              </Form>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};
export default CommunicationLineItem;
