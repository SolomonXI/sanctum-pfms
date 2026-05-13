import React from 'react';

const Badge = ({ label, color }) => {
  return (
    <span style={{
      backgroundColor: `color-mix(in srgb, ${color} 18%, transparent)`,
      color: color,
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: '600',
      display: 'inline-block'
    }}>
      {label}
    </span>
  );
};

export default Badge;
