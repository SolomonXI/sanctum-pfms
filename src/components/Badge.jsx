import React from 'react';
import { motion } from 'framer-motion';
import { popIn } from '../utils/animations';

const Badge = ({ label, color }) => {
  return (
    <motion.span
      variants={popIn}
      initial="hidden"
      animate="visible"
      style={{
        backgroundColor: `color-mix(in srgb, ${color} 18%, transparent)`,
        color: color,
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: '600',
        display: 'inline-block'
      }}
    >
      {label}
    </motion.span>
  );
};

export default Badge;
