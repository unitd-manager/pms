import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import outsideLabelsPlugin from './outsideLabelsPlugin';
//import curvedEdgesPlugin from './curvedEdgesPlugin';

const data = {
  labels: ['A', 'B', 'C', 'D'],
  datasets: [
    {
      data: [12, 19, 3, 5],
      backgroundColor: ['red', 'blue', 'green', 'yellow'],
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

const DonutChartWithOutsideLabels = () => {
  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Doughnut data={data} options={options} plugins={[outsideLabelsPlugin]} />
    </div>
  );
};

export default DonutChartWithOutsideLabels;
