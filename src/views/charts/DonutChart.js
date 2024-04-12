
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
  return <Doughnut data={data} options={{ onClick }} width={10} height={20} redraw={true}/>;
};



const MainChart = ({projectStatsTitle,handleChartClick}) => {
  MainChart.propTypes = {
    projectStatsTitle: PropTypes.any,
    handleChartClick: PropTypes.func,
   
    //onSuccess:PropTypes.any
  };
  // useEffect(()=>{
  //   // Get the current URL
  //   const url = new URL(window.location.href);
    
  //   console.log('url',url)
  //   // Get the value of the 'categoryid' parameter
  //   const categoryId = url.searchParams.get('category');
  //   const hash = window.location.hash;

  //   console.log('categoryId',categoryId)
  //   console.log('hash',hash)
  //   // Extract the categoryid parameter from the hash
  //   const categoryIdParam = new URLSearchParams(hash.substring(1)).get('category');
  //   const categoryIds = hash.split('=')[1];
  //   setCategoryId(categoryIds)
  //   console.log('categoryIds',categoryIds)
  // console.log('categoryId',categoryIdParam)
  // },[categoryId])
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
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56','#56F488','#34AA21','#12AA34','#F16384', '#C6A2EB', '#BFCE56','#A6F418','#114421','#BBAA34'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        cutoutPercentage: 90, // Change the percentage to adjust the width of the circle
        borderWidth: 1,
      },
    ],
  };
  const count=200;
  const options = {
    legend: {
      display: true,
      position: 'bottom',
    },
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
  
  
  useEffect(() => {
    
    
  }, []);
  return (
    <div>
      
        <DonutChart data={mainChartData} onClick={handleChartClick} options={options}/>
    
    </div>
  );
};

export default MainChart;