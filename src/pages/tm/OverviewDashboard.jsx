import React from 'react';
import Chart from '../../components/Chart';
import StatCard from '../../components/StatCard';

const OverviewDashboard = () => {
  const pieData = [
    { name: 'Excellent', value: 420, color: 'var(--teal)' },
    { name: 'Good', value: 280, color: 'var(--blue)' },
    { name: 'Average', value: 110, color: 'var(--gold)' },
    { name: 'Below Average', value: 37, color: 'var(--orange)' }
  ];

  return (
    <div style={{ display: 'flex', gap: '24px', height: '100%' }}>
      {/* Left: Chart */}
      <div style={{ width: '380px', backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '32px' }}>Total Reviews</h2>
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Chart type="pie" data={pieData} />
          <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '24px', fontWeight: '700' }}>847</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>reviews</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '32px' }}>
          {pieData.map(d => (
            <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: d.color }}></div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{d.name}</div>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>{d.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Stats */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <StatCard label="Avg Team KPI" value="87.4%" delta="+2.1% this month" color="var(--teal)" icon="↑" />
        <StatCard label="Total Unresolved Issues" value="4" delta="2 high priority" color="var(--red)" icon="⚠" />
        <StatCard label="Total Reviews" value="847" delta="Last 30 days" color="var(--blue)" icon="★" />
      </div>
    </div>
  );
};

export default OverviewDashboard;
