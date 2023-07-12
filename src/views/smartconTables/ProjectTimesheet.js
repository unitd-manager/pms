import React, { useEffect, useState } from 'react';
import {
  Row,
  Form,
  ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  Table,
  Label,
  Input,
  Col,
  FormGroup,
  Button,
  CardBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import moment from 'moment';
import message from '../../components/Message';
import api from '../../constants/api';

export default function ProjectTimeSheet({
  addContactToggless,
  addContactModalss,
  setEditTimeSheetEditModal,
  id,
  timeSheetById,
  setContactDatass,
  getTimeSheetById,
}) {
  ProjectTimeSheet.propTypes = {
    addContactToggless: PropTypes.func,
    setEditTimeSheetEditModal: PropTypes.func,
    addContactModalss: PropTypes.bool,
    id:PropTypes.any,
    timeSheetById:PropTypes.any,
    setContactDatass:PropTypes.func,
    getTimeSheetById:PropTypes.func,
  };

  const [insertTimeSheet, setInsertTimesheet] = useState({
    timesheet_title: "",
    first_name:"",
    date:"",
    normal_hours:"",
    status:"",
    description:"",
  });

   const[employeeTime,setEmployee] = useState()

    // Gettind data from Job By Id
  const editJobById = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        console.log(res.data.data);
        setEmployee(res.data.data);
      })
      .catch(() => {});
  };
//Milestone data in milestoneDetails
  const handleInputsTime = (e) => {
    setInsertTimesheet({ ...insertTimeSheet, [e.target.name]: e.target.value });
  };
//Insert Milestone
  const inserttimeSheets = () => {
   
    const newContactWithCompany = insertTimeSheet;
    newContactWithCompany.project_id = id;

    if (insertTimeSheet.timesheet_title !== '')
    api.post('/projecttimesheet/insertTimeSheet', newContactWithCompany)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        console.log(insertedDataId);
        message('TimeSheet inserted successfully.', 'success');
        getTimeSheetById();
        setTimeout(() => {addContactToggless(false) }, 300);
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
      else {
        message('Please fill all required fields.', 'error');
      }
  };

 useEffect(() => {
    editJobById();
  }, [id]);

  //Structure of timeSheetById list view
  const Projecttimesheetcolumn = [
    {
      name: '#',
     
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
     
    },
    {
      name: 'Title',
     
    },
    {
      name: 'Staff',
     
    },
    {
      name: 'Date',
      
    },
    {
      name: 'Hours',
      
    },
    {
      name: 'Status',
      
    },
    {
      name: 'Description',
      
    },
  ];
  return (
    <Form>
    <Row>
    <Col md="3">
      <FormGroup>
        <Button color="primary" className="shadow-none" onClick={addContactToggless.bind(null)}>
          Add New{' '}
        </Button>
        <Modal size="xl" isOpen={addContactModalss} toggle={addContactToggless.bind(null)}>
          <ModalHeader toggle={addContactToggless.bind(null)}>New Task</ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                <Card>
                  <CardBody>
                    <Form>
                      <Row>
                      <Col md="4">
                          <FormGroup>
                            <Label>Title</Label>
                            <Input
                              type="text"
                              name="timesheet_title"
                              onChange={handleInputsTime}
                              value={insertTimeSheet && insertTimeSheet.timesheet_title}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                        <FormGroup>
              <Label>Staff</Label>
              <Input
                type="select"
                name="employee_id"
                onChange={(e) => {
                  handleInputsTime(e);
                }}>
                <option value="" selected >Please Select</option>
                {employeeTime &&
                  employeeTime.map((ele) => {
                    return (
                      ele.e_count === 0 && (<option key={ele.employee_id} value={ele.employee_id}>
                        {ele.first_name}
                      </option>)
                    );
                  })}
              </Input>                
            </FormGroup>
                        </Col>
                        <Col md="3">
                      <FormGroup>
                        <Label>Date</Label>
                        <Input
                          type="date"
                          onChange={handleInputsTime}
                          value={
                            insertTimeSheet && moment(insertTimeSheet.date).format('YYYY-MM-DD')} 
                          name="date"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Hours</Label>
                        <Input
                          type="number"
                          onChange={handleInputsTime}
                          value={insertTimeSheet && insertTimeSheet.normal_hours}
                          name="normal_hours"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input
                          type="select"
                          onChange={handleInputsTime}
                          value={insertTimeSheet && insertTimeSheet.status}
                          name="status"
                        >
                           <option defaultValue="selected">Please Select</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Started">Started</option></Input>
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Description</Label>
                        <Input
                          type="textarea"
                          onChange={handleInputsTime}
                          value={insertTimeSheet && insertTimeSheet.description}
                          name="description"
                        />
                      </FormGroup>
                    </Col>
               </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              className="shadow-none"
              color="primary"
              onClick={() => {
                inserttimeSheets();
                addContactModalss(false);
              }}
            >
              Submit
            </Button>
            <Button
              color="secondary"
              className="shadow-none"
              onClick={addContactToggless.bind(null)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </FormGroup>
    </Col>
  </Row>
        <Table id="example" className="display border border-secondary rounded">
          <thead>
            <tr>
              {Projecttimesheetcolumn.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {timeSheetById &&
              timeSheetById.map((element, index) => {
                return (
                  <tr key={element.projecttimesheet_id}>
                    <td>{index + 1}</td>
                    <td>
                    <Link to="">
                        <span
                          onClick={() => {
                            setContactDatass(element);
                            setEditTimeSheetEditModal(true);
                          }}
                        >
                        <Icon.Edit2 />
                        </span>
                      </Link>
                    </td>
                    <td>{element.timesheet_title}</td>
                    <td>{element.first_name}</td>
                  <td>{moment(element.date).format('YYYY-MM-DD')}</td>
                    <td>{element.normal_hours}</td>
                    <td>{element.status}</td>
                    <td>{element.description}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        </Form>
  );
};

