
/*eslint-disable*/
import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';

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

  const handleChartClick = (event, chartElements) => {
    if (chartElements.length > 0) {
      setSelectedSegment(chartElements[0]._index);
    }
  };

  const mainChartData = {
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
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

  return (
    <div>
      {selectedSegment !== null ? (
        <SubcategoryChart data={subcategoryChartData[selectedSegment.toString()]} />
      ) : (
        <DonutChart data={mainChartData} onClick={handleChartClick} />
      )}
    </div>
  );
};

export default MainChart;