import React, { useState } from 'react';

const myClients = [
  { name: 'Sarah Jenkins', type: 'Quarterly Review' },
  { name: 'Marcus Cole', type: 'Initial Consultation' },
  { name: 'Elena Rostova', type: 'Portfolio Check-in' },
];

const Scheduling = () => {
  const [selectedClient, setSelectedClient] = useState(myClients[0]);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [inbox, setInbox] = useState([
    { name: 'Sarah Jenkins', excerpt: 'Could we reschedule our meeting next week?', time: '10:45 AM', unread: true },
    { name: 'Elena Rostova', excerpt: 'I saw the news about NVDA. Should we buy more?', time: 'May 10', unread: false },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    // Add a mock reply to inbox
    setInbox(prev => [
      { name: selectedClient.name, excerpt: `You: "${message}"`, time: 'Just now', unread: false },
      ...prev
    ]);
    setTimeout(() => {
      setSent(false);
      setMessage('');
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', gap: '24px', height: '100%' }}>
      {/* Appointments */}
      <div style={{ width: '340px', backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>Client Appointments</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { time: '09:00 - 10:00', name: 'Sarah Jenkins', type: 'Quarterly Review' },
            { time: '11:30 - 12:15', name: 'Marcus Cole', type: 'Initial Consultation' },
            { time: '14:00 - 15:30', name: 'Elena Rostova', type: 'Portfolio Check-in' },
            { time: '16:15 - 17:00', name: 'Team Standup', type: 'Internal' }
          ].map((apt, idx) => (
            <div key={idx} style={{ backgroundColor: 'var(--bg-card-lt)', padding: '16px', borderRadius: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--teal)', marginBottom: '4px' }}>{apt.time}</div>
              <div style={{ fontSize: '13px', fontWeight: '600' }}>{apt.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{apt.type}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle: Message Client */}
      <div style={{ width: '420px', backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>Send Message to Client</h2>

        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Select Client</div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {myClients.map(c => (
            <button
              key={c.name}
              onClick={() => setSelectedClient(c)}
              style={{
                padding: '8px 14px', borderRadius: '16px', fontSize: '12px', fontWeight: '600',
                backgroundColor: selectedClient.name === c.name ? 'var(--teal)' : 'var(--bg-card-lt)',
                color: selectedClient.name === c.name ? 'var(--bg-primary)' : 'var(--text-secondary)',
                cursor: 'pointer', transition: 'all 0.15s'
              }}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Message</div>
        <textarea 
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder={`Type a message to ${selectedClient.name}...`}
          style={{ flex: 1, padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-card-lt)', border: '1px solid var(--border)', color: 'white', resize: 'none', marginBottom: '16px', minHeight: '120px' }}
        />
        <button
          onClick={handleSend}
          style={{
            width: '100%', padding: '12px', borderRadius: '24px',
            backgroundColor: sent ? 'var(--green)' : 'var(--teal)',
            color: 'var(--bg-primary)', fontWeight: '600', cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          {sent ? '✓ Message Sent!' : `Send to ${selectedClient.name}`}
        </button>
      </div>

      {/* Incoming Messages */}
      <div style={{ flex: 1, backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>Inbox</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {inbox.map((msg, idx) => (
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
