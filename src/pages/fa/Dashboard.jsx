import React from 'react';
import Chart from '../../components/Chart';
import Badge from '../../components/Badge';
import { news } from '../../data/news';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', gap: '24px', height: '100%' }}>
      {/* Alerts */}
      <div style={{ width: '310px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600' }}>Alerts</h2>
        {[
          { type: 'HIGH', msg: 'Apex Tech Ltd: Investment cap breached', color: 'var(--red)' },
          { type: 'MED', msg: 'Sarah Jenkins: Risk profile review due', color: 'var(--yellow)' },
          { type: 'LOW', msg: 'New Standard client assigned to your portfolio', color: 'var(--green)' },
          { type: 'LOW', msg: 'Quarterly compliance check completed', color: 'var(--green)' }
        ].map((alert, idx) => (
          <div key={idx} style={{ backgroundColor: 'var(--bg-card-lt)', padding: '16px', borderRadius: '8px', borderLeft: `4px solid ${alert.color}` }}>
            <Badge label={alert.type} color={alert.color} />
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>{alert.msg}</div>
          </div>
        ))}
      </div>

      {/* Market News */}
      <div style={{ width: '310px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600' }}>Market News</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {news.map(item => (
            <div key={item.id} style={{ backgroundColor: 'var(--bg-card)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '9px', fontWeight: '700', color: 'var(--teal)', letterSpacing: '1px', marginBottom: '4px' }}>{item.source}</div>
              <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>{item.headline}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Schedule */}
      <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600' }}>Today's Schedule <span style={{ color: 'var(--teal)', fontSize: '12px', marginLeft: '8px', fontWeight: '500' }}>13 May</span></h2>
        {[
          { time: '09:00', name: 'Sarah Jenkins', type: 'Quarterly Review' },
          { time: '11:30', name: 'Marcus Cole', type: 'Initial Consultation' },
          { time: '14:00', name: 'Apex Tech Ltd', type: 'Portfolio Restructure' },
          { time: '16:15', name: 'Nova Design Co', type: 'Risk Assessment' }
        ].map((apt, idx) => (
          <div key={idx} style={{ backgroundColor: 'var(--bg-card-lt)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--teal)', marginBottom: '4px' }}>{apt.time}</div>
            <div style={{ fontSize: '13px', fontWeight: '600' }}>{apt.name}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{apt.type}</div>
          </div>
        ))}
      </div>

      {/* Risk Overview */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600' }}>Risk Overview</h2>
        <div style={{ flex: 1, backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '160px', height: '160px', borderRadius: '50%', border: '8px solid var(--teal)', backgroundColor: 'var(--bg-card-lt)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '20px', fontWeight: '700' }}>Moderate</div>
          </div>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', width: '100%', textAlign: 'left' }}>Portfolio Mix (Aggregate)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
            {[
              { label: 'Equities', val: '64%', color: 'var(--teal)' },
              { label: 'Bonds', val: '28%', color: 'var(--blue)' },
              { label: 'Cash/Alternatives', val: '8%', color: 'var(--gold)' }
            ].map((mix, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: mix.color }}></div>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{mix.label}</span>
                </div>
                <span style={{ fontWeight: '600' }}>{mix.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
