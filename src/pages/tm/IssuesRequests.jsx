import React from 'react';
import DataTable from '../../components/DataTable';
import Badge from '../../components/Badge';

const IssuesRequests = () => {
  const columns = ['Team Member', 'Client', 'Rating', 'Problem', 'Status', 'Action'];
  
  const issues = [
    { member: 'David Chen', client: 'Sarah Jenkins', rating: '4.8', problem: 'Requested risk profile update', status: 'Low' },
    { member: 'James Wilson', client: 'Marcus Cole', rating: '4.2', problem: 'Client complaint regarding fees', status: 'High' },
    { member: 'Priya Sharma', client: 'Apex Tech Ltd', rating: '4.9', problem: 'Investment cap breached, requires override', status: 'High' },
    { member: 'Tom Hardy', client: 'Unknown', rating: '4.5', problem: 'Missed mandatory compliance training', status: 'Med' },
    { member: 'Anita Patel', client: 'Elena Rostova', rating: '4.7', problem: 'Address verification pending', status: 'Low' }
  ];

  const statusColor = { High: 'var(--red)', Med: 'var(--yellow)', Low: 'var(--green)' };

  const rows = issues.map(iss => ({
    cells: [
      <span style={{ fontWeight: '600' }}>{iss.member}</span>,
      iss.client,
      <span style={{ color: 'var(--gold)', fontWeight: '600' }}>★ {iss.rating}</span>,
      iss.problem,
      <Badge label={iss.status} color={statusColor[iss.status]} />,
      <button style={{ color: 'var(--teal)', fontWeight: '600' }}>Resolve →</button>
    ]
  }));

  return (
    <div style={{ backgroundColor: 'var(--bg-card)', padding: '24px', borderRadius: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" id="unresolved" style={{ width: '16px', height: '16px', accentColor: 'var(--teal)' }} />
          <label htmlFor="unresolved" style={{ color: 'var(--text-secondary)' }}>Show unresolved only</label>
        </div>
        <button style={{ backgroundColor: 'var(--bg-card-lt)', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>
          Filter by Severity
        </button>
      </div>
      <DataTable columns={columns} rows={rows} />
    </div>
  );
};

export default IssuesRequests;
