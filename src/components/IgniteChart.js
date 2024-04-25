/*eslint-disable*/
import React, { useState } from 'react';
import { IgrItemLegendModule, IgrDoughnutChartModule, IgrDoughnutChart, IgrRingSeries  } from 'igniteui-react-charts';
import PropTypes from 'prop-types';
import './Ignite.css';


const mods = [
  IgrItemLegendModule,
  IgrDoughnutChartModule
];
mods.forEach((m) => m.register());

IgrDoughnutChartModule.register();
const data = [
  { id: 1, category: "Category 1", value: 10 },
  { id: 2, category: "Category 2", value: 20 },
  { id: 3, category: "Category 3", value: 30 },
  { id: 4, category: "Category 4", value: 10 },
  { id: 5, category: "Category 5", value: 20 },
  { id: 6, category: "Category 6", value: 30 }
];


const IgniteChart = () => {
 const [selectedSegmentId,setSelectedSegmentId]=useState(null);

  const handleSliceClick = (e,element) => {
    console.log('element',element)
    const segmentId = element.dataContext.id;
    // console.log('segmentId',segmentId)
    setSelectedSegmentId(segmentId);
    console.log('segmentId',segmentId)
  };

  const tooltipTemplate = (context) => {
    return (
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Title</div>
        <div style={{ fontSize: '16px' }}>Subtitle</div>
      </div>
    );
  };

  
  const labelsOutsideEnd = {
    position: 'OutsideEnd',
    leaderLineVisibility: 'Visible',
    leaderLineType: 'Arc', // Use 'Arc' for curved lines
    horizontalAlignment: 'Right',
    verticalAlignment: 'Middle',
  };

  return (
    <div className="chart-container">
  
      <IgrDoughnutChart
        dataSource={data}
        allowSliceExplosion
        height='400px'
        width='100%'
        innerExtent={0.5} // Set the inner extent to create a gap
        outerExtent={0.9}
        sliceClick={handleSliceClick}
        labelExtent={30}
        tooltipTemplate={tooltipTemplate}
        labels={labelsOutsideEnd}
      >
       
        <IgrRingSeries
          name="series"
          labelMemberPath="category"
          valueMemberPath="value"
          dataSource={data}
          labelsPosition="OutsideEnd"
          radiusFactor={0.9}
          startAngle={0}
          onSliceClick={handleSliceClick}
          labelFormat={labelsOutsideEnd}
        >
        </IgrRingSeries>
        
      </IgrDoughnutChart>
      <div style={{ position: 'absolute', top: '45%', left: '59%', transform: 'translate(-50%, -50%)' }}>
        <h4>Center Text</h4>
      
      </div>
    </div>
  );
};

export default IgniteChart;
