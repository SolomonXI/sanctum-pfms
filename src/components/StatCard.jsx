import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, delta, color = 'var(--teal)', icon }) => {
  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: '12px',
        padding: '24px',
        borderTop: `4px solid ${color}`,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: '500' }}>{label}</span>
        {icon && <span style={{ color }}>{icon}</span>}
      </div>
      <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--text-primary)' }}>
        {value}
      </div>
      {delta && (
        <div style={{ fontSize: '12px', color: color, fontWeight: '500' }}>
          {delta}
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;
