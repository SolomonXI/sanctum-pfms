import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Badge from '../../components/Badge';
import { transactions } from '../../data/transactions';
import { staggerContainer, staggerItem, scaleIn, backdrop, modal, slideInLeft, slideInRight, fadeUp } from '../../utils/animations';

const Overlay = ({ onClose, children }) => (
  <motion.div 
    variants={backdrop}
    initial="hidden"
    animate="visible"
    exit="exit"
    onClick={onClose} 
    style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}
  >
    <motion.div 
      variants={modal}
      onClick={e => e.stopPropagation()} 
      style={{
        backgroundColor: 'var(--bg-card)', borderRadius: '16px', padding: '32px',
        width: '480px', border: '1px solid var(--border)'
      }}
    >
      {children}
    </motion.div>
  </motion.div>
);

const Home = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setMessage('');
      setShowMessage(false);
    }, 1800);
  };

  return (
    <motion.div 
      variants={staggerContainer} 
      initial="hidden" 
      animate="visible" 
      style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}
    >
      {/* Balance card */}
      <motion.div 
        variants={fadeUp}
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '32px',
          borderTop: '4px solid color-mix(in srgb, var(--teal) 30%, transparent)'
        }}
      >
        <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px' }}>Account Balance</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            style={{ fontSize: '36px', fontWeight: '700' }}
          >
            £ 24,830.00
          </motion.div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>
            <motion.div 
              animate={{ opacity: [1, 0.5, 1] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--green)' }}
            ></motion.div>
            Available · Updated just now
          </div>
        </div>
      </motion.div>

      {/* Three columns */}
      <div style={{ display: 'flex', gap: '24px', flex: 1 }}>
        {/* Recent Transactions */}
        <motion.div variants={slideInLeft} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Recent Transactions</h3>
          <motion.div variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {transactions.slice(0, 5).map((tx, idx) => (
              <motion.div 
                key={tx.id} 
                variants={staggerItem}
                whileHover={{ scale: 1.02, backgroundColor: 'color-mix(in srgb, var(--teal) 10%, var(--bg-card-lt))' }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-card-lt)', padding: '16px', borderRadius: '8px', cursor: 'pointer' }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '500' }}>{tx.description}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{tx.category}</div>
                </div>
                <div style={{ fontWeight: '600', color: tx.amount > 0 ? 'var(--green)' : 'white' }}>
                  {tx.amount > 0 ? '+' : ''}£{Math.abs(tx.amount).toFixed(2)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* All Accounts */}
        <motion.div variants={fadeUp} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600' }}>All Accounts</h3>
          <motion.div variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { name: 'Current Account', mask: '**** 4291', balance: '£ 12,430.00', color: 'var(--teal)' },
              { name: 'Savings Vault', mask: '**** 8832', balance: '£ 8,500.00', color: 'var(--blue)' },
              { name: 'Credit Card', mask: '**** 1004', balance: '£ 3,900.00', color: 'var(--magenta)' }
            ].map((acc, idx) => (
              <motion.div 
                key={idx} 
                variants={staggerItem}
                whileHover={{ y: -4, boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600' }}>{acc.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{acc.mask}</div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <div style={{ fontSize: '18px', fontWeight: '700' }}>{acc.balance}</div>
                  <Badge label="Active" color={acc.color} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Financial Advisor */}
        <motion.div variants={slideInRight} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Financial Adviser</h3>
          <motion.div 
            whileHover={{ borderColor: 'var(--teal)' }}
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', padding: '24px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px', transition: 'border-color 0.3s' }}
          >
            <div style={{ position: 'relative' }}>
              <motion.div 
                variants={scaleIn}
                style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '700' }}
              >
                DC
              </motion.div>
              <div style={{ position: 'absolute', bottom: '4px', right: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--green)', border: '2px solid var(--bg-card)' }}></div>
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '600' }}>David Chen</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Senior Wealth Adviser</div>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Next meeting: <span style={{ color: 'var(--teal)' }}>18 May 2026</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMessage(true)}
              style={{ width: '100%', padding: '12px', borderRadius: '24px', backgroundColor: 'var(--teal)', color: 'var(--bg-primary)', fontWeight: '600', cursor: 'pointer', border: 'none' }}
            >
              Message Adviser
            </motion.button>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Risk Profile: Moderate</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Message Modal */}
      <AnimatePresence>
        {showMessage && (
          <Overlay onClose={() => { setShowMessage(false); setMessage(''); setSent(false); }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', flexShrink: 0 }}>DC</div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '16px' }}>David Chen</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Senior Wealth Adviser · Online</div>
              </div>
            </div>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type your message to David..."
              style={{ width: '100%', height: '140px', padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-card-lt)', border: '1px solid var(--border)', color: 'white', resize: 'none', marginBottom: '16px', fontSize: '14px', outline: 'none' }}
            />
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <motion.button 
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                onClick={() => setShowMessage(false)} 
                style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer', background: 'transparent' }}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                style={{ padding: '10px 24px', borderRadius: '8px', backgroundColor: sent ? 'var(--green)' : 'var(--teal)', color: 'var(--bg-primary)', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s', minWidth: '130px', border: 'none' }}
              >
                {sent ? '✓ Message Sent!' : 'Send Message'}
              </motion.button>
            </div>
          </Overlay>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;
