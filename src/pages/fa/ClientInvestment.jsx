import React, { useState } from 'react';
import DataTable from '../../components/DataTable';
import StatCard from '../../components/StatCard';
import Badge from '../../components/Badge';
import Chart from '../../components/Chart';
import { clients } from '../../data/clients';

const typeColor = {
  HNW: 'var(--gold)',
  Business: 'var(--blue)',
  Standard: 'var(--teal)'
};

const statusColor = {
  Active: 'var(--green)',
  Review: 'var(--yellow)',
  Pending: 'var(--text-muted)'
};

// FA only sees their own assigned clients (not all clients — that's TM's view)
const FA_CLIENTS = clients.filter(c => [1, 3, 4].includes(c.id)); // Sarah Jenkins, Marcus Cole, Elena Rostova

const Overlay = ({ onClose, children }) => (
  <div onClick={onClose} style={{
    position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
  }}>
    <div onClick={e => e.stopPropagation()} style={{
      backgroundColor: 'var(--bg-card)', borderRadius: '16px', padding: '32px',
      width: '480px', border: '1px solid var(--border)'
    }}>
      {children}
    </div>
  </div>
);

const ClientInvestment = () => {
  const [activeFilter, setActiveFilter] = useState('All Clients');
  const [selectedClient, setSelectedClient] = useState(FA_CLIENTS[0]);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', type: 'Standard', risk: 'Low' });
  const [clientAdded, setClientAdded] = useState(false);

  const filters = ['All Clients', 'HNW', 'Business', 'Standard'];
  const filteredClients = activeFilter === 'All Clients'
    ? FA_CLIENTS
    : FA_CLIENTS.filter(c => c.type === activeFilter);

  const chartData = [
    { name: 'Jan', value: 1.1 },
    { name: 'Feb', value: 1.15 },
    { name: 'Mar', value: 1.12 },
    { name: 'Apr', value: 1.18 },
    { name: 'May', value: 1.24 }
  ];

  const columns = ['Client', 'Type', 'Assets', 'Risk', 'Status'];
  const rows = filteredClients.map(c => ({
    raw: c,
    cells: [
      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{c.name}</span>,
      <Badge label={c.type} color={typeColor[c.type]} />,
      c.assets,
      c.risk,
      <Badge label={c.status} color={statusColor[c.status]} />
    ]
  }));

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessageSent(true);
    setTimeout(() => { setMessageSent(false); setMessage(''); setShowMessage(false); }, 1500);
  };

  const handleAddClient = () => {
    setClientAdded(true);
    setTimeout(() => { setClientAdded(false); setShowAddClient(false); setNewClient({ name: '', type: 'Standard', risk: 'Low' }); }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '13px', marginRight: '4px' }}>Filter:</span>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '6px 16px', borderRadius: '16px',
                backgroundColor: activeFilter === f ? 'var(--teal)' : 'var(--bg-card)',
                color: activeFilter === f ? 'var(--bg-primary)' : 'var(--text-primary)',
                fontWeight: '600', fontSize: '13px', cursor: 'pointer',
                border: activeFilter === f ? 'none' : '1px solid var(--border)',
                transition: 'all 0.15s'
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setShowMessage(true)}
            style={{ backgroundColor: 'var(--blue)', color: 'white', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
          >
            ✉ Message Client
          </button>
          <button
            onClick={() => setShowAddClient(true)}
            style={{ backgroundColor: 'var(--green)', color: 'var(--bg-primary)', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
          >
            + Add Client
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', flex: 1 }}>
        {/* Left: Table */}
        <div style={{ flex: 1, backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600' }}>My Clients</h2>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{filteredClients.length} client{filteredClients.length !== 1 ? 's' : ''}</span>
          </div>
          {filteredClients.length > 0
            ? <DataTable columns={columns} rows={rows} onRowClick={(client) => setSelectedClient(client)} />
            : <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>No {activeFilter} clients found.</div>
          }
        </div>

        {/* Right: Detail */}
        <div style={{ width: '400px', backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700' }}>{selectedClient.name}</h2>
              <Badge label={selectedClient.type} color={typeColor[selectedClient.type]} />
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Last Meeting: {selectedClient.lastMeeting}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <StatCard label="Total Assets" value={selectedClient.totalAssets} color="var(--blue)" />
            <StatCard label="Total Liability" value={selectedClient.liability} color="var(--red)" />
          </div>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Investment History (£M)</h3>
            <Chart type="bar" data={chartData} color={typeColor[selectedClient.type]} />
          </div>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Active Positions</h3>
            {selectedClient.stocks.map((stock, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: 'var(--bg-card-lt)', borderRadius: '8px', marginBottom: '8px' }}>
                <span style={{ fontWeight: '600' }}>{stock.ticker}</span>
                <span style={{ color: stock.pl.startsWith('+') ? 'var(--green)' : 'var(--red)', fontWeight: '600' }}>{stock.pl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessage && (
        <Overlay onClose={() => setShowMessage(false)}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Send Message</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px' }}>To: {selectedClient.name}</p>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Type your message..."
            style={{ width: '100%', height: '120px', padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-card-lt)', border: '1px solid var(--border)', color: 'white', resize: 'none', marginBottom: '16px' }}
          />
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button onClick={() => setShowMessage(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              Cancel
            </button>
            <button onClick={handleSendMessage} style={{ padding: '10px 24px', borderRadius: '8px', backgroundColor: messageSent ? 'var(--green)' : 'var(--teal)', color: 'var(--bg-primary)', fontWeight: '600', cursor: 'pointer' }}>
              {messageSent ? '✓ Sent!' : 'Send Message'}
            </button>
          </div>
        </Overlay>
      )}

      {/* Add Client Modal */}
      {showAddClient && (
        <Overlay onClose={() => setShowAddClient(false)}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px' }}>Add New Client</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Full Name</label>
              <input
                value={newClient.name}
                onChange={e => setNewClient({ ...newClient, name: e.target.value })}
                placeholder="e.g. John Smith"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-card-lt)', border: '1px solid var(--border)', color: 'white' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Client Type</label>
              <select
                value={newClient.type}
                onChange={e => setNewClient({ ...newClient, type: e.target.value })}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-card-lt)', border: '1px solid var(--border)', color: 'white' }}
              >
                <option>Standard</option>
                <option>HNW</option>
                <option>Business</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Risk Profile</label>
              <select
                value={newClient.risk}
                onChange={e => setNewClient({ ...newClient, risk: e.target.value })}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-card-lt)', border: '1px solid var(--border)', color: 'white' }}
              >
                <option>Low</option>
                <option>Moderate</option>
                <option>High</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button onClick={() => setShowAddClient(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              Cancel
            </button>
            <button onClick={handleAddClient} style={{ padding: '10px 24px', borderRadius: '8px', backgroundColor: clientAdded ? 'var(--green)' : 'var(--teal)', color: 'var(--bg-primary)', fontWeight: '600', cursor: 'pointer' }}>
              {clientAdded ? '✓ Client Added!' : 'Add Client'}
            </button>
          </div>
        </Overlay>
      )}
    </div>
  );
};

export default ClientInvestment;
