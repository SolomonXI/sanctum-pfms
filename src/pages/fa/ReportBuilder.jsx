import React, { useState } from 'react';
import Chart from '../../components/Chart';
import StatCard from '../../components/StatCard';

const ReportBuilder = () => {
  const [activeTab, setActiveTab] = useState('Quarterly');
  const [activeChart, setActiveChart] = useState('Line');

  const chartData = [
    { name: 'Jan', value: 1.1 },
    { name: 'Feb', value: 1.15 },
    { name: 'Mar', value: 1.12 },
    { name: 'Apr', value: 1.18 },
    { name: 'May', value: 1.24 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
      {/* Banner */}
      <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Current Client</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '18px', fontWeight: '700' }}>SARAH JENKINS</span>
            <span style={{ backgroundColor: 'color-mix(in srgb, var(--gold) 18%, transparent)', color: 'var(--gold)', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>HNW</span>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '13px', borderLeft: '1px solid var(--border)', paddingLeft: '24px' }}>
            Last Meeting: 12 May 2026
          </div>
        </div>
        <button style={{ backgroundColor: 'var(--teal)', color: 'var(--bg-primary)', padding: '10px 24px', borderRadius: '24px', fontWeight: '600' }}>
          Export & Share
        </button>
      </div>

      <div style={{ display: 'flex', gap: '24px', flex: 1 }}>
        {/* Left config */}
        <div style={{ width: '260px', backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>Data Sources</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Transaction History</span>
            <div style={{ backgroundColor: 'color-mix(in srgb, var(--teal) 18%, transparent)', color: 'var(--teal)', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>ON</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Graphs & Charts</span>
            <div style={{ backgroundColor: 'color-mix(in srgb, var(--teal) 18%, transparent)', color: 'var(--teal)', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>ON</div>
          </div>

          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>Chart Type</div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
            {['Line', 'Pie', 'Bar'].map(t => (
              <button 
                key={t}
                onClick={() => setActiveChart(t)}
                style={{ flex: 1, padding: '8px', borderRadius: '8px', backgroundColor: activeChart === t ? 'var(--teal)' : 'var(--bg-card-lt)', color: activeChart === t ? 'var(--bg-primary)' : 'var(--text-secondary)', fontSize: '12px', fontWeight: '600' }}
              >
                {t}
              </button>
            ))}
          </div>

          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>Date Range</div>
          <input type="text" value="01 Jan 2026 - 13 May 2026" readOnly style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-card-lt)', border: '1px solid var(--border)', color: 'white', marginBottom: '32px' }} />

          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>Template</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Quarterly', 'Annual', 'Custom'].map(t => (
              <button 
                key={t}
                onClick={() => setActiveTab(t)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: activeTab === t ? 'color-mix(in srgb, var(--teal) 15%, transparent)' : 'transparent', color: activeTab === t ? 'var(--teal)' : 'var(--text-secondary)', border: activeTab === t ? '1px solid var(--teal)' : '1px solid var(--border)', fontSize: '13px', fontWeight: '600', textAlign: 'left' }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Right Preview */}
        <div style={{ flex: 1, backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Portfolio Performance</h2>
          <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '32px' }}>01 Jan 2026 to 13 May 2026</div>
          
          <div style={{ marginBottom: '40px', flex: 1 }}>
            <Chart type={activeChart.toLowerCase()} data={chartData} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            <StatCard label="Start Value" value="£1.1M" color="var(--blue)" />
            <StatCard label="End Value" value="£1.24M" color="var(--blue)" />
            <StatCard label="Growth" value="+£140k" color="var(--green)" />
            <StatCard label="Return" value="+12.7%" color="var(--green)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;
