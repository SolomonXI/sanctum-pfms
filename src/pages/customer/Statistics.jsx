import React from 'react';
import Chart from '../../components/Chart';
import StatCard from '../../components/StatCard';

const Statistics = () => {
  const pieData = [
    { name: 'Housing', value: 4500, color: 'var(--teal)' },
    { name: 'Food', value: 3000, color: 'var(--blue)' },
    { name: 'Transport', value: 2000, color: 'var(--gold)' },
    { name: 'Entertainment', value: 1500, color: 'var(--magenta)' },
    { name: 'Other', value: 1430, color: 'var(--text-secondary)' }
  ];

  const lineData = [
    { name: 'Jan', value: 21000 },
    { name: 'Feb', value: 22500 },
    { name: 'Mar', value: 21800 },
    { name: 'Apr', value: 23400 },
    { name: 'May', value: 24830 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1, backgroundColor: 'var(--bg-card)', padding: '24px', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>Spending by Category</h3>
          <Chart type="pie" data={pieData} />
        </div>
        <div style={{ flex: 1, backgroundColor: 'var(--bg-card)', padding: '24px', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>Balance Over Time</h3>
          <Chart type="line" data={lineData} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
        <StatCard label="Total Spent" value="£4,200" delta="-8% vs last month" color="var(--red)" />
        <StatCard label="Total Income" value="£5,800" delta="+2% vs last month" color="var(--green)" />
        <StatCard label="Savings Rate" value="28%" delta="+3% vs last month" color="var(--blue)" />
        <StatCard label="Largest Expense" value="Rent" delta="£1,800" color="var(--teal)" />
      </div>
    </div>
  );
};

export default Statistics;
