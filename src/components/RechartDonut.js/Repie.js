/*eslint-disable*/
// import React from "react";
// import { PieChart, Pie, Tooltip } from "recharts";
 
// const Repie = () => {
//     // Sample data
//     const data = [
//         { name: "Geeksforgeeks", students: 400 },
//         { name: "Technical scripter", students: 700 },
//         { name: "Geek-i-knack", students: 200 },
//         { name: "Geek-o-mania", students: 1000 },
//     ];
 
//     return (
//         <div
//             style={{
//                 textAlign: "center",
//                 margin: "auto 10%",
//             }}
//         >
//             <h1 style={{ color: "green" }}>
//                 GeeksforGeeks
//             </h1>
//             <h3>
//                 React JS example for donut chart using
//                 Recharts
//             </h3>
//             <PieChart width={700} height={700}>
//                 <Tooltip />
//                 <Pie
//                     data={data}
//                     dataKey="students"
//                     outerRadius={250}
//                     innerRadius={150}
//                     fill="blue"
//                     label={({ name, students }) =>
//                         `${name}: ${students}`
//                     }
//                 />
//             </PieChart>
//         </div>
//     );
// };
 
// export default Repie;


import React from 'react';
import PropTypes from 'prop-types'
import { PieChart, Pie,Cell, Label, LabelList,Sector,ReferenceLine  } from 'recharts';

const data = [
  { name: 'Apple', value: 12 },
  { name: 'Blackberry', value: 19 },
  { name: 'Cisco', value: 3 },
  { name: 'Disney', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const CustomLabel = ({ viewBox }) => {
//     CustomLabel.propTypes = {
//         viewBox: PropTypes.any,
//         //onSuccess:PropTypes.any
//       };
//   const { cx, cy } = viewBox;

//   return (
//     <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fill="#333">
//       Center Text
//     </text>
//   );
// };
const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
    const radius = outerRadius + 30;
    const x1 = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y1 = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
    const x2 = cx + (outerRadius + 30) * Math.cos(-midAngle * (Math.PI / 180));
    const y2 = cy + (outerRadius + 30) * Math.sin(-midAngle * (Math.PI / 180));
    const textAnchor = x2 > cx ? 'start' : 'end';
  
    return (
      <>
        <Sector
          cx={200}
          cy={200}
          innerRadius={outerRadius + 15}
          outerRadius={outerRadius + 25}
          startAngle={-midAngle}
          endAngle={-midAngle}
          fill="#8884d8"
          cornerRadius={30}
          forceCornerRadius
          
        />
        <path d={`M${x1},${y1}L${x2},${y2}`} stroke="#333" />
        <text x={x2} y={y2} textAnchor={textAnchor} fill="#333" dominantBaseline="central">
          {/* {data[index].name} */}
          text
        </text>
      </>
    );
  };
  
  
  const handleSliceClick = (data, index) => {
    console.log('name',data[index].name);
  };

const Repie = () => {
  return (
    <div style={{ width: '700', height: '700',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="200"
          cy="200"
          innerRadius="35%"
          outerRadius="80%"
          paddingAngle={3}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          label={({ name, value }) =>
                                   `${name}: ${value}`
                              }
        shapeRendering={(props) => {
            const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
            const cornerRadius = 100; // adjust the corner radius as needed
          
            const startRadius = innerRadius;
            const endRadius = outerRadius;
          
            const sx1 = cx + startRadius * Math.cos(-startAngle * (Math.PI / 180));
            const sy1 = cy + startRadius * Math.sin(-startAngle * (Math.PI / 180));
            const sx2 = cx + endRadius * Math.cos(-startAngle * (Math.PI / 180));
            const sy2 = cy + endRadius * Math.sin(-startAngle * (Math.PI / 180));
          
            const ex1 = cx + startRadius * Math.cos(-endAngle * (Math.PI / 180));
            const ey1 = cy + startRadius * Math.sin(-endAngle * (Math.PI / 180));
            const ex2 = cx + endRadius * Math.cos(-endAngle * (Math.PI / 180));
            const ey2 = cy + endRadius * Math.sin(-endAngle * (Math.PI / 180));
          
            const cornerRadiusAngle = Math.atan(cornerRadius / (outerRadius - innerRadius)) * (180 / Math.PI);
            const controlRadius = (outerRadius - innerRadius) / Math.cos(cornerRadiusAngle * (Math.PI / 180));
            const controlAngle = (endAngle + startAngle) / 2 + 90;
          
            const cx1 = cx + controlRadius * Math.cos(-controlAngle * (Math.PI / 180));
            const cy1 = cy + controlRadius * Math.sin(-controlAngle * (Math.PI / 180));
          
            const path = `
              M${sx1},${sy1}
              A${startRadius},${startRadius} 0 0,1 ${sx2},${sy2}
              L${ex2},${ey2}
              A${endRadius},${endRadius} 0 0,1 ${ex1},${ey1}
              L${sx1},${sy1}
              Z
            `;
          
            return <path d={path} fill={fill} />;
          
                              }}
        onClick={handleSliceClick}
        >
            {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        <Label value="Label" position="center" />
       
          {/* {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))} */}
           {/* {data.map((entry, index) => (
          <Label
            key={`label-${index}`}
            value={`${entry.name} (${entry.value})`}
            position="outside"
            fill="#0088FE"
            style={{ fontSize: '12px' }}
            offset={10}
          />
        ))} */}
          {/* <LabelList dataKey="name" content={renderCustomizedLabel} /> */}
          <Label content={<CustomLabel />} />
        </Pie>
      </PieChart>
    </div>
  );
};

export default Repie;
