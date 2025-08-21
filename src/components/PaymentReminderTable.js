import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Label, FormGroup, Row, Col, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
//import PropTypes from 'prop-types';
import { getPaymentReminders, addPaymentReminder, updatePaymentReminder, deletePaymentReminder } from '../api/paymentReminderApi';
import LottieComponent from './LottieComponent';

const PaymentReminderTable = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReminder, setNewReminder] = useState({
 
    domain_link: '',
    product: '',
    first_alert: false,
    second_alert: false,
    disconnect_site: false,
    db_name: '',
    server_name: '',
    alert_type: '',
    cron_run: false,
  });
  const [editingId, setEditingId] = useState(null);



  const fetchReminders = async () => {
    try {
      const response = await getPaymentReminders();
      if (Array.isArray(response.data)) {
        setReminders(response.data);
      } else if (response.data && Array.isArray(response.data.reminders)) {
        setReminders(response.data.reminders);
      } else if (response.data && Array.isArray(response.data.data)) {
        setReminders(response.data.data);
      } else {
        console.error('API response is not an array:', response.data);
        setReminders([]); // Set to empty array to prevent further errors
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payment reminders:', error);
      setLoading(false);
    }
  };

    useEffect(() => {
    fetchReminders();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewReminder((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddReminder = async () => {
    try {
      await addPaymentReminder({
        ...newReminder,
        creation_date: new Date().toISOString(),
        modification_date: new Date().toISOString(),
        created_by: 'Admin',
        modified_by: 'Admin',
      });
      setNewReminder({
       
        domain_link: '',
        product: '',
        first_alert: false,
        second_alert: false,
        disconnect_site: false,
        db_name: '',
        server_name: '',
        alert_type: '',
        cron_run: false,
      });
      fetchReminders();
    } catch (error) {
      console.error('Error adding payment reminder:', error);
    }
  };

  const handleEditClick = (reminder) => {
    setEditingId(reminder.payment_reminder_id);
    setNewReminder({
      
      domain_link: reminder.domain_link,
      product: reminder.product,
      first_alert: reminder.first_alert,
      second_alert: reminder.second_alert,
      disconnect_site: reminder.disconnect_site,
      db_name: reminder.db_name,
      server_name: reminder.server_name,
      alert_type: reminder.alert_type,
      cron_run: reminder.cron_run,
    });
  };

  const handleUpdateReminder = async () => {
    try {
      await updatePaymentReminder(editingId, {
        ...newReminder,
        modification_date: new Date().toISOString(),
        modified_by: 'Admin',
      });
      setEditingId(null);
      setNewReminder({
       
        domain_link: '',
        product: '',
        first_alert: false,
        second_alert: false,
        disconnect_site: false,
        db_name: '',
        server_name: '',
        alert_type: '',
        cron_run: false,
      });
      fetchReminders();
    } catch (error) {
      console.error('Error updating payment reminder:', error);
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      await deletePaymentReminder(id);
      fetchReminders();
    } catch (error) {
      console.error('Error deleting payment reminder:', error);
    }
  };

  return (
    <div>
      <Card>
        <CardBody>
          <Row className="mb-2 title_border">
            <Col>
              <CardTitle tag="h5">Payment Reminder</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                Manage your payment reminders
              </CardSubtitle>
            </Col>
            <Col className='d-flex' style={{ justifyContent: 'flex-end' }} xl={3} sm={12}>
              <Button color="primary" onClick={editingId ? handleUpdateReminder : handleAddReminder}>
                {editingId ? 'Update' : 'Add'}
              </Button>
            </Col>
          </Row>
          <Row className="mb-3">
         
            <Col md={4}>
              <FormGroup>
                <Label for="domain_link">Domain Link</Label>
                <Input type="text" name="domain_link" id="domain_link" value={newReminder.domain_link} onChange={handleInputChange} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="product">Product</Label>
                <Input type="text" name="product" id="product" value={newReminder.product} onChange={handleInputChange} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="db_name">DB Name</Label>
                <Input type="text" name="db_name" id="db_name" value={newReminder.db_name} onChange={handleInputChange} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="server_name">Server Name</Label>
                <Input type="text" name="server_name" id="server_name" value={newReminder.server_name} onChange={handleInputChange} />
              </FormGroup>
            </Col>
             
            <Col md={4}>
              <FormGroup>
                <Label for="alert_type">Alert Type</Label>
                <Input type="select" name="alert_type" id="alert_type" value={newReminder.alert_type} onChange={handleInputChange}>
                  <option value="">Select Alert Type</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Annually">Annually</option>
                </Input>
              </FormGroup>
            </Col>
              <Col md={4}>
              <FormGroup>
                <Label for="company_id"></Label>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" name="first_alert" checked={newReminder.first_alert} onChange={handleInputChange} />{' '}
                  First Alert
                </Label>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" name="second_alert" checked={newReminder.second_alert} onChange={handleInputChange} />{' '}
                  Second Alert
                </Label>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" name="disconnect_site" checked={newReminder.disconnect_site} onChange={handleInputChange} />{' '}
                  Disconnect Site
                </Label>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" name="cron_run" checked={newReminder.cron_run} onChange={handleInputChange} />{' '}
                  Cron Run
                </Label>
              </FormGroup>
            </Col>
          </Row>
          {loading ? <LottieComponent /> : (
            <Table className="no-wrap mt-3 align-middle example" striped responsive borderless>
              <thead>
                <tr>
                  <th>Domain Link</th>
                  <th>Product, Server, DB Name</th>
                  <th>Alert Type</th>
                  <th>First Alert</th>
                  <th>Second Alert</th>
                  <th>Disconnect Site</th>
                  <th>Cron Run</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reminders.map((reminder) => (
                  <tr key={reminder.payment_reminder_id}>
                    <td>{reminder.domain_link}</td>
                    <td>{`${reminder.product}, ${reminder.server_name}, ${reminder.db_name}`}</td>
                    <td>{reminder.alert_type}</td>
                    <td>{reminder.first_alert ? 'Yes' : 'No'}</td>
                    <td>{reminder.second_alert ? 'Yes' : 'No'}</td>
                    <td>{reminder.disconnect_site ? 'Yes' : 'No'}</td>
                    <td>{reminder.cron_run ? 'Yes' : 'No'}</td>
                    <td>
                      <Button color="info" size="sm" className="me-2" onClick={() => handleEditClick(reminder)}>
                        Edit
                      </Button>
                      <Button color="danger" size="sm" onClick={() => handleDeleteReminder(reminder.payment_reminder_id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

PaymentReminderTable.propTypes = {
  // No specific props for this component yet, but good practice to include propTypes
};

export default PaymentReminderTable;