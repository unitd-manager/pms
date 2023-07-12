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
import message from '../../components/Message';
import api from '../../constants/api';

export default function ProjectTeam({
  addContactToggleTeam,
  addContactModalTeam,
  setEditTeamEditModal,
  id,
  teamById,
  setContactDataTeam,
  getTeamById
}) {
  ProjectTeam.propTypes = {
    addContactToggleTeam: PropTypes.func,
    setEditTeamEditModal: PropTypes.func,
    addContactModalTeam: PropTypes.bool,
    id:PropTypes.any,
    teamById:PropTypes.any,
    setContactDataTeam:PropTypes.func,
    getTeamById:PropTypes.func,

  };
  const [insertTeam, setInsertTeam] = useState({
   employee_id:''
  });

   const[employeeTeam,setEmployeeTeam] = useState()

    // Gettind data from Job By Id
  const editJobByIdTeams = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        console.log(res.data.data);
        setEmployeeTeam(res.data.data);
      })
      .catch(() => {});
  };
// data in Details
  const handleInputsTime = (e) => {
    setInsertTeam({ ...insertTeam, [e.target.name]: e.target.value });
  };
//Insert 
  const insertTeamMember = () => {
    const newContactWithCompany = insertTeam;
    newContactWithCompany.project_id = id;
    api.post('/projectteam/insertTeam', newContactWithCompany)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        console.log(insertedDataId);
        message('Team inserted successfully.', 'success');
        getTeamById();
        setTimeout(() => {addContactToggleTeam(false)}, 300);
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
      
  };

 useEffect(() => {
    editJobByIdTeams();
  }, [id]);

  //Structure of teamById list view
  const ProjectTeamColumn = [
    {
      name: '#',
     
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
     
    },
    {
      name: 'Name',
     
    },
    {
      name: 'Designation',
     
    },
    {
      name: 'Department',
      
    },
  ];
  return (
    <Form>
    <Row>
    <Col md="3">
      <FormGroup>
        <Button color="primary" className="shadow-none" onClick={addContactToggleTeam.bind(null)}>
          Add New{' '}
        </Button>
        <Modal size="xl" isOpen={addContactModalTeam} toggle={addContactToggleTeam.bind(null)}>
          <ModalHeader toggle={addContactToggleTeam.bind(null)}>New Task</ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                <Card>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col md="4">
                        <FormGroup>
              <Label>Name</Label>
              <Input
                type="select"
                name="employee_id"
                onChange={(e) => {
                  handleInputsTime(e);
                }}>
                <option value="" selected >Please Select</option>
                {employeeTeam &&
                  employeeTeam.map((ele) => {
                    return (
                       (<option key={ele.employee_id} value={ele.employee_id}>
                        {ele.first_name}
                      </option>)
                    );
                  })}
              </Input>                
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
                insertTeamMember();
                addContactModalTeam(false);
              }}
            >
              Submit
            </Button>
            <Button
              color="secondary"
              className="shadow-none"
              onClick={addContactToggleTeam.bind(null)}
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
              {ProjectTeamColumn.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {teamById &&
              teamById.map((element, index) => {
                return (
                  <tr key={element.project_team_id}>
                    <td>{index + 1}</td>
                    <td>
                    <Link to="">
                        <span
                          onClick={() => {
                            setContactDataTeam(element);
                            setEditTeamEditModal(true);
                          }}
                        >
                        <Icon.Edit2 />
                        </span>
                      </Link>
                    </td>
                    <td>{element.first_name}</td>
                    <td>{element.department}</td>
                    <td>{element.designation}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        </Form>
  );
};

