/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, CardBody } from 'reactstrap';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import Level2Chart from '../../views/charts/Level2Chart';

const CategoryChart1 = ({ categoryId }) => {
  CategoryChart1.propTypes = {
    categoryId: PropTypes.any,
  };

  const [projectStatsEmployee, setProjectStatsEmployee] = useState([]);
  const navigate = useNavigate();

  // Fetch Employees for selected category
  const getStatsEmployeeTask = (categoryId) => {
    if (categoryId) {
      api
        .post('project/getProjectEmployees', { project_id: categoryId })
        .then((res) => {
          console.log("Fetched Employees in CategoryChart1:", res.data.data); // Debugging
          setProjectStatsEmployee(res.data.data);
        })
        .catch((error) => console.log('Error fetching employees:', error));
    }
  };

  // Handle employee click navigation
  const handleChartClick = (employeeId) => {
    if (employeeId) {
      navigate(`?project=${categoryId}&emp=${employeeId}`);
    }
  };

  // Fetch employees when categoryId changes
  useEffect(() => {
    console.log("Category ID changed:", categoryId); // Debugging
    if (categoryId) {
      getStatsEmployeeTask(categoryId);
    }
  }, [categoryId]);

  return (
    <>
      <Row>
        <Col md="12">
          <Card>
            <CardBody>
              <Row>
                <Col md="4">
                  <h5>Team-Tasks</h5>
                  <Level2Chart projectStatsTitle={projectStatsEmployee} handleChartClick={handleChartClick} />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Employee Card Section */}
      {projectStatsEmployee?.length > 0 && (
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <h5>Employees Working on Project</h5>
                <Row>
                  {projectStatsEmployee.map((employee) => (
                    <Col sm="4" key={employee.employee_id}>
                      <Card className="custom-card" onClick={() => handleChartClick(employee.employee_id)}>
                        <CardBody>
                          <h6 className="font-12 mb-0">{employee.first_name} {employee.last_name}</h6>
                          {employee.task_count && <p className="mb-0">Tasks: {employee.task_count}</p>}
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CategoryChart1;