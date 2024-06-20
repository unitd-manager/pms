import React, { useState, useEffect } from 'react';
import { Col, FormGroup, Label, Input, Row, Form, Button } from 'reactstrap';
import Chart from 'react-apexcharts';
import api from '../../../constants/api';
import ComponentCard from '../../ComponentCard';

export default function LeadStats() {
  const [taskTitles, setTaskTitles] = useState([]);
  const [actualHourData, setActualHourData] = useState([]);
  const [months] = useState([
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [showChart, setShowChart] = useState(false);

  const handleMonthChange = (e) => {
    const monthName = e.target.value;
    const monthIndex = months.indexOf(monthName);

    // Reset data states
    setTaskTitles([]);
    setActualHourData([]);
    setShowChart(false); // Hide chart on month change

    setSelectedMonth(monthName);
    setSelectedMonthIndex(monthIndex);
  };

  const HourData = () => {
    setIsLoading(true);
    setShowChart(false); // Hide chart while loading

    api.post('/stats/getEmployeeNameByComments', { month: months[selectedMonthIndex] })
      .then((response) => {
        setIsLoading(false);

        if (response.data && response.data.data && response.data.data.length > 0) {
          const hourData = response.data.data;

          const filteredData = hourData.filter((item) => {
            const dateObject = new Date(item.lead_date);
            return dateObject.getMonth() === selectedMonthIndex;
          });

          const titles = filteredData.map((item) => item.first_name);
          const actualHours = filteredData.map((item) => item.cold_call_count);

          setTaskTitles(titles);
          setActualHourData(actualHours);

          setShowChart(titles.length > 0 && actualHours.length > 0); // Show chart if there's data
        } else {
          setShowChart(false); // No data, don't show chart
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
        setShowChart(false); // Error, hide chart
      });
  };

  useEffect(() => {
    if (selectedMonthIndex !== -1) {
      HourData(); // Fetch data when month changes
    }
  }, [selectedMonth]);

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
      categories: taskTitles,
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Lead Count', // Adjusted to reflect data
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
          return `${val} `;
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
      name: 'Lead Count', // Adjusted to reflect data
      data: actualHourData,
    },
  ];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Lead Stats3">
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Select Month</Label>
                  <Input
                    type="select"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                  >
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={12} className="mt-3">
                <Button color="primary" onClick={HourData}>
                  {isLoading ? "Loading..." : "Go"}
                </Button>
              </Col>
            </Row>
          </Form>
          {showChart && ( // Show chart conditionally
            <Chart options={optionscolumn} series={seriescolumn} type="bar" height="280" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
}
