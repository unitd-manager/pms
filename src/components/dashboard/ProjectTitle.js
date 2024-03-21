import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import api from '../../constants/api';
import ComponentCard from '../ComponentCard';

const ProjectTitle = () => {
  const [projectStats, setProjectStats] = useState([]);

  // Get the project statistics
  const getStats = () => {
    api.get('stats/ProjectTitleStats')
      .then((res) => {
        setProjectStats(res.data.data);
      })
      .catch((error) => {
        console.log('Error fetching project statistics:', error);
      });
  };

  useEffect(() => {
    getStats(); 
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
        return projectStats[seriesIndex].task_title_count;
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

  const seriesDonut = projectStats.map((stat) => stat.task_title_count);
  const labelsDonut = projectStats.map((stat) => stat.title);

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Overall Project Statistics">
          {projectStats.length > 0 && (
            <Chart options={{ ...optionsDonut, labels: labelsDonut }} series={seriesDonut} type="donut" height="360" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default ProjectTitle;
