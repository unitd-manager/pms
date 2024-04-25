const outsideLabelsPlugin = {
    id: 'outsideLabelsPlugin',
    afterUpdate: (chart) => {
      if (chart.config.type !== 'doughnut') {
        return;
      }
  console.log('chart',chart);
      const { ctx } = chart;
      //const { startAngle, endAngle } = chart.data.datasets[0].metaData[0].model;
      const radius = chart.innerRadius + (chart.radius - chart.innerRadius) / 2;
      const startAngle=-0.5 * Math.PI
      const endAngle=1.5 * Math.PI
      for (let i = 0; i < chart.data.labels.length; i++) {
        const angle = (startAngle + endAngle) / 2;
        const x = chart.width / 2 + Math.cos(angle) * radius * 1.1;
        const y = chart.height / 2 + Math.sin(angle) * radius * 1.1;
  
        ctx.save();
        ctx.translate(x, y);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';
        ctx.fillText(chart.data.labels[i], 0, 0);
  
        const x1 = Math.cos(angle) * radius;
        const y1 = Math.sin(angle) * radius;
        const x2 = Math.cos(angle) * radius * 1.05;
        const y2 = Math.sin(angle) * radius * 1.05;
  
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
  
        ctx.restore();
      }
    },
  };
  
  export default outsideLabelsPlugin;
  