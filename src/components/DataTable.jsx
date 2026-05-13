import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, tableRow } from '../utils/animations';

const DataTable = ({ columns, rows, onRowClick }) => {
  return (
    <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid var(--border)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--bg-card-lt)', borderBottom: '1px solid var(--border)' }}>
            {columns.map((col, idx) => (
              <th key={idx} style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: '600' }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <motion.tbody
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {rows.map((row, rowIdx) => (
            <motion.tr
              key={rowIdx}
              variants={tableRow}
              onClick={() => onRowClick && onRowClick(row.raw || row)}
              whileHover={{ backgroundColor: 'color-mix(in srgb, var(--teal) 6%, transparent)', transition: { duration: 0.15 } }}
              style={{
                backgroundColor: rowIdx % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-card)',
                borderBottom: '1px solid var(--border)',
                cursor: onRowClick ? 'pointer' : 'default'
              }}
            >
              {(row.cells || Object.values(row)).map((cell, cellIdx) => (
                <td key={cellIdx} style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                  {cell}
                </td>
              ))}
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </div>
  );
};

export default DataTable;
