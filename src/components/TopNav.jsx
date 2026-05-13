import React from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const TopNav = ({ pageTitle, toggleSidebar }) => {
  const { user } = useAuth();

  let avatarColor = 'var(--teal)';
  if (user?.role === 'fa') avatarColor = 'var(--blue)';
  if (user?.role === 'tm') avatarColor = 'var(--gold)';

  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 32px', borderBottom: '1px solid var(--border)',
      backgroundColor: 'var(--bg-primary)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Menu size={24} color="var(--text-secondary)" style={{ cursor: 'pointer' }} onClick={toggleSidebar} />
        <h1 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>{pageTitle}</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={logo} alt="Sanctum" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
          <div style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '2px', color: 'var(--teal)' }}>SANCTUM</div>
        </div>
        {user && (
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            backgroundColor: avatarColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--bg-primary)', fontWeight: '700', fontSize: '14px'
          }}>
            {user.initials}
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNav;
