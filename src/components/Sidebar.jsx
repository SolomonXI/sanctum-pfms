import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChevronDown, ChevronRight, LogOut } from 'lucide-react';
import logo from '../assets/logo.png';

const Sidebar = () => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (label, e) => {
    e.stopPropagation();
    setExpanded(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const navItems = {
    customer: [
      { path: '/customer/home', label: 'Dashboard' },
      { path: '/customer/transactions', label: 'Transaction history' },
      { path: '/customer/statistics', label: 'Statistics' },
      {
        path: '#',
        label: 'Account & Preferences',
        subItems: [
          { path: '/customer/settings', label: 'Settings' },
          { path: '/customer/documents', label: 'Documents & Statements' },
          { path: '/customer/support', label: 'Help & Support' }
        ]
      }
    ],
    fa: [
      { path: '/fa/dashboard', label: 'FA Dashboard' },
      { path: '/fa/scheduling', label: 'Scheduling' },
      { path: '/fa/clients', label: 'Client Investment' },
      {
        path: '#',
        label: 'Tools & Reports',
        subItems: [
          { path: '/fa/reports', label: 'Report Builder' },
          { path: '/fa/market-analysis', label: 'Market Analysis' }
        ]
      }
    ],
    tm: [
      { path: '/tm/dashboard', label: 'Overview Dashboard' },
      { path: '/tm/team', label: 'Team Tab' },
      { path: '/tm/issues', label: 'Issues & Requests' },
      { path: '/tm/settings', label: 'Settings' }
    ]
  };

  const items = navItems[role] || [];

  return (
    <aside style={{
      width: '260px',
      height: '100%',
      backgroundColor: 'var(--sidebar)',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid var(--border)'
    }}>
      {/* Logo header */}
      <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src={logo} alt="Sanctum" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
        <span style={{ fontSize: '16px', fontWeight: '700', letterSpacing: '2px', color: 'var(--teal)' }}>SANCTUM</span>
      </div>

      {/* Nav items */}
      <div style={{ padding: '32px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
        {items.map(item => {
          const isActive = item.path !== '#' && location.pathname.startsWith(item.path);
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isExpanded = expanded[item.label];

          return (
            <div key={item.label}>
              <div
                onClick={(e) => {
                  if (hasSubItems) toggleExpand(item.label, e);
                  else navigate(item.path);
                }}
                style={{
                  padding: '12px 16px', borderRadius: '8px', cursor: 'pointer',
                  backgroundColor: isActive ? 'color-mix(in srgb, var(--teal) 15%, transparent)' : 'transparent',
                  color: isActive ? 'var(--teal)' : 'var(--text-secondary)',
                  fontWeight: isActive ? '600' : '500',
                  borderLeft: isActive ? '4px solid var(--teal)' : '4px solid transparent',
                  transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}
              >
                {item.label}
                {hasSubItems && (isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
              </div>
              {hasSubItems && isExpanded && (
                <div style={{ paddingLeft: '16px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {item.subItems.map(sub => {
                    const isSubActive = location.pathname.startsWith(sub.path);
                    return (
                      <div
                        key={sub.path}
                        onClick={() => navigate(sub.path)}
                        style={{
                          padding: '10px 16px', borderRadius: '8px', cursor: 'pointer',
                          color: isSubActive ? 'var(--teal)' : 'var(--text-muted)',
                          fontWeight: isSubActive ? '600' : '400',
                          backgroundColor: isSubActive ? 'color-mix(in srgb, var(--teal) 10%, transparent)' : 'transparent',
                          transition: 'all 0.2s'
                        }}
                      >
                        {sub.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Logout — bottom of sidebar, only here */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)' }}>
        <button
          onClick={logout}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            width: '100%', padding: '12px 16px', borderRadius: '8px',
            backgroundColor: 'color-mix(in srgb, var(--red) 10%, transparent)',
            color: 'var(--red)', fontWeight: '600', fontSize: '14px',
            border: '1px solid color-mix(in srgb, var(--red) 30%, transparent)',
            cursor: 'pointer', transition: 'all 0.2s'
          }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
