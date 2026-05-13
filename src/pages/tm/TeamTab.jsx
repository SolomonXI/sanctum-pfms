import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import { team } from '../../data/team';

const TeamTab = () => {
  const navigate = useNavigate();

  const columns = ['Team Member', 'Specialisation', 'Clients', 'Rating', 'Account'];
  const rows = team.map(member => ({
    raw: member,
    cells: [
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg-primary)', fontWeight: '600', fontSize: '12px' }}>
          {member.name.split(' ').map(n => n[0]).join('')}
        </div>
        <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{member.name}</span>
      </div>,
      <span style={{ color: 'var(--teal)' }}>{member.specialisation}</span>,
      member.clients,
      <span style={{ color: 'var(--gold)', fontWeight: '600' }}>★ {member.ratings.overall}</span>,
      <span 
        style={{ color: 'var(--teal)', fontWeight: '600', cursor: 'pointer' }}
        onClick={(e) => { e.stopPropagation(); navigate(`/tm/member/${member.id}`); }}
      >
        View Profile →
      </span>
    ]
  }));

  return (
    <div style={{ backgroundColor: 'var(--bg-card)', padding: '24px', borderRadius: '12px' }}>
      <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>Team Members</h2>
      <DataTable columns={columns} rows={rows} onRowClick={(member) => navigate(`/tm/member/${member.id}`)} />
    </div>
  );
};

export default TeamTab;
