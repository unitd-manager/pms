import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Label, Input, Row } from 'reactstrap';
import Chart from 'react-apexcharts';
//import { Link } from 'react-router-dom';
import moment from 'moment';
import ComponentCard from '../../ComponentCard';
import api from '../../../constants/api';

const LeadCallStats = () => {
  const [coldCallCountsData, setColdCallCountsData] = useState([]);
  const [leadTitles, setLeadTitles] = useState([]);
  const [projects, setProjects] = useState([]);
  //const [LeadID, setLeadId] = useState(null);
  const [months] = useState([
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]);
  const [selectedMonth, setSelectedMonth] = useState(''); // Ensure this is the correct value
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');

  const fetchLeadData = (employeeId, month) => {
    api
      .post('/lead/getLeadId', { employee_id: employeeId, month })
      .then((response) => {
        const leadData = response.data?.data || [];

        if (month) {
          const monthIndex = months.indexOf(month);
          const filteredData = leadData.filter(
            (lead) => moment(lead.lead_date).month() === monthIndex
          );

          const coldCallCounts = filteredData.map((item) => ({
            leadId: item.lead_id,
            leadTitle: item.lead_title,
            coldCallCount: item.cold_call_count,
          }));

          // const firstLeadId = filteredData.length > 0 ? filteredData[0].lead_id : null;
          // setLeadId(firstLeadId);
          const groupedColdCallCounts = coldCallCounts.reduce((accumulator, currentValue) => {
            accumulator[currentValue.leadTitle] =
              (accumulator[currentValue.leadTitle] || 0) + currentValue.coldCallCount;
            return accumulator;
          }, {});

          setColdCallCountsData(Object.values(groupedColdCallCounts));
          setLeadTitles(Object.keys(groupedColdCallCounts));
        } else {
          setColdCallCountsData([]);
          setLeadTitles([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

   useEffect(() => {
    api
      .get('lead/getEmployeeName')
      .then((res) => {
        setProjects(res.data.data);
      })
      .catch((error) => {
        console.log('Error fetching projects:', error);
      });
  }, []);

  // Effect to fetch data when selectedMonth or selectedEmployeeId changes
  useEffect(() => {
    if (selectedEmployeeId && selectedMonth) {
      fetchLeadData(selectedEmployeeId, selectedMonth);
    }
  }, [selectedMonth, selectedEmployeeId]); // Runs when these states change

  const handleMonthChange = (e) => {
    const newSelectedMonth = e.target.value;
    setSelectedMonth(newSelectedMonth); // Update state
  };

  const handleEmployeeChange = (e) => {
    const newSelectedEmployeeId = e.target.value;
    setSelectedEmployeeId(newSelectedEmployeeId); // Update state
  };

  const options = {
    colors: ['#745af2'],
    chart: {
      fontFamily: "'Rubik', sans-serif",
      type: 'bar',
    },
   // Ensure that the dataPointSelection event retrieves the correct data and navigates to the right page
plotOptions: {
  bar: {
    events: {
      dataPointSelection: (event, chartContext, config) => {
        const selectedLeadTitle = leadTitles[config.dataPointIndex];
        const selectedLead = coldCallCountsData.find(
          (item) => item.leadTitle === selectedLeadTitle
        );

        if (selectedLead) {
          // Check for leadId and ensure it's valid before redirecting
          const { leadId } = selectedLead;
          if (leadId) {
            // Redirect to the correct LeadEdit page
            window.location.href = `/LeadEdit/${leadId}`;
          } else {
            console.error('Lead ID not found for the selected title:', selectedLeadTitle);
          }
        }
      },
    },
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
      categories: leadTitles,
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Cold Call Count',
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
          return val;
        },
      },
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
    },
    legend: {
      show: false,
    },
  };

  const series = [
    {
      name: 'Cold Call Count',
      data: coldCallCountsData,
    },
  ];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Lead call per sales person Statistics">
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Select Month</Label>
                <Input
                  type="select"
                  value={selectedMonth}
                  onChange={handleMonthChange} // Call the handler
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Select Employee</Label>
                <Input
                  type="select"
                  value={selectedEmployeeId} // Ensure it reflects current state
                  onChange={handleEmployeeChange} // Call the handler
                >
                  <option value="">Select Employee</option>
                  {projects.map((element) => (
                    <option key={element.employee_id} value={element.employee_id}>
                      {element.first_name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
         
            <Chart options={options} series={series} type="bar" height="300" />
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default LeadCallStats;
