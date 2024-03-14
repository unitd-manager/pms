import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
//import ComponentCard from '../ComponentCard';

export default function LeadMainDetails({ handleInputs, lead, allCountries, projectdetails,sourceLinked }) {
  LeadMainDetails.propTypes = {
    handleInputs: PropTypes.func,
    sourceLinked:PropTypes.any,
    allCountries: PropTypes.any,
    lead: PropTypes.any,
    projectdetails: PropTypes.any,
  };

  return (
    
      <Form>
        <Row>
          <Col md="3">
            <FormGroup>
              <Label>Lead Name</Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={lead && lead.lead_title}
                name="lead_title"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Date</Label>
              <Input
                type="date"
                onChange={handleInputs}
                value={lead && moment(lead.lead_date).format('YYYY-MM-DD')}
                name="lead_date"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Sales Person</Label>
              <Input
                type="select"
                onChange={handleInputs}
                value={lead && lead.employee_id}
                name="employee_id"
              >
                <option defaultValue="selected">Please Select</option>
                {projectdetails &&
                  projectdetails.map((e) => {
                    return (
                      <option key={e.employee_id} value={e.employee_id}>
                        {e.first_name}
                      </option>
                    );
                  })}
              </Input>
            </FormGroup>
          </Col>

          <Col md="3">
            <FormGroup>
              <Label>Phone</Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={lead && lead.phone_number}
                name="phone_number"
              />
            </FormGroup>
          </Col>

          <Col md="3">
            <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                Email
              </Label>
              <Input type="text" onChange={handleInputs} value={lead && lead.email} name="email" />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Address </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={lead && lead.address}
                name="address"
              />
            </FormGroup>
          </Col>

          <Col md="3">
            <FormGroup>
              {' '}
              <Label>Country</Label>
              <Input
                type="select"
                name="country"
                onChange={handleInputs}
                value={lead && lead.country}
              >
                <option defaultValue="selected" value="">
                  Please Select
                </option>
                {allCountries &&
                  allCountries.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Postal Code</Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={lead && lead.postal_code}
                name="postal_code"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Source of Lead</Label>
              <Input
                type="select"
                onChange={handleInputs}
                value={lead && lead.source_of_lead}
                name="source_of_lead"
              >
              <option defaultValue="selected" value="">
                  Please Select
                </option>
                {sourceLinked &&
                  sourceLinked.map((source) => (
                    <option key={source.valuelist_id} value={source.value}>
                      {source.value}
                    </option>
                    ))}
                  </Input>
            </FormGroup>
          </Col>

          <Col md="3">
            <FormGroup>
              <Label>Service of Interest</Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={lead && lead.service_of_interest}
                name="service_of_interest"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Budget</Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={lead && lead.budget}
                name="budget"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Status</Label>
              <Input
                type="select"
                onChange={handleInputs}
                value={lead && lead.lead_status}
                name="lead_status"
              >
                <option>Please Select</option>
                <option>In Progress</option>
                <option>On Hold</option>
                <option>Pending Approval</option>
                <option>Completed</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Priority</Label>
              <Input
                type="select"
                onChange={handleInputs}
                value={lead && lead.priority}
                name="priority"
              >
                <option>Please Select</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md="4">
              <FormGroup>
                
                <Label>Cold Call</Label>
                <br></br>
                <Input
                  name="cold_call"
                  value="1"
                  type="radio"
                  defaultChecked={lead && lead.cold_call === 1 && true}
                  onChange={handleInputs}
                />
                <Label> Yes </Label>
                <Input
                  name="cold_call"
                  value="0"
                  type="radio"
                  defaultChecked={lead && lead.cold_call === 0 && true}
                  onChange={handleInputs}
                />
                <Label>No</Label>
                
              </FormGroup>
              </Col>
          <Col md="3">
            <FormGroup>
              <Label>Interaction Type</Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={lead && lead.interaction_type}
                name="interaction_type"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Follow up Date</Label>
              <Input
                type="date"
                onChange={handleInputs}
                value={lead && lead.followup_date}
                name="followup_date"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Profile Link</Label>
              <Input
                type="textarea"
                onChange={handleInputs}
                value={lead && lead.notes}
                name="notes"
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    
  );
}
