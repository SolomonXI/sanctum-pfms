import React from 'react';

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
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr 
              key={rowIdx} 
              onClick={() => onRowClick && onRowClick(row.raw || row)}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
