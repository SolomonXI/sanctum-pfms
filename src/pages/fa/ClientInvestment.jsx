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

const ClientInvestment = () => {
  const [selectedClient, setSelectedClient] = useState(clients[0]);

  const columns = ['Client', 'Type', 'Assets', 'Risk', 'Status'];
  const rows = clients.map(c => ({
    raw: c,
    cells: [
      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{c.name}</span>,
      <Badge label={c.type} color={typeColor[c.type]} />,
      c.assets,
      c.risk,
      <Badge label={c.status} color={statusColor[c.status]} />
    ]
  }));

  const chartData = [
    { name: 'Jan', value: 1.1 },
    { name: 'Feb', value: 1.15 },
    { name: 'Mar', value: 1.12 },
    { name: 'Apr', value: 1.18 },
    { name: 'May', value: 1.24 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)' }}>Filter:</span>
          {['All Clients', 'HNW', 'Business', 'Standard'].map((f, i) => (
            <button key={i} style={{ padding: '6px 16px', borderRadius: '16px', backgroundColor: i === 0 ? 'var(--teal)' : 'var(--bg-card)', color: i === 0 ? 'var(--bg-primary)' : 'var(--text-primary)', fontWeight: '600' }}>
              {f}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ backgroundColor: 'var(--green)', color: 'var(--bg-primary)', padding: '10px 20px', borderRadius: '8px', fontWeight: '600' }}>+ Add Client</button>
          <button style={{ backgroundColor: 'var(--gold)', color: 'var(--bg-primary)', padding: '10px 20px', borderRadius: '8px', fontWeight: '600' }}>Generate Report</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', flex: 1 }}>
        {/* Left: Table */}
        <div style={{ flex: 1, backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>Client Induction List</h2>
          <DataTable columns={columns} rows={rows} onRowClick={(client) => setSelectedClient(client)} />
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
    </div>
  );
};

export default ClientInvestment;
