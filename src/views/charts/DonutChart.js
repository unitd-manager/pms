
/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import api from '../../constants/api';

const DonutChart = ({ data, onClick }) => {
  DonutChart.propTypes = {
    data: PropTypes.any,
    onClick: PropTypes.func,
    
    //onSuccess:PropTypes.any
  };
  return <Doughnut data={data} options={{ onClick }} />;
};

const SubcategoryChart = ({ data }) => {
  SubcategoryChart.propTypes = {
    data: PropTypes.any,
   
    //onSuccess:PropTypes.any
  };
  return <Doughnut data={data} />;
};

const MainChart = () => {
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [projectStatsTitle, setProjectStatsTitle] = useState([]);
  const navigate=useNavigate();
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

  const handleChartClick = (event, chartElements) => {
    if (chartElements.length > 0) {
      console.log('chartElements',chartElements[0])
      setSelectedSegment(chartElements[0]._index);
      const segmentindex = chartElements[0]._index;
      const id = projectStatsTitle[segmentindex].project_id;
       // Assuming you have routes like '/project/:projectId'
 navigate(`/ProjectEdit/${id}`);
    }
  };
  const customTooltip = (tooltipModel) => {
    if (tooltipModel.body) {
      const label = tooltipModel.mainChartData.labels[tooltipModel.dataIndex];
      const value = tooltipModel.mainChartData.datasets[0].data[tooltipModel.dataIndex];
      return `${label}: ${value}`;
    }
    return '';
  };
  const mainChartData = {
    labels: projectStatsTitle.map(item => item.title),
  
    datasets: [
      {data: projectStatsTitle.map(item => item.task_title_count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56','#56F488','#34AA21','#12AA34'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };
  const count=200;
  const options = {
    tooltips: {
      callbacks: {
        label: customTooltip,
      },
    },
    elements: {
      center: {
        text: count.toString(),
        color: '#000000', // Text color
        fontStyle: 'Arial', // Font style
        sidePadding: 20, // Padding around text
      },
    },
  };
  
  const subcategoryChartData = {
    '0': {
      labels: ['Subcategory 1A', 'Subcategory 1B', 'Subcategory 1C'],
      datasets: [
        {
          data: [100, 50, 200],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    },
    '1': {
      labels: ['Subcategory 2A', 'Subcategory 2B', 'Subcategory 2C'],
      datasets: [
        {
          data: [50, 150, 80],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    },
    '2': {
      labels: ['Subcategory 3A', 'Subcategory 3B', 'Subcategory 3C'],
      datasets: [
        {
          data: [80, 120, 50],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    },
  };
  useEffect(() => {
    
    getStatsTitle();
    
  }, []);
  return (
    <div>
      {/* {selectedSegment !== null ? (
        <SubcategoryChart data={subcategoryChartData[selectedSegment.toString()]} />
      ) : ( */}
        <DonutChart data={mainChartData} onClick={handleChartClick} options={options}/>
      {/* )} */}
    </div>
  );
};

export default MainChart;