/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Card, CardBody } from 'reactstrap';
import api from '../../constants/api';
import MainChart from '../../views/charts/DonutChart';

const DonutDashboard = () => {
  const [projectStats, setProjectStats] = useState([]);
  const [projectStatsTitle, setProjectStatsTitle] = useState([]);
  const [projectStatsEmployee, setProjectStatsEmployee] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const projectId = searchParams.get('project');

  // Fetch project statistics
  const getStats = () => {
    api
      .get('project/getProjectGeneralCardt')
      .then((res) => {
        console.log("Project Stats:", res.data.data); // Debugging
        setProjectStats(res.data.data);
      })
      .catch((error) => console.log('Error fetching project statistics:', error));
  };

  // Fetch project titles for donut chart
  const getStatsTitle = () => {
    api
      .get('project/getProjectDonut')
      .then((res) => {
        console.log("Project Donut Data:", res.data.data); // Debugging
        setProjectStatsTitle(res.data.data);
      })
      .catch((error) => console.log('Error fetching project donut data:', error));
  };

  // Fetch employees working on selected project
  const getStatsEmployeeTask = (projectId) => {
    if (projectId) {
      api
        .post('project/getProjectEmployees', { project_id: projectId })
        .then((res) => {
          console.log("Employee Data:", res.data.data); // Debugging
          setProjectStatsEmployee(res.data.data);
        })
        .catch((error) => console.log('Error fetching employee statistics:', error));
    }
  };

  // Handle donut chart click (navigates & updates employees)
  const handleChartClick = (projectId) => {
    if (projectId) {
      navigate(`?project=${projectId}`);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    getStats();
    getStatsTitle();
  }, []);

  // Fetch employee stats when projectId changes
  useEffect(() => {
    console.log("Project ID changed:", projectId); // Debugging
    if (projectId) {
      getStatsEmployeeTask(projectId);
    }
  }, [projectId]);

  const optionsDonut = {
    chart: {
      id: 'donut-chart',
      fontFamily: "'Rubik', sans-serif",
      events: {
        click: (event, chartContext, opts) => {
          const { seriesIndex } = opts;
          const selectedProjectId = projectStatsTitle[seriesIndex]?.project_id;
          if (selectedProjectId) {
            navigate(`?project=${selectedProjectId}`);
          }
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter(val, opts) {
        const { seriesIndex } = opts;
        return projectStatsTitle[seriesIndex]?.task_title_count || 0;
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70px',
          labels: {
            show: true,
            total: { show: true, label: 'Total', color: '#99abb4' },
          },
        },
      },
    },
    legend: { show: true, position: 'bottom' },
    tooltip: { fillSeriesColor: false, theme: 'dark' },
  };

  const seriesDonut = projectStatsTitle.map((stat) => stat.task_title_count);
  const labelsDonut = projectStatsTitle.map((stat) => stat.title);

  return (
    <>
      <Row>
        <Col md="12">
          <Card>
            <CardBody>
              <Row>
                <Col md="4">
                  <h5>Project Stats</h5>
                  <MainChart projectStatsTitle={projectStatsTitle} handleChartClick={handleChartClick} />
                </Col>
                <Col md="6">
                  <h5 className="status-heading">Status</h5>
                  <Row>
                    {projectStats.map((project) => (
                      <Col sm="6" lg="2" key={project.id}>
                        <Card className="custom-card">
                          <CardBody>
                            <h6 className="font-12 mb-0">{project.project_type}</h6>
                            <h4 className="mt-1 fw-bolder mb-0">{project.project_count}</h4>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Employees Working on Project */}
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

export default DonutDashboard;