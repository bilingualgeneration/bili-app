import React from "react";
import { PieChart, Pie, Cell } from "recharts";


interface PieChartComponentProps {
    data: number[];
    colors: string[];
    innRadius: number;
    width: number;
    height: number;
  }

export type CustomizedLabelProps = {
    cx: any;
    cy: any;
    midAngle: any;
    innerRadius: any;
    outerRadius: any;
    percent: any;
    index?: any;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}:CustomizedLabelProps): JSX.Element => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'Outfit' }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartComponent: React.FC<PieChartComponentProps> = ({data, colors, innRadius, width, height }) =>  {
    const formattedData = data.map((value, index) => ({
        name: `Group ${index + 1}`,
        value: value
      }));
    return (
    <PieChart width={width} height={height}>
      <Pie
        data={formattedData}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        innerRadius={innRadius}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        paddingAngle={0}
        cornerRadius={6}
      >
        {formattedData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={colors[index % colors.length]}
          />
        ))}
      </Pie>
    </PieChart>
  );
};

export default PieChartComponent;