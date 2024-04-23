/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, CardBody } from 'reactstrap';
import api from '../../constants/api';
import PropTypes from 'prop-types';
import MainChart from '../../views/charts/DonutChart';


const SubCategoryChart = ({categoryId,subCategoryId,setCategoryId,setSubCategoryId}) => {
    SubCategoryChart.propTypes = {
        categoryId: PropTypes.any,
        setCategoryId: PropTypes.func,
        subCategoryId: PropTypes.any,
        setSubCategoryId: PropTypes.func,
        
        //onSuccess:PropTypes.any
      };
  const [projectStats, setProjectStats] = useState([]);
  const [projectStatsTitle, setProjectStatsTitle] = useState([]);
  const [projectStatsEmployee, setProjectStatsEmployee] = useState([]);
  const navigate=useNavigate();
  const [selectedSegment, setSelectedSegment] = useState(null);
  

    
  console.log('category',categoryId);
  console.log('setcategory',setCategoryId);
  console.log('subCategory',subCategoryId);
  console.log('setSubcategory',setSubCategoryId);
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

  // Get the project statistics for ProjectTitle
  const getStatsEmployeeTask = () => {
    api
      .get('stats/ProjectEmployeeStats')
      .then((res) => {
        setProjectStatsEmployee(res.data.data);
      })
      .catch((error) => {
        console.log('Error fetching project statistics:', error);
      });
  };
  const handleChartClick = (event, chartElements) => {
    if (chartElements.length > 0) {
      console.log('chartElements',chartElements[0])
      setSelectedSegment(chartElements[0]._index);
      const segmentindex = chartElements[0]._index;
      const id = projectStatsTitle[segmentindex].project_id;
       // Assuming you have routes like '/project/:projectId'
 navigate(`?category=${id}`);

    }
  };
  useEffect(() => {
    getStats();
    getStatsTitle();
    getStatsEmployeeTask();
  }, []);

  const optionsDonut = {
    chart: {
      id: 'donut-chart',
      fontFamily: "'Rubik', sans-serif",
      events: {
        click:(event, chartContext, opts)=> {
          console.log('event',event);
          console.log('chartContext',chartContext);
          console.log('opts',opts);
          // config.seriesIndex gives the index of the clicked segment
          const { seriesIndex } = opts;
 // Access the project ID associated with the clicked segment
 const projectId = projectStatsTitle[seriesIndex].project_id;

 // Assuming you have routes like '/project/:projectId'
 navigate(`/ProjectEdit/${projectId}`);
        
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter(val, opts) {
        console.log('opts',opts);
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

  const optionsDonut1 = {
    chart: {
      id: 'donut-chart',
      fontFamily: "'Rubik', sans-serif",
    },
    dataLabels: {
      enabled: true,
      formatter(val, opts) {
        const { seriesIndex } = opts;

        return projectStatsEmployee[seriesIndex].task_count;
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

  const seriesDonut1 = projectStatsEmployee.map((stat) => stat.task_count);
  const labelsDonut1 = projectStatsEmployee.map((stat) => stat.first_name);
  return (
    <>
      <Row>
        <Col md="12">
          <Card>
            <CardBody>
              <Row>
                <Col md="4">
                  <h5>Sub category Statistics</h5>
                  {/* <Chart
                    options={{ ...optionsDonut, labels: labelsDonut }}
                    series={seriesDonut}
                    type="donut"
                    height="360"
                  /> */}
                  <MainChart projectStatsTitle={projectStatsTitle} handleChartClick={handleChartClick}/>
                </Col>
                <Col md="6">
                  <h5 className="status-heading">Status</h5>
                  <Row>
                    {projectStats.map((project) => (
                      <Col sm="6" lg="2" key={project.id}>
                        <Card className="custom-card">
                          <CardBody>
                            <div className="d-flex align-items-center">
                              <div>
                                <h6 className="font-12 mb-0">In Progress</h6>
                                <h4 className="mt-1 fw-bolder mb-0">
                                  {' '}
                                  {project.in_progress_task_count}
                                </h4>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}

                    {projectStats.map((project) => (
                      <Col sm="6" lg="2" key={project.id}>
                        <Card className="custom-card1">
                          <CardBody>
                            <div className="d-flex align-items-center">
                              <div>
                                <h6 className="font-12 mb-0">Completed</h6>
                                <h4 className="mt-1 fw-bolder mb-0"> {project.completed}</h4>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                    {projectStats.map((project) => (
                      <Col sm="6" lg="2" key={project.id}>
                        <Card className="custom-card2">
                          <CardBody>
                            <div className="d-flex align-items-center">
                              <div>
                                <h6 className="font-12 mb-0">On Hold</h6>
                                <h4 className="mt-1 fw-bolder mb-0"> {project.on_hold}</h4>
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
                                <h6 className="font-12 mb-0">Not Started</h6>
                                <h4 className="mt-1 fw-bolder mb-0"> {project.not_started_task}</h4>
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

      {/* <Row>
        <Col md="12">
          <Card>
            <CardBody>
              <Row>
                <Col md="4">
                  <h5>Overall Employee Statistics</h5>
                  {/* <Chart
                    options={{ ...optionsDonut1, labels: labelsDonut1 }}
                    series={seriesDonut1}
                    type="donut"
                    height="360"
                  /> */}
                  {/* <MainChart/>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row> */} 
    </>
  );
};

export default SubCategoryChart;
