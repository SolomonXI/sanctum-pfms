import React, { useState, useMemo } from 'react';
import DataTable from '../../components/DataTable';
import Badge from '../../components/Badge';

const allIssues = [
  { id: 1, member: 'James Wilson',  client: 'Marcus Cole',    rating: '4.2', problem: 'Client complaint regarding fees',              status: 'High', resolved: false },
  { id: 2, member: 'Priya Sharma',  client: 'Apex Tech Ltd',  rating: '4.9', problem: 'Investment cap breached, requires override',  status: 'High', resolved: false },
  { id: 3, member: 'Tom Hardy',     client: 'Unknown',        rating: '4.5', problem: 'Missed mandatory compliance training',         status: 'Med',  resolved: false },
  { id: 4, member: 'David Chen',    client: 'Sarah Jenkins',  rating: '4.8', problem: 'Requested risk profile update',               status: 'Low',  resolved: false },
  { id: 5, member: 'Anita Patel',   client: 'Elena Rostova',  rating: '4.7', problem: 'Address verification pending',               status: 'Low',  resolved: false },
  { id: 6, member: 'David Chen',    client: 'Nova Design Co', rating: '4.8', problem: 'Annual review completed successfully',        status: 'Low',  resolved: true  },
  { id: 7, member: 'Priya Sharma',  client: 'Marcus Cole',    rating: '4.9', problem: 'KYC documentation submitted and approved',    status: 'Med',  resolved: true  },
];

const statusColor = { High: 'var(--red)', Med: 'var(--yellow)', Low: 'var(--green)' };
const severityOrder = { High: 0, Med: 1, Low: 2 };

const Overlay = ({ onClose, children }) => (
  <div onClick={onClose} style={{
    position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
  }}>
    <div onClick={e => e.stopPropagation()} style={{
      backgroundColor: 'var(--bg-card)', borderRadius: '16px', padding: '32px',
      width: '500px', border: '1px solid var(--border)'
    }}>
      {children}
    </div>
  </div>
);

const IssuesRequests = () => {
  const [issues, setIssues] = useState(allIssues);
  const [showUnresolvedOnly, setShowUnresolvedOnly] = useState(false);
  const [showResolvedOnly, setShowResolvedOnly] = useState(false);
  const [severityFilter, setSeverityFilter] = useState('All');
  const [showSeverityMenu, setShowSeverityMenu] = useState(false);
  const [resolveModal, setResolveModal] = useState(null); // issue object
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const filtered = useMemo(() => {
    let result = [...issues];
    if (showUnresolvedOnly) result = result.filter(i => !i.resolved);
    else if (showResolvedOnly) result = result.filter(i => i.resolved);
    if (severityFilter !== 'All') result = result.filter(i => i.status === severityFilter);
    result.sort((a, b) => severityOrder[a.status] - severityOrder[b.status]);
    return result;
  }, [issues, showUnresolvedOnly, showResolvedOnly, severityFilter]);

  const handleResolve = () => {
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setIssues(prev => prev.map(i => i.id === resolveModal.id ? { ...i, resolved: true } : i));
      setSent(false);
      setMessage('');
      setResolveModal(null);
    }, 1500);
  };

  const columns = ['Team Member', 'Client', 'Rating', 'Problem', 'Status', 'Action'];
  const rows = filtered.map(iss => ({
    cells: [
      <span style={{ fontWeight: '600' }}>{iss.member}</span>,
      iss.client,
      <span style={{ color: 'var(--gold)', fontWeight: '600' }}>★ {iss.rating}</span>,
      <span style={{ color: iss.resolved ? 'var(--text-muted)' : 'inherit' }}>{iss.problem}</span>,
      iss.resolved
        ? <Badge label="Resolved" color="var(--teal)" />
        : <Badge label={iss.status} color={statusColor[iss.status]} />,
      iss.resolved
        ? <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Closed</span>
        : <button onClick={() => setResolveModal(iss)} style={{ color: 'var(--teal)', fontWeight: '600', cursor: 'pointer', background: 'transparent', border: 'none' }}>Resolve →</button>
    ]
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Filter bar */}
      <div style={{ backgroundColor: 'var(--bg-card)', padding: '16px 20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        {/* Left: view toggles */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '13px', fontWeight: '500' }}>
            <input
              type="checkbox"
              checked={showUnresolvedOnly}
              onChange={e => { setShowUnresolvedOnly(e.target.checked); if (e.target.checked) setShowResolvedOnly(false); }}
              style={{ width: '16px', height: '16px', accentColor: 'var(--teal)', cursor: 'pointer' }}
            />
            Show unresolved only
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '13px', fontWeight: '500' }}>
            <input
              type="checkbox"
              checked={showResolvedOnly}
              onChange={e => { setShowResolvedOnly(e.target.checked); if (e.target.checked) setShowUnresolvedOnly(false); }}
              style={{ width: '16px', height: '16px', accentColor: 'var(--teal)', cursor: 'pointer' }}
            />
            Show recently resolved
          </label>
        </div>

        {/* Right: severity filter */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowSeverityMenu(v => !v)}
            style={{
              backgroundColor: severityFilter !== 'All' ? 'color-mix(in srgb, var(--red) 12%, transparent)' : 'var(--bg-card-lt)',
              border: severityFilter !== 'All' ? '1px solid var(--red)' : '1px solid var(--border)',
              color: severityFilter !== 'All' ? 'var(--red)' : 'var(--text-primary)',
              padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer'
            }}
          >
            {severityFilter === 'All' ? 'Filter by Severity ▾' : `Severity: ${severityFilter} ▾`}
          </button>
          {showSeverityMenu && (
            <div style={{
              position: 'absolute', top: '42px', right: 0, backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)', borderRadius: '10px', padding: '8px',
              zIndex: 100, minWidth: '160px', display: 'flex', flexDirection: 'column', gap: '4px'
            }}>
              {['All', 'High', 'Med', 'Low'].map(sev => (
                <button key={sev} onClick={() => { setSeverityFilter(sev); setShowSeverityMenu(false); }} style={{
                  padding: '10px 14px', borderRadius: '8px', textAlign: 'left', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                  backgroundColor: severityFilter === sev ? 'color-mix(in srgb, var(--teal) 12%, transparent)' : 'transparent',
                  color: sev === 'All' ? 'var(--text-primary)' : sev === 'High' ? 'var(--red)' : sev === 'Med' ? 'var(--yellow)' : 'var(--green)'
                }}>
                  {sev === 'All' ? 'All Severities' : `${sev} Priority`}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: 'var(--bg-card)', padding: '24px', borderRadius: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600' }}>Issues & Requests</h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{filtered.length} issue{filtered.length !== 1 ? 's' : ''}</span>
        </div>
        {filtered.length > 0
          ? <DataTable columns={columns} rows={rows} />
          : <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>No issues match the selected filters.</div>
        }
      </div>

      {/* Resolve Modal — message the FA */}
      {resolveModal && (
        <Overlay onClose={() => { setResolveModal(null); setMessage(''); setSent(false); }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--red)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
              {resolveModal.status} Priority Issue
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Resolve with {resolveModal.member}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Client: {resolveModal.client}</p>
            <div style={{ backgroundColor: 'var(--bg-card-lt)', padding: '12px 16px', borderRadius: '8px', marginTop: '12px', fontSize: '13px', color: 'var(--text-secondary)', borderLeft: '3px solid var(--yellow)' }}>
              "{resolveModal.problem}"
            </div>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Message to {resolveModal.member}</div>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder={`Hi ${resolveModal.member.split(' ')[0]}, regarding the issue with ${resolveModal.client}...`}
            style={{ width: '100%', height: '130px', padding: '14px', borderRadius: '8px', backgroundColor: 'var(--bg-card-lt)', border: '1px solid var(--border)', color: 'white', resize: 'none', marginBottom: '16px', fontSize: '13px' }}
          />
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button onClick={() => { setResolveModal(null); setMessage(''); }} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer', background: 'transparent' }}>
              Cancel
            </button>
            <button onClick={handleResolve} style={{ padding: '10px 24px', borderRadius: '8px', backgroundColor: sent ? 'var(--green)' : 'var(--teal)', color: 'var(--bg-primary)', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s', minWidth: '150px' }}>
              {sent ? '✓ Resolved & Sent!' : 'Send & Mark Resolved'}
            </button>
          </div>
        </Overlay>
      )}
    </div>
  );
};

export default IssuesRequests;
