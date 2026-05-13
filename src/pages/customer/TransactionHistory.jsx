import React from 'react';
import DataTable from '../../components/DataTable';
import Badge from '../../components/Badge';
import { transactions } from '../../data/transactions';

const categoryColor = {
  Groceries: 'var(--teal)',
  Income: 'var(--green)',
  Entertainment: 'var(--magenta)',
  Travel: 'var(--blue)',
  Shopping: 'var(--yellow)',
  Health: 'var(--orange)',
  Dining: 'var(--red)',
  Bills: 'var(--teal)'
};

const TransactionHistory = () => {
  const columns = ['Date', 'Description', 'Category', 'Amount', 'Account', 'Status'];
  
  const rows = transactions.map(tx => ({
    cells: [
      tx.date,
      <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{tx.description}</span>,
      <Badge label={tx.category} color={categoryColor[tx.category] || 'var(--text-secondary)'} />,
      <span style={{ color: tx.amount > 0 ? 'var(--green)' : 'inherit', fontWeight: '600' }}>
        {tx.amount > 0 ? '+' : ''}£{Math.abs(tx.amount).toFixed(2)}
      </span>,
      tx.account,
      <Badge label={tx.status} color={tx.status === 'Completed' ? 'var(--green)' : 'var(--yellow)'} />
    ]
  }));

  return (
    <div style={{ backgroundColor: 'var(--bg-card)', padding: '24px', borderRadius: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600' }}>All Transactions</h2>
        <button style={{ backgroundColor: 'var(--bg-card-lt)', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>
          Filter & Search
        </button>
      </div>
      <DataTable columns={columns} rows={rows} />
    </div>
  );
};

export default TransactionHistory;
