import React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface PieChartComponentProps {
  data: number[];
  colors: string[];
  innRadius: number;
  width: number;
  height: number;
  cX: number;
  cY: number;
}

export type CustomizedLabelProps = {
  cx: any;
  cy: any;
  midAngle: any;
  innerRadius: any;
  outerRadius: any;
  value: any;
  index?: any;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  index,
}: CustomizedLabelProps): JSX.Element => {
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
      style={{ fontSize: "0.875rem", fontWeight: "bold", fontFamily: "Outfit" }}
    >
      {`${value}%`}
    </text>
  );
};

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data,
  colors,
  innRadius,
  width,
  height,
  cX,
  cY,
}) => {
  const formattedData = data.map((value, index) => ({
    name: `Group ${index + 1}`,
    value: value,
  }));
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={formattedData}
        cx={cX}
        cy={cY}
        labelLine={false}
        label={renderCustomizedLabel}
        innerRadius={innRadius}
        outerRadius={87}
        fill="#8884d8"
        dataKey="value"
        paddingAngle={0}
        cornerRadius={6}
      >
        {formattedData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default PieChartComponent;
