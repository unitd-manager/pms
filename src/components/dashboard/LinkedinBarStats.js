import React, { useEffect, useState } from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';
import message from '../Message';
import api from '../../constants/api';


  export default function LinkedInRequestStats() {
  const [linkedinid, setLinkedInId] = useState({project_id: 'null'});
  const [staffdropdown, setStaffDropdown] = useState([]);
  const [selectedstaffid, setSelectedStaffId] = useState('');
  const currentMonth = new Date().getMonth() + 1;
console.log('Current Month:', currentMonth);
const [selectedmonth, setSelectedMonth] = useState(currentMonth.toString());
  const [RequestedData, setRequestedData] = useState([]);

  const getSalesLinkedinId = () => {
    api.get('/stats/getSalesLinkedinId')
      .then((res) => {
        const firstLinkedInId = res.data.data[0]?.project_id || null;
        setLinkedInId({ project_id: firstLinkedInId });
        console.log('setLinkedInId', firstLinkedInId);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };

  const getStaffDropdown = (projectId) => {
    api.post('stats/getSalesStaffName', { project_id: projectId })
      .then((res) => {
        setStaffDropdown(res.data.data);
        console.log('setStaffDropdown', res.data.data);
      })
      .catch(() => {
        message('Error fetching sales staff names', 'error');
      });
  };

  
  useEffect(() => {
    getSalesLinkedinId();
  }, []);

  useEffect(() => {
    if (linkedinid.project_id) {
      getStaffDropdown(linkedinid.project_id);
    }
  }, [linkedinid]);

  
  useEffect(() => {
    // Fetch order details based on the selected company
    if (selectedstaffid && selectedmonth && linkedinid.project_id) {
      api.post('/stats/getRequestedData', {employee_id: selectedstaffid,
        month: selectedmonth,
        project_id: linkedinid.project_id
      })
        .then((response) => {
          setRequestedData(response.data.data);
          console.log('data:', response.data.data)
        })
        .catch((error) => {
          console.log('Error fetching order data:', error);
        });
    } else {
      // Reset order data when no company is selected
      setRequestedData([]);
    }
  }, [selectedstaffid, selectedmonth, linkedinid.project_id]);
  const getRequestedCountForStaff = (day) => {
    const countForDay = RequestedData
      .filter((entry) => entry.date && new Date(entry.date).getDate() === day )
      .reduce((total, entry) => total + (parseInt(entry.description, 10) || 0), 0);
  
    return countForDay;
  };

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const optionsColumn = {
    xaxis: {
      categories: daysInMonth.map((day) => {
        const date = new Date(`2024-01-${day}`).toLocaleDateString('en-US', { day: 'numeric' });
        return date;
      }),
      title: {
        text: 'Days in Month',
      },
    },
    yaxis: {
      title: {
        text: 'Number of Requests',
      },
    },
  };

  const seriesColumn = [
    {
      name: 'No of Request',
      data: daysInMonth.map((day) => getRequestedCountForStaff(day)),
    },
  ];

  
  
  console.log('optionsColumn:', optionsColumn);
  
  console.log('seriesColumn:', seriesColumn);

  return (
    <>
    <ComponentCard title="Linkedin Requsted Details">
      <Row>
        <Col md="6">
        <FormGroup>
        <Label for="Select Month">Month</Label>
        <Input
                type="select"
                value={selectedmonth}
                name="month"
                onChange={(e) => {
                  const selectedMonthValue = e.target.value;
                  setSelectedMonth(selectedMonthValue);
                }}
              >
              <option value="">Select Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </Input>
            </FormGroup>
            </Col>
      <Col md="6">
        <FormGroup>
        <Label for="Select Staff">Staff</Label>
        <Input
          type="select"
          name="employee_id"
          onChange={(e) => {
            const selectedproduct = e.target.value;
            setSelectedStaffId(selectedproduct);
          }}
        >
          <option value="">Select Staff</option>
          {staffdropdown &&
            staffdropdown.map((element) => (
              <option key={element.employee_id} value={element.employee_id}>
                {element.first_name}
              </option>
            ))}
        </Input>
        </FormGroup>
        </Col>
            </Row>

   
      <ComponentCard title="Column Chart">
        <Chart options={optionsColumn} series={seriesColumn} type="bar" height="280" />
      </ComponentCard>
    
    </ComponentCard>
    </>
  );
};
