import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Chart from 'react-apexcharts';
import api from '../../constants/api';

const Dashboard = () => {
  const [projectStats, setProjectStats] = useState([]);
  const [projectStatsTitle, setProjectStatsTitle] = useState([]);

  // Get the project statistics for StatusCards
  const getStats = () => {
    api
      .get('stats/ProjectTitleCards')
      .then((res) => {
        setProjectStats(res.data.data);
      })
      .catch((error) => {
        console.log('Error fetching project statistics:', error);
      });
  };

  // Get the project statistics for ProjectTitle
  const getStatsTitle = () => {
    api
      .get('stats/ProjectTitleStats')
      .then((res) => {
        setProjectStatsTitle(res.data.data);
      })
      .catch((error) => {
        console.log('Error fetching project statistics:', error);
      });
  };

  useEffect(() => {
    getStats();
    getStatsTitle();
  }, []);

  const optionsDonut = {
    chart: {
      id: 'donut-chart',
      fontFamily: "'Rubik', sans-serif",
    },
    dataLabels: {
      enabled: true,
      formatter(val, opts) {
        const { seriesIndex } = opts;
        return projectStatsTitle[seriesIndex].task_title_count;
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70px',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              color: '#99abb4',
            },
          },
        },
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
      fontFamily: "'Montserrat', sans-serif",
    },
    tooltip: {
      fillSeriesColor: false,
      theme: 'dark',
    },
  };

  const seriesDonut = projectStatsTitle.map((stat) => stat.task_title_count);
  const labelsDonut = projectStatsTitle.map((stat) => stat.title);

  return (
    <Row>
      <Col md="12">
        <Card>
          <CardBody>
            <Row>
              <Col md="4">
              <h5>Overall Statistics</h5>
                <Chart
                  options={{ ...optionsDonut, labels: labelsDonut }}
                  series={seriesDonut}
                  type="donut"
                  height="360"
                />
              </Col>
              <Col md="6">
              <h5 className="status-heading">Status</h5>
                <Row>
                
                  {projectStats.map((project) => (
                    <Col sm="12" lg="3" key={project.id}>
                      <Card className="custom-card">
                        <CardBody>
                          <div className="d-flex align-items-center">
                            <div>
                              <h6 className="font-12 mb-3">In progress</h6>
                              <h4 className="mt-4 fw-bolder mb-0"> {project.in_progress_task_count}</h4>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                  
            {projectStats.map((project) => (
              <Col sm="12" lg="3" key={project.id}>
                <Card className="custom-card1">
                  <CardBody>
                    <div className="d-flex align-items-center">
                      <div>
                        <h6 className="font-12 mb-3">Completed</h6>
                        <h4 className="mt-4 fw-bolder mb-0"> {project.completed}</h4>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
            {projectStats.map((project) => (
              <Col sm="12" lg="3" key={project.id}>
                <Card className="custom-card2">
                  <CardBody>
                    <div className="d-flex align-items-center">
                      <div>
                        <h6 className="font-12 mb-3">On Hold</h6>
                        <h4 className="mt-4 fw-bolder mb-0"> {project.on_hold}</h4>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
            {projectStats.map((project) => (
              <Col sm="12" lg="3" key={project.id}>
                <Card className="custom-card3">
                  <CardBody>
                    <div className="d-flex align-items-center">
                      <div>
                        <h6 className="font-12 mb-2">Not Started</h6>
                        <h4 className="mt-2 fw-bolder mb-0"> {project.not_started_task}</h4>
                      </div>
                    </div>
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
  );
};

export default Dashboard;