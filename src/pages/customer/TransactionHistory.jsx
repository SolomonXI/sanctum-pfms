import React, { useState, useMemo } from 'react';
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

const allCategories = ['All', ...Array.from(new Set(transactions.map(t => t.category)))];

const TransactionHistory = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('none'); // 'none' | 'high-low' | 'low-high'

  const filtered = useMemo(() => {
    let result = [...transactions];

    if (search.trim()) {
      result = result.filter(t =>
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter !== 'All') {
      result = result.filter(t => t.category === categoryFilter);
    }

    if (sortOrder === 'high-low') {
      result.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
    } else if (sortOrder === 'low-high') {
      result.sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount));
    }

    return result;
  }, [search, categoryFilter, sortOrder]);

  const columns = ['Date', 'Description', 'Category', 'Amount', 'Account', 'Status'];
  const rows = filtered.map(tx => ({
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

  const activeFilterCount = [categoryFilter !== 'All', sortOrder !== 'none', search.trim() !== ''].filter(Boolean).length;

  return (
    <div style={{ backgroundColor: 'var(--bg-card)', padding: '24px', borderRadius: '12px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600' }}>All Transactions</h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{filtered.length} of {transactions.length}</span>
        </div>
        <button
          onClick={() => setShowFilter(v => !v)}
          style={{
            backgroundColor: showFilter ? 'var(--teal)' : 'var(--bg-card-lt)',
            border: '1px solid var(--border)',
            padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600',
            color: showFilter ? 'var(--bg-primary)' : 'var(--text-primary)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            transition: 'all 0.15s'
          }}
        >
          {showFilter ? '▲ Hide Filters' : '▼ Filter & Search'}
          {activeFilterCount > 0 && !showFilter && (
            <span style={{ backgroundColor: 'var(--teal)', color: 'var(--bg-primary)', borderRadius: '50%', width: '18px', height: '18px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <div style={{ backgroundColor: 'var(--bg-card-lt)', borderRadius: '10px', padding: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid var(--border)' }}>
          {/* Search */}
          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Search</label>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by description or category..."
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', color: 'white', fontSize: '13px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '24px' }}>
            {/* Category Filter */}
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Category</label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {allCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    style={{
                      padding: '5px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600',
                      cursor: 'pointer', transition: 'all 0.15s',
                      backgroundColor: categoryFilter === cat ? 'var(--teal)' : 'var(--bg-card)',
                      color: categoryFilter === cat ? 'var(--bg-primary)' : 'var(--text-secondary)',
                      border: categoryFilter === cat ? 'none' : '1px solid var(--border)'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div style={{ minWidth: '200px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Sort by Amount</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[['none', 'Default (date)'], ['high-low', 'Highest to Lowest'], ['low-high', 'Lowest to Highest']].map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setSortOrder(val)}
                    style={{
                      padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600',
                      cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                      backgroundColor: sortOrder === val ? 'color-mix(in srgb, var(--teal) 15%, transparent)' : 'transparent',
                      color: sortOrder === val ? 'var(--teal)' : 'var(--text-secondary)',
                      border: sortOrder === val ? '1px solid var(--teal)' : '1px solid transparent'
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Clear */}
          {activeFilterCount > 0 && (
            <button
              onClick={() => { setSearch(''); setCategoryFilter('All'); setSortOrder('none'); }}
              style={{ alignSelf: 'flex-start', color: 'var(--red)', fontSize: '13px', fontWeight: '600', cursor: 'pointer', background: 'transparent', border: 'none' }}
            >
              × Clear All Filters
            </button>
          )}
        </div>
      )}

      {rows.length > 0
        ? <DataTable columns={columns} rows={rows} />
        : <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '48px' }}>No transactions match your filters.</div>
      }
    </div>
  );
};

export default TransactionHistory;
