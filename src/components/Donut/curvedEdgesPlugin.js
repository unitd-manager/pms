const curvedEdgesPlugin = {
    id: 'curvedEdgesPlugin',
    afterUpdate: (chart) => {
      if (chart.config.type !== 'doughnut') {
        return;
      }
  console.log('chartdataset',chart.getDatasetMeta(0))
      const { ctx } = chart;
      //const { startAngle, endAngle } = chart.data.datasets[0].metaData[0].model;
      //const { startAngle, endAngle } = chart.getDatasetMeta(0).data[0].model;
      const radius = chart.innerRadius + (chart.radius - chart.innerRadius) / 2;
      const startAngle=-0.5 * Math.PI
      const endAngle=1.5 * Math.PI
      ctx.save();
      ctx.translate(chart.width / 2, chart.height / 2);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 1;
  
      for (let i = startAngle; i < endAngle; i += 0.01) {
        const x1 = Math.cos(i) * radius;
        const y1 = Math.sin(i) * radius;
        const x2 = Math.cos(i + 0.01) * radius;
        const y2 = Math.sin(i + 0.01) * radius;
  
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
  
      ctx.restore();
    },
  };
  
  export default curvedEdgesPlugin;
  