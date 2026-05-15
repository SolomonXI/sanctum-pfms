import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, Printer, ChevronDown, CheckCircle2, CreditCard, PiggyBank, Wallet } from 'lucide-react';
import { transactions } from '../../data/transactions';
import { fadeUp, staggerContainer, staggerItem } from '../../utils/animations';

// ─── Account metadata ──────────────────────────────────────────────────────
const ACCOUNTS = [
  {
    id: 'combined',
    label: 'Combined Statement',
    mask: 'All Accounts',
    openingBalance: 22418.50,
    color: 'var(--teal)',
    Icon: Wallet,
    sortCode: '20-44-51',
    accountNumber: 'ALL',
  },
  {
    id: 'Current Account',
    label: 'Current Account',
    mask: '**** 4291',
    openingBalance: 9894.50,
    color: 'var(--teal)',
    Icon: CreditCard,
    sortCode: '20-44-51',
    accountNumber: '****4291',
  },
  {
    id: 'Savings Vault',
    label: 'Savings Vault',
    mask: '**** 8832',
    openingBalance: 7218.00,
    color: 'var(--blue)',
    Icon: PiggyBank,
    sortCode: '20-44-52',
    accountNumber: '****8832',
  },
  {
    id: 'Credit Card',
    label: 'Credit Card',
    mask: '**** 1004',
    openingBalance: 5306.00,
    color: 'var(--magenta)',
    Icon: CreditCard,
    sortCode: '20-44-53',
    accountNumber: '****1004',
  },
];

// Available periods derived from transaction data
const PERIODS = [
  { value: '2026-05', label: 'May 2026' },
  { value: '2026-04', label: 'April 2026' },
  { value: '2026-03', label: 'March 2026' },
];

// ─── Category colour dots ──────────────────────────────────────────────────
const CAT_COLORS = {
  Income: 'var(--green)',
  Transfer: 'var(--blue)',
  Groceries: 'var(--teal)',
  Bills: 'var(--orange)',
  Entertainment: 'var(--magenta)',
  Shopping: 'var(--yellow)',
  Travel: 'var(--blue)',
  Dining: 'var(--orange)',
  Health: 'var(--green)',
  Personal: 'var(--text-muted)',
};

// ─── CSV export ────────────────────────────────────────────────────────────
function downloadCSV(rows, account, period) {
  const headers = ['Date', 'Description', 'Category', 'Account', 'Amount (£)', 'Status'];
  const lines = [
    headers.join(','),
    ...rows.map(t =>
      [
        t.date,
        `"${t.description}"`,
        t.category,
        t.account,
        t.amount.toFixed(2),
        t.status,
      ].join(',')
    ),
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sanctum-statement-${account.id.replace(' ', '-').toLowerCase()}-${period}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Print trigger ─────────────────────────────────────────────────────────
function triggerPrint() {
  window.print();
}

// ─── Main component ────────────────────────────────────────────────────────
const StatementsDocuments = () => {
  const [activeAccountId, setActiveAccountId] = useState('combined');
  const [activePeriod, setActivePeriod] = useState('2026-05');
  const [periodOpen, setPeriodOpen] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(null); // 'csv' | 'pdf' | null

  const account = ACCOUNTS.find(a => a.id === activeAccountId);
  const period = PERIODS.find(p => p.value === activePeriod);

  // Filter transactions
  const filtered = useMemo(() => {
    return transactions
      .filter(t => {
        const inPeriod = t.date.startsWith(activePeriod);
        const inAccount =
          activeAccountId === 'combined' ? true : t.account === activeAccountId;
        return inPeriod && inAccount;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [activeAccountId, activePeriod]);

  // Running balance
  const moneyIn  = filtered.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const moneyOut = filtered.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0);
  const openingBalance = account.openingBalance;
  const closingBalance = openingBalance + moneyIn + moneyOut;

  // Running balance per row (chronological then reverse for display)
  const chronological = [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date));
  let runningBal = openingBalance;
  const balanceMap = {};
  chronological.forEach(t => {
    runningBal += t.amount;
    balanceMap[t.id] = runningBal;
  });

  const handleCSV = () => {
    downloadCSV(filtered, account, activePeriod);
    setExportSuccess('csv');
    setTimeout(() => setExportSuccess(null), 2200);
  };

  const handlePrint = () => {
    triggerPrint();
    setExportSuccess('pdf');
    setTimeout(() => setExportSuccess(null), 2200);
  };

  return (
    <>
      {/* ── Print stylesheet injected globally ── */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #statement-printable,
          #statement-printable * { visibility: visible !important; }
          #statement-printable {
            position: fixed !important;
            inset: 0 !important;
            background: white !important;
            color: black !important;
            font-family: 'Arial', sans-serif !important;
            padding: 40px 48px !important;
            font-size: 12px !important;
          }
          .no-print { display: none !important; }
          .print-table { width: 100%; border-collapse: collapse; }
          .print-table th, .print-table td {
            border-bottom: 1px solid #ddd;
            padding: 8px 4px;
            text-align: left;
          }
          .print-table thead { border-bottom: 2px solid black; }
          .print-amount-positive { color: #16a34a !important; }
          .print-amount-negative { color: #dc2626 !important; }
        }
      `}</style>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
      >

        {/* ── Account tabs ───────────────────────────────────────────────── */}
        <motion.div variants={fadeUp} className="no-print" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {ACCOUNTS.map(acc => {
            const isActive = acc.id === activeAccountId;
            return (
              <motion.button
                key={acc.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveAccountId(acc.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 18px', borderRadius: '10px', cursor: 'pointer',
                  fontSize: '13px', fontWeight: isActive ? '700' : '500',
                  border: `1.5px solid ${isActive ? acc.color : 'var(--border)'}`,
                  backgroundColor: isActive
                    ? `color-mix(in srgb, ${acc.color} 14%, var(--bg-card))`
                    : 'var(--bg-card)',
                  color: isActive ? acc.color : 'var(--text-secondary)',
                  transition: 'all 0.2s',
                }}
              >
                <acc.Icon size={15} />
                {acc.label}
                <span style={{ fontSize: '11px', opacity: 0.7 }}>{acc.mask}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Statement header card ────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          id="statement-printable"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '14px',
            border: '1px solid var(--border)',
            overflow: 'hidden',
          }}
        >
          {/* Header banner */}
          <div style={{
            background: `linear-gradient(135deg, var(--sidebar) 0%, color-mix(in srgb, ${account.color} 18%, var(--sidebar)) 100%)`,
            borderBottom: '1px solid var(--border)',
            padding: '28px 32px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '2px', color: account.color, marginBottom: '6px' }}>
                BANK STATEMENT · DWK BANK
              </div>
              <div style={{ fontSize: '22px', fontWeight: '800', marginBottom: '4px' }}>
                {account.label}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {account.accountNumber} · Sort Code {account.sortCode}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                Sarah Jenkins · 14 Harwick Lane, London, EC1A 4PR
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Statement Period</div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: account.color }}>
                {period?.label}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px' }}>
                Generated {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>

          {/* ── Toolbar: period picker + export ─── */}
          <div className="no-print" style={{
            padding: '16px 32px',
            borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
          }}>
            {/* Period picker */}
            <div style={{ position: 'relative' }}>
              <motion.button
                whileHover={{ borderColor: account.color }}
                onClick={() => setPeriodOpen(v => !v)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '9px 16px', borderRadius: '8px', cursor: 'pointer',
                  backgroundColor: 'var(--bg-card-lt)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)', fontSize: '13px', fontWeight: '500',
                  transition: 'border-color 0.2s',
                }}
              >
                <FileText size={14} />
                {period?.label}
                <motion.div animate={{ rotate: periodOpen ? 180 : 0 }}>
                  <ChevronDown size={14} />
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {periodOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    style={{
                      position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 50,
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: '10px', overflow: 'hidden', minWidth: '160px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    }}
                  >
                    {PERIODS.map(p => (
                      <div
                        key={p.value}
                        onClick={() => { setActivePeriod(p.value); setPeriodOpen(false); }}
                        style={{
                          padding: '11px 16px', cursor: 'pointer', fontSize: '13px',
                          backgroundColor: p.value === activePeriod ? `color-mix(in srgb, ${account.color} 12%, var(--bg-card))` : 'transparent',
                          color: p.value === activePeriod ? account.color : 'var(--text-secondary)',
                          transition: 'background-color 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-card-lt)'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = p.value === activePeriod ? `color-mix(in srgb, ${account.color} 12%, var(--bg-card))` : 'transparent'}
                      >
                        {p.label}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Export buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <motion.button
                whileHover={{ scale: 1.03, borderColor: 'var(--text-secondary)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCSV}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '9px 18px', borderRadius: '8px', cursor: 'pointer',
                  backgroundColor: 'var(--bg-card-lt)',
                  border: '1px solid var(--border)',
                  color: exportSuccess === 'csv' ? 'var(--green)' : 'var(--text-secondary)',
                  fontSize: '13px', fontWeight: '600',
                  transition: 'all 0.2s',
                }}
              >
                {exportSuccess === 'csv'
                  ? <><CheckCircle2 size={14} /> Downloaded!</>
                  : <><Download size={14} /> CSV</>}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handlePrint}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '9px 18px', borderRadius: '8px', cursor: 'pointer',
                  backgroundColor: exportSuccess === 'pdf' ? 'var(--green)' : account.color,
                  border: 'none',
                  color: 'var(--bg-primary)',
                  fontSize: '13px', fontWeight: '700',
                  transition: 'background-color 0.25s',
                }}
              >
                {exportSuccess === 'pdf'
                  ? <><CheckCircle2 size={14} /> Sent to Printer!</>
                  : <><Printer size={14} /> Export PDF</>}
              </motion.button>
            </div>
          </div>

          {/* ── Summary strip ─────────────────────────────────────────────── */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            borderBottom: '1px solid var(--border)',
          }}>
            {[
              { label: 'Opening Balance', value: `£${openingBalance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`, color: 'var(--text-primary)' },
              { label: 'Money In',  value: `+£${moneyIn.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`,  color: 'var(--green)' },
              { label: 'Money Out', value: `-£${Math.abs(moneyOut).toLocaleString('en-GB', { minimumFractionDigits: 2 })}`, color: 'var(--red)' },
              { label: 'Closing Balance', value: `£${closingBalance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`, color: account.color },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: '20px 24px',
                  borderRight: i < 3 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', letterSpacing: '0.5px' }}>
                  {s.label}
                </div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: s.color }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* ── Transaction table ─────────────────────────────────────────── */}
          <div style={{ overflowX: 'auto' }}>
            {/* Table header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr 120px 100px 120px 110px',
              padding: '12px 32px',
              backgroundColor: 'var(--bg-card-lt)',
              borderBottom: '1px solid var(--border)',
              fontSize: '11px', fontWeight: '700',
              color: 'var(--text-muted)', letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              <div>Date</div>
              <div>Description</div>
              <div>Category</div>
              {activeAccountId === 'combined' && <div>Account</div>}
              {activeAccountId !== 'combined' && <div>Status</div>}
              <div style={{ textAlign: 'right' }}>Amount</div>
              <div style={{ textAlign: 'right' }}>Balance</div>
            </div>

            {/* Rows */}
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              {filtered.length === 0 ? (
                <div style={{ padding: '48px 32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
                  No transactions found for this period.
                </div>
              ) : (
                filtered.map((tx, idx) => {
                  const isPos = tx.amount > 0;
                  const catColor = CAT_COLORS[tx.category] || 'var(--text-muted)';
                  return (
                    <motion.div
                      key={tx.id}
                      variants={staggerItem}
                      whileHover={{ backgroundColor: 'color-mix(in srgb, var(--teal) 5%, var(--bg-card))' }}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '120px 1fr 120px 100px 120px 110px',
                        padding: '14px 32px',
                        borderBottom: idx < filtered.length - 1 ? '1px solid color-mix(in srgb, var(--border) 50%, transparent)' : 'none',
                        alignItems: 'center',
                        transition: 'background-color 0.15s',
                      }}
                    >
                      {/* Date */}
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {new Date(tx.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                      </div>

                      {/* Description */}
                      <div style={{ fontSize: '13px', fontWeight: '500', paddingRight: '12px' }}>
                        {tx.description}
                      </div>

                      {/* Category */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: catColor, flexShrink: 0 }} />
                        {tx.category}
                      </div>

                      {/* Account or Status */}
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {activeAccountId === 'combined' ? tx.account.replace(' Account', '').replace(' Vault', ' V.') : (
                          <span style={{
                            padding: '3px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: '600',
                            backgroundColor: tx.status === 'Pending' ? 'color-mix(in srgb, var(--orange) 15%, transparent)' : 'color-mix(in srgb, var(--green) 12%, transparent)',
                            color: tx.status === 'Pending' ? 'var(--orange)' : 'var(--green)',
                          }}>
                            {tx.status}
                          </span>
                        )}
                      </div>

                      {/* Amount */}
                      <div style={{
                        textAlign: 'right', fontSize: '14px', fontWeight: '700',
                        color: isPos ? 'var(--green)' : 'var(--text-primary)',
                        fontVariantNumeric: 'tabular-nums',
                      }}>
                        {isPos ? '+' : '−'}£{Math.abs(tx.amount).toFixed(2)}
                      </div>

                      {/* Running balance */}
                      <div style={{
                        textAlign: 'right', fontSize: '12px', color: 'var(--text-muted)',
                        fontVariantNumeric: 'tabular-nums',
                      }}>
                        £{balanceMap[tx.id]?.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>

            {/* Closing balance footer row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr 120px 100px 120px 110px',
              padding: '16px 32px',
              backgroundColor: 'var(--bg-card-lt)',
              borderTop: '2px solid var(--border)',
              alignItems: 'center',
            }}>
              <div />
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>
                CLOSING BALANCE
              </div>
              <div /><div />
              <div />
              <div style={{
                textAlign: 'right', fontSize: '16px', fontWeight: '800',
                color: account.color, fontVariantNumeric: 'tabular-nums',
              }}>
                £{closingBalance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* ── Footer notice ──────────────────────────────────────────────── */}
          <div style={{
            padding: '16px 32px',
            borderTop: '1px solid var(--border)',
            fontSize: '11px', color: 'var(--text-muted)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span>DWK Bank plc · Authorised by the Prudential Regulation Authority · FCA Ref 123456</span>
            <span>Statement ref: STM-{activePeriod.replace('-', '')}-{activeAccountId === 'combined' ? 'ALL' : account.accountNumber.replace('*', '').slice(-4)}</span>
          </div>
        </motion.div>

      </motion.div>
    </>
  );
};

export default StatementsDocuments;
