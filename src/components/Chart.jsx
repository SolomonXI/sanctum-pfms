import React from 'react';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from 'recharts';

const Chart = ({ type, data, color = 'var(--teal)' }) => {
  if (type === 'pie') {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || color} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card-lt)', border: 'none', borderRadius: '8px', color: 'var(--text-primary)' }} itemStyle={{color: 'var(--text-primary)'}}/>
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card-lt)', border: 'none', borderRadius: '8px', color: 'var(--text-primary)' }} cursor={{fill: 'var(--bg-card)'}} />
          <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // line chart
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card-lt)', border: 'none', borderRadius: '8px', color: 'var(--text-primary)' }} />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={{ r: 4, fill: color }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
