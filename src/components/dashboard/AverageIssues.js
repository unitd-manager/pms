import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api';

const AverageIssues = () => {
  //const [taskTitles, setTaskTitles] = useState([]);
  const [actualHourData, setActualHourData] = useState([]);
  const [estimatedHourData, setEstimatedHourData] = useState([]);
  const [employees, setEmployees] = useState([]);


  const HourData = (selectedEmployeeId) => {
    // Make API call to retrieve the data
    api
    .post('/stats/getActualAveragestats', { employee_id: selectedEmployeeId })
    .then((response) => { 
      // Check if the response data is not empty
      if (response.data && response.data.data && response.data.data.length > 0) {
        
      // Assuming the response data is an array of objects with keys: task_title, total_actual_hours, and estimated_hours
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const hourData = response.data.data;
        //const titles = hourData.map((item) => item.task_title);
        const actualHours = hourData.map((item) => monthNames[item.month - 1]); 
        const estimatedHours = hourData.map((item) => item.num_issues);

       // setTaskTitles(titles);
       setActualHourData(actualHours);
        setEstimatedHourData(estimatedHours);
      } else {
        // If the response data is empty, reset the state to show an empty chart or display a message
        //setTaskTitles([]);
        setActualHourData([]);
        setEstimatedHourData([]);
      }
    })
  };

  useEffect(() => {
    api.get('/jobinformation/getEmployee')
      .then((res) => {
        setEmployees(res.data.data);
      })
      .catch((error) => {
        console.log('Error fetching employees:', error);
      });
  }, []);

  const optionscolumn = {
    colors: ['#745af2', '#263238'],
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
      categories: actualHourData,  
        labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Issues',
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
          return `${val} issues`;
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
  

  const seriescolumn = [
    {
      name: 'Issues',
      data: estimatedHourData
    },
  ];
  


  return (
    <Col md="6">
      <FormGroup>
              <Label for="employeeSelect">Select Employee</Label>
              <Input
                type="select"
                name="employee_id"
                onChange={(e) => {
                  const selectedEmployeeId = e.target.value;
                  HourData(selectedEmployeeId);
                }}
              >
                <option value="">Select Employee</option>
                {employees &&
                  employees.map((element) => (
                    <option key={element.employee_id} value={element.employee_id}>
                      {element.first_name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
            
      <ComponentCard title="Column Chart">
        <Chart options={optionscolumn} series={seriescolumn} type="bar" height="280" />
      </ComponentCard>
    </Col>
  );
};

export default AverageIssues;