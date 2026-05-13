import React, { useState } from 'react';
import Chart from '../../components/Chart';
import StatCard from '../../components/StatCard';

const templateConfig = {
  Quarterly: {
    label: '01 Jan 2026 – 13 May 2026',
    dateRange: 'Q1–Q2 2026',
    startVal: '£1.1M', endVal: '£1.24M', growth: '+£140k', ret: '+12.7%',
    data: [
      { name: 'Jan', value: 1.1 }, { name: 'Feb', value: 1.15 },
      { name: 'Mar', value: 1.12 }, { name: 'Apr', value: 1.18 }, { name: 'May', value: 1.24 }
    ]
  },
  Annual: {
    label: '01 Jan 2025 – 31 Dec 2025',
    dateRange: 'Full Year 2025',
    startVal: '£0.9M', endVal: '£1.1M', growth: '+£200k', ret: '+22.2%',
    data: [
      { name: 'Q1', value: 0.9 }, { name: 'Q2', value: 0.95 },
      { name: 'Q3', value: 1.02 }, { name: 'Q4', value: 1.1 }
    ]
  },
  Custom: {
    label: '01 Mar 2026 – 13 May 2026',
    dateRange: 'Mar–May 2026',
    startVal: '£1.12M', endVal: '£1.24M', growth: '+£120k', ret: '+10.7%',
    data: [
      { name: 'Mar', value: 1.12 }, { name: 'Apr', value: 1.18 }, { name: 'May', value: 1.24 }
    ]
  }
};

const ReportBuilder = () => {
  const [activeTab, setActiveTab] = useState('Quarterly');
  const [activeChart, setActiveChart] = useState('Line');
  const [exported, setExported] = useState(false);

  const config = templateConfig[activeTab];

  const handleExport = () => {
    setExported(true);
    // Simulate export by generating a simple text blob
    const content = `SANCTUM — Portfolio Report\nClient: Sarah Jenkins (HNW)\nPeriod: ${config.dateRange}\nStart: ${config.startVal} | End: ${config.endVal} | Growth: ${config.growth} | Return: ${config.ret}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sanctum_Report_${activeTab}_2026.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setExported(false), 2000);
  };

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
            Period: {config.dateRange}
          </div>
        </div>
        <button
          onClick={handleExport}
          style={{
            backgroundColor: exported ? 'var(--green)' : 'var(--teal)',
            color: 'var(--bg-primary)', padding: '10px 24px', borderRadius: '24px',
            fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s'
          }}
        >
          {exported ? '✓ Exported!' : '↓ Export & Share'}
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
                style={{
                  flex: 1, padding: '8px', borderRadius: '8px',
                  backgroundColor: activeChart === t ? 'var(--teal)' : 'var(--bg-card-lt)',
                  color: activeChart === t ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s'
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>Date Range</div>
          <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-card-lt)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '32px' }}>
            {config.label}
          </div>

          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>Template</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Quarterly', 'Annual', 'Custom'].map(t => (
              <button 
                key={t}
                onClick={() => setActiveTab(t)}
                style={{
                  width: '100%', padding: '12px', borderRadius: '8px',
                  backgroundColor: activeTab === t ? 'color-mix(in srgb, var(--teal) 15%, transparent)' : 'transparent',
                  color: activeTab === t ? 'var(--teal)' : 'var(--text-secondary)',
                  border: activeTab === t ? '1px solid var(--teal)' : '1px solid var(--border)',
                  fontSize: '13px', fontWeight: '600', textAlign: 'left', cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Right Preview */}
        <div style={{ flex: 1, backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>Portfolio Performance</h2>
          <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '32px' }}>{config.label}</div>
          
          <div style={{ marginBottom: '40px', flex: 1 }}>
            <Chart type={activeChart.toLowerCase()} data={config.data} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            <StatCard label="Start Value" value={config.startVal} color="var(--blue)" />
            <StatCard label="End Value" value={config.endVal} color="var(--blue)" />
            <StatCard label="Growth" value={config.growth} color="var(--green)" />
            <StatCard label="Return" value={config.ret} color="var(--green)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;
