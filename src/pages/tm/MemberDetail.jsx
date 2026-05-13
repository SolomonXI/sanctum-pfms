import React from 'react';
import { useParams } from 'react-router-dom';
import Chart from '../../components/Chart';
import DataTable from '../../components/DataTable';
import Badge from '../../components/Badge';
import { team } from '../../data/team';

const MemberDetail = () => {
  const { id } = useParams();
  const member = team.find(t => t.id === parseInt(id));

  if (!member) return <div style={{ color: 'white' }}>Member not found</div>;

  const chartData = member.monthlyRatings.map((rating, idx) => ({
    name: `Month ${idx + 1}`,
    value: rating
  }));

  const clientColumns = ['Client Name', 'Type'];
  const clientRows = member.assignedClients.map(c => ({
    cells: [
      <span style={{ fontWeight: '600' }}>{c.name}</span>,
      <Badge label={c.type} color={c.type === 'HNW' ? 'var(--gold)' : c.type === 'Business' ? 'var(--blue)' : 'var(--teal)'} />
    ]
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
      {/* Top Row */}
      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Member Card */}
        <div style={{ width: '340px', backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'color-mix(in srgb, var(--teal) 18%, transparent)', color: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h2 style={{ fontSize: '16px', fontWeight: '700' }}>{member.name}</h2>
          <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px' }}>Financial Adviser</div>
          <div style={{ color: 'var(--teal)', fontSize: '13px', fontWeight: '600', marginBottom: '24px' }}>{member.specialisation}</div>

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>Email</span><span>{member.name.toLowerCase().replace(' ', '.')}@sanctum.com</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>Phone</span><span>+44 7700 900077</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>Clients</span><span>{member.clients}</span></div>
          </div>
        </div>

        {/* Ratings Grid */}
        <div style={{ width: '440px', backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>Performance Ratings</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {Object.entries(member.ratings).map(([key, val]) => (
              <div key={key} style={{ backgroundColor: 'var(--bg-card-lt)', padding: '16px', borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{key}</div>
                <div style={{ fontSize: '22px', fontWeight: '700', color: 'var(--gold)' }}>★ {val.toFixed(1)}<span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>/5</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* Rating Chart */}
        <div style={{ flex: 1, backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>Avg Rating / Month</h2>
          <Chart type="line" data={chartData} color="var(--teal)" />
        </div>
      </div>

      {/* Bottom Row: Assigned Clients */}
      <div style={{ flex: 1, backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600' }}>Assigned Clients</h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ backgroundColor: 'transparent', border: '1px solid var(--red)', color: 'var(--red)', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', fontSize: '13px' }}>- Remove</button>
            <button style={{ backgroundColor: 'var(--teal)', color: 'var(--bg-primary)', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', fontSize: '13px' }}>+ Add Client</button>
          </div>
        </div>
        {member.assignedClients.length > 0 ? (
          <DataTable columns={clientColumns} rows={clientRows} />
        ) : (
          <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>No clients currently assigned to this adviser.</div>
        )}
      </div>
    </div>
  );
};

export default MemberDetail;
