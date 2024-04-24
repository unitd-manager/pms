/*eslint-disable*/
import { useMemo, useRef } from "react"
import * as d3 from "d3"
import styles from "./d3donutchart.module.css"

const MARGIN_X = 150
const MARGIN_Y = 50
const INFLEXION_PADDING = 20 // space between donut and label inflexion point

const colors = [
  "#063059",
  "#95c8e3",
  "#16a2f1",
  "#a6e3f8",
  "#aed8ee",
]
//greyish blue=#95c8e3
//thick blue=#063059
//sky blue=#16a2f1
// const data = [
//     { name: 'Apple', value: 10 },
//     { name: 'Blackberry', value: 20 },
//     { name: 'Disney', value: 10 },
//   ];
 const D3DonutChart = ({ width, height,data,onClick }) => {
  const ref = useRef(null)
console.log('data',data);
  const radius = Math.min(width - 2 * MARGIN_X, height - 2 * MARGIN_Y) / 2
  const innerRadius = radius / 2
  const totalValues = data.reduce((acc, curr) => acc + curr.task_title_count, 0);
  const pie = useMemo(() => {
    const pieGenerator = d3.pie().value(d => d.task_title_count)
    return pieGenerator(data)
  }, [data])

//   const arcGenerator = d3.arc()
  const arcGenerator = d3.arc()
  .padAngle(0.015)
  .cornerRadius(7); // Set the desired gap angle between slices


  const shapes = pie.map((grp, i) => {
    // First arc is for the donut
    const sliceInfo = {
      innerRadius,
      outerRadius: radius,
      startAngle: grp.startAngle,
      endAngle: grp.endAngle
    }
    const centroid = arcGenerator.centroid(sliceInfo)
    const slicePath = arcGenerator(sliceInfo)

    // Second arc is for the legend inflexion point
    const inflexionInfo = {
      innerRadius: radius + INFLEXION_PADDING,
      outerRadius: radius + INFLEXION_PADDING,
      startAngle: grp.startAngle,
      endAngle: grp.endAngle
    }
    const inflexionPoint = arcGenerator.centroid(inflexionInfo)

    const isRightLabel = inflexionPoint[0] > 0
    const labelPosX = inflexionPoint[0] + 50 * (isRightLabel ? 1 : -1)
    const textAnchor = isRightLabel ? "start" : "end"
    const label = grp.data.title 
    // + " (" + grp.value + ")"

     // Calculate the position for the text
     const textArc = d3.arc();
   const textPos = textArc.centroid(grp);
   const angle = Math.atan2(centroid[1], centroid[0]);
   const x = Math.cos(angle) * radius;
   const y = Math.sin(angle) * radius;
    return (
      <g
        key={i}
        className={styles.slice}
        onMouseEnter={() => {
          if (ref.current) {
            ref.current.classList.add(styles.hasHighlight)
          }
        }}
        onMouseLeave={() => {
          if (ref.current) {
            ref.current.classList.remove(styles.hasHighlight)
          }
        }}
      >
        <path d={slicePath} fill={colors[i]} onClick={ () => {
        onClick(grp.data.project_id)
      }} />
        <text
          x={centroid[0]}
          y={centroid[1]}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="20"
          color="black"
        >
          {grp.data.task_title_count}
        </text>
        {/* <circle cx={centroid[0]} cy={centroid[1]} r={2} /> */}
        <line
          x1={x}
          y1={y}
          x2={inflexionPoint[0]}
          y2={inflexionPoint[1]}
          stroke={"lightgrey"}
          fill={"lightgrey"}
          stroke-width={'3'}
        />
        <line
          x1={inflexionPoint[0]}
          y1={inflexionPoint[1]}
          x2={labelPosX}
          y2={inflexionPoint[1]}
          stroke={"lightgrey"}
          fill={"lightgrey"}
          stroke-width={'3'}
        />
        <text
          x={labelPosX + (isRightLabel ? 2 : -2)}
          y={inflexionPoint[1]}
          textAnchor={textAnchor}
          dominantBaseline="middle"
          fontSize={18}
          fontWeight={800}
        >
          {label}
        </text>
      </g>
    )
  })

  return (
    <div>
      
    <svg width={width} height={height} style={{ display: "inline-block" }}>
      <g
        transform={`translate(${width / 2}, ${height / 2})`}
        className={styles.container}
        ref={ref}
      >
        {shapes}
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="20"
          fontWeight='bold'
          dy={'-0.5em'}
        >Total
        </text>
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="18"
          fontWeight='bold'
          dy={'0.5em'}
        >{totalValues}
        </text>
      </g>
    </svg>
    </div>
  )
}

export default D3DonutChart;