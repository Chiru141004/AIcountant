import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LineCharts({ data, dataKey1, dataKey2, label1, label2, color1, color2 }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="month" stroke="#64748b" />
        <YAxis stroke="#64748b" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey={dataKey1}
          stroke={color1}
          strokeWidth={2}
          dot={{ fill: color1, r: 4 }}
          activeDot={{ r: 6 }}
          name={label1}
        />
        {dataKey2 && (
          <Line
            type="monotone"
            dataKey={dataKey2}
            stroke={color2}
            strokeWidth={2}
            dot={{ fill: color2, r: 4 }}
            activeDot={{ r: 6 }}
            name={label2}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
