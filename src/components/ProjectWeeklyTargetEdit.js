import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  ModalBody,
  Modal,
  ModalHeader,
  ModalFooter,
  Form,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import message from './Message';
import api from '../constants/api';

const ProjectWeeklyTargetEdit = ({
  editWeeklyTargetModal,
  setEditWeeklyTargetModal,
  weeklyTargetEditData,
  id,
  getWeeklyTargetById,
}) => {
  ProjectWeeklyTargetEdit.propTypes = {
    editWeeklyTargetModal: PropTypes.bool,
    setEditWeeklyTargetModal: PropTypes.func,
    weeklyTargetEditData: PropTypes.object,
    id: PropTypes.any,
    getWeeklyTargetById: PropTypes.func,
  };

  const [targetEdit, setTargetEdit] = useState();
  const [employee, setEmployee] = useState([]);

  const handleInputs = (e) => {
    setTargetEdit({ ...targetEdit, [e.target.name]: e.target.value });
  };

  const editWeeklyTarget = () => {
    api
      .post('/weeklytarget/editWeeklyTarget', targetEdit)
      .then(() => {
        message('Record edited successfully', 'success');
        getWeeklyTargetById();
        setTimeout(() => {
          setEditWeeklyTargetModal(false);
        }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  const deleteWeeklyTarget = () => {
    if (!window.confirm('Delete this weekly target?')) return;
    api
      .post('/weeklytarget/deleteWeeklyTarget', { weekly_target_id: targetEdit.weekly_target_id })
      .then(() => {
        message('Deleted successfully', 'success');
        getWeeklyTargetById();
        setEditWeeklyTargetModal(false);
      })
      .catch(() => {
        message('Unable to delete record.', 'error');
      });
  };

  useEffect(() => {
    setTargetEdit(weeklyTargetEditData);
  }, [weeklyTargetEditData]);

  useEffect(() => {
    api
      .post('projecttask/getEmployeeByID', { project_id: id })
      .then((res) => {
        setEmployee(Array.isArray(res.data.data) ? res.data.data : []);
      })
      .catch(() => {
        setEmployee([]);
      });
  }, [id]);

  return (
    <Modal size="lg" isOpen={editWeeklyTargetModal}>
      <ModalHeader>
        Weekly Target Details
        <Button color="secondary" onClick={() => setEditWeeklyTargetModal(false)}>
          X
        </Button>
      </ModalHeader>

      <ModalBody>
        <Form>
          <Row>
            <Col md="4">
              <FormGroup>
                <Label>Staff</Label>
                <Input
                  type="select"
                  name="employee_id"
                  onChange={handleInputs}
                  value={targetEdit && targetEdit.employee_id}
                >
                  <option value="">Please Select</option>
                  {employee.map((member) => (
                      <option key={member.employee_id} value={member.employee_id}>
                        {member.first_name}
                      </option>
                    ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md="8">
              <FormGroup>
                <Label>Target</Label>
                <Input
                  type="text"
                  name="target_title"
                  onChange={handleInputs}
                  value={targetEdit && targetEdit.target_title}
                />
              </FormGroup>
            </Col>

            <Col md="6">
              <FormGroup>
                <Label>Week start</Label>
                <Input
                  type="date"
                  name="week_start_date"
                  onChange={handleInputs}
                  value={moment(targetEdit && targetEdit.week_start_date).format('YYYY-MM-DD')}
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>Week end</Label>
                <Input
                  type="date"
                  name="week_end_date"
                  onChange={handleInputs}
                  value={moment(targetEdit && targetEdit.week_end_date).format('YYYY-MM-DD')}
                />
              </FormGroup>
            </Col>

            <Col md="6">
              <FormGroup>
                <Label>DL (Due date)</Label>
                <Input
                  type="date"
                  name="due_date"
                  onChange={handleInputs}
                  value={moment(targetEdit && targetEdit.due_date).format('YYYY-MM-DD')}
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>EDL (Extended due date)</Label>
                <Input
                  type="date"
                  name="extended_due_date"
                  onChange={handleInputs}
                  value={moment(targetEdit && targetEdit.extended_due_date).format('YYYY-MM-DD')}
                />
              </FormGroup>
            </Col>

            <Col md="6">
              <FormGroup>
                <Label>Status</Label>
                <Input
                  type="select"
                  name="status"
                  onChange={handleInputs}
                  value={targetEdit && targetEdit.status}
                >
                  <option value="Pending">Pending</option>
                  <option value="InProgress">In progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Delayed">Delayed</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>Completion date</Label>
                <Input
                  type="date"
                  name="completion_date"
                  onChange={handleInputs}
                  value={
                    targetEdit && targetEdit.completion_date
                      ? moment(targetEdit.completion_date).format('YYYY-MM-DD')
                      : ''
                  }
                />
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup>
                <Label>Remarks</Label>
                <Input
                  type="textarea"
                  name="remarks"
                  onChange={handleInputs}
                  value={targetEdit && targetEdit.remarks}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <div className="pt-3 mt-3 d-flex align-items-center gap-2">
          <Button color="primary" onClick={editWeeklyTarget}>
            Submit
          </Button>
          <Button color="danger" onClick={deleteWeeklyTarget}>
            Delete
          </Button>
          <Button color="secondary" onClick={() => setEditWeeklyTargetModal(false)}>
            Cancel
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default ProjectWeeklyTargetEdit;