
/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import api from '../../constants/api';
//import D3DonutChart from '../../components/D3Donut/D3Donut';
import D3DonutCategory from '../../components/D3Donut/D3DonutCategory';

const DonutChart = ({ data, onClick }) => {
  DonutChart.propTypes = {
    data: PropTypes.any,
    onClick: PropTypes.func,
   
    //onSuccess:PropTypes.any
  };
  return <Doughnut data={data} options={{ onClick }} width={10} height={20} />;
};



const Level2Chart = ({projectStatsTitle,handleChartClick}) => {
  Level2Chart.propTypes = {
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
   labels: projectStatsTitle.map(item => item.first_name.split(" ")[0]),
  
    datasets: [
      {data: projectStatsTitle.map(item => item.task_count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56','#56F488','#34AA21','#12AA34','#F16384', '#C6A2EB', '#BFCE56','#A6F418','#114421','#BBAA34',,'#F16E84', '#C619EB', '#BFB356','#A64F18','#11CC21','#BB1134'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };
  const count=20;
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
  
  const filteredData = projectStatsTitle.filter(d => d.task_count > 0);
  useEffect(() => {
    
    
  }, []);
  return (
    <div>

        <D3DonutCategory data={filteredData} onClick={handleChartClick} width={600} height={600}/>
    </div>
  );
};

export default Level2Chart;