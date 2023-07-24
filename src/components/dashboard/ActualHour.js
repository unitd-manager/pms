import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api';


const ActualHour = () => {
    const [actualHour, setActualHour] = useState([]);
    const [employeeHour, setEmployeeHour] = useState([]);


     // Get the list of employees from the API
  const getActual = (employeeId) => {
    api.post('/stats/getActualHours', { employee_id: employeeId })
      .then((res) => {
        setActualHour(res.data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    api.get('jobinformation/getEmployee')
      .then((res) => {
        setEmployeeHour(res.data.data);
      })
      .catch((error) => {
        console.log('Error fetching employees:', error);
      });
  }, []);


const optionscolumn = {
    colors: ['#745af2', '#263238', '#4fc3f7'],
    chart: {
      fontFamily: "'Rubik', sans-serif",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: actualHour,
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    yaxis: {
      title: {
        text: '$ (thousands)',
        color: '#8898aa',
      },
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter(val) {
          return `$ ${val} thousands`;
        },
      },
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
    },
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
      fontFamily: "'Montserrat', sans-serif",
      labels: {
        colors: '#8898aa',
      },
    },
  };

  let seriescolumn = [
    {
      name: 'Actual Hours',
      data: [], // Updated dynamically below
    },
    {
      name: 'Estimated Hours',
      data: [], // Updated dynamically below
    },
  ];

  useEffect(() => {
    // Calculate seriescolumn data when actualHour updates
    if (actualHour.length > 0) {
      const actualData = actualHour.map((item) => item.actual_hours);
      const estimatedData = actualHour.map((item) => item.estimated_hours);
      seriescolumn = [
        {
          name: 'Actual Hours',
          data: actualData,
        },
        {
          name: 'Estimated Hours',
          data: estimatedData,
        },
      ];
    }
  }, [actualHour]);

  return (
    <div>
              <BreadCrumbs />
              <Row>
      <Col md="6">
        <ComponentCard title="Employee Name">
          <Form>
            <FormGroup>
              <Label for="employeeSelect">Select Employee</Label>
              <Input
                type="select"
                name="employee_id"
                onChange={(e) => {
                  const selectedEmployeeId = e.target.value;
                 
                  getActual(selectedEmployeeId);
                }}
              >
                <option value="">Select Employee</option>
                {employeeHour &&
                  employeeHour.map((element) => (
                    <option key={element.employee_id} value={element.employee_id}>
                      {element.first_name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
            </Form>
            </ComponentCard>
            </Col>
            </Row>

        <Col md="6">
          <ComponentCard title="Column Chart">
            <Chart options={optionscolumn} series={seriescolumn} type="bar" height="280" />
          </ComponentCard>
        </Col>
</div>
  )
}

export default ActualHour;
