/*eslint-disable*/
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

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
    tooltip: {
      enabled: false,
    },
  },
  elements: {
    line: {
      borderWidth: 1,
      borderColor: 'gray',
    },
  },
};

const DonutChartWithLeaderLines = () => {
  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Doughnut
        data={data}
        options={options}
        plugins={[
          {
            beforeDraw: (chart) => {
              const ctx = chart.ctx;
              const dataset = chart.data.datasets[0];
              const meta = chart.getDatasetMeta(0);

              meta.data.forEach((element, index) => {
                const model = element._model;
                const total = dataset.data.reduce((acc, val) => acc + val, 0);
                const midAngle = model.startAngle + (model.endAngle - model.startAngle) / 2;
                const x = model.outerRadius * Math.cos(midAngle);
                const y = model.outerRadius * Math.sin(midAngle);

                ctx.textAlign = x >= 0 ? 'left' : 'right';
                ctx.fillStyle = '#000';
                ctx.font = '14px Arial';
                const percent = Math.round((dataset.data[index] / total) * 100);
                ctx.fillText(`${dataset.data[index]} (${percent}%)`, model.x + x, model.y + y);
              });
            },
          },
        ]}
      />
    </div>
  );
};

export default DonutChartWithLeaderLines;
