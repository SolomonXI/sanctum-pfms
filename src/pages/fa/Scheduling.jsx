import React from 'react';

const Scheduling = () => {
  return (
    <div style={{ display: 'flex', gap: '24px', height: '100%' }}>
      {/* Appointments */}
      <div style={{ width: '340px', backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>Client Appointments</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { time: '09:00 - 10:00', name: 'Sarah Jenkins', type: 'Quarterly Review' },
            { time: '11:30 - 12:15', name: 'Marcus Cole', type: 'Initial Consultation' },
            { time: '14:00 - 15:30', name: 'Apex Tech Ltd', type: 'Portfolio Restructure' },
            { time: '16:15 - 17:00', name: 'Nova Design Co', type: 'Risk Assessment' }
          ].map((apt, idx) => (
            <div key={idx} style={{ backgroundColor: 'var(--bg-card-lt)', padding: '16px', borderRadius: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--teal)', marginBottom: '4px' }}>{apt.time}</div>
              <div style={{ fontSize: '13px', fontWeight: '600' }}>{apt.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{apt.type}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle */}
      <div style={{ width: '440px', backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>Schedule New Appointment</h2>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Available Financial Advisers</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
          {[
            { name: 'David Chen', clients: '42 Active Clients', status: 'Available', color: 'var(--green)' },
            { name: 'Priya Sharma', clients: '28 Active Clients', status: 'In Meeting', color: 'var(--red)' },
            { name: 'Anita Patel', clients: '35 Active Clients', status: 'Available', color: 'var(--green)' }
          ].map((fa, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
              <div>
                <div style={{ fontWeight: '600' }}>{fa.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{fa.clients}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: fa.color }}></div>
                {fa.status}
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Send Message to Client</div>
        <textarea 
          placeholder="Type your message here..."
          style={{ width: '100%', height: '120px', padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-card-lt)', border: '1px solid var(--border)', color: 'white', marginBottom: '16px', resize: 'none' }}
        />
        <button style={{ width: '100%', padding: '12px', borderRadius: '24px', backgroundColor: 'var(--teal)', color: 'var(--bg-primary)', fontWeight: '600' }}>
          Send Message
        </button>
      </div>

      {/* Incoming Messages */}
      <div style={{ flex: 1, backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>Incoming Messages</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { name: 'Sarah Jenkins', excerpt: 'Could we reschedule our meeting next week?', time: '10:45 AM', unread: true },
            { name: 'Apex Tech Ltd', excerpt: 'Attached are the Q1 financials for your review.', time: 'Yesterday', unread: false },
            { name: 'Elena Rostova', excerpt: 'I saw the news about NVDA. Should we buy more?', time: 'May 10', unread: false }
          ].map((msg, idx) => (
            <div key={idx} style={{ backgroundColor: 'var(--bg-card-lt)', padding: '16px', borderRadius: '8px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ fontWeight: '600' }}>{msg.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{msg.time}</div>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{msg.excerpt}</div>
              {msg.unread && (
                <div style={{ position: 'absolute', top: '16px', right: '16px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--teal)' }}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scheduling;
