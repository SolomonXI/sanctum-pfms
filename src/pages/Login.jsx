import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('login');
  const [role, setRole] = useState('customer');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(role);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Left panel */}
      <div style={{ 
        width: '620px', 
        backgroundColor: 'var(--sidebar)', 
        borderRight: '1px solid var(--gold)',
        padding: '64px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{ width: '48px', height: '48px', border: '2px solid var(--teal)', borderRadius: '50%', marginBottom: '24px' }}></div>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'var(--teal)', letterSpacing: '2px', marginBottom: '24px' }}>
          SANCTUM
        </h1>
        <div style={{ height: '1px', backgroundColor: 'var(--gold)', marginBottom: '24px', width: '60px' }}></div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '40px' }}>
          Smart finance. Complete oversight.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {['Secure 2FA biometric login', 'Three roles in one platform', 'Real-time financial insights'].map((item, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-primary)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--teal)' }}></div>
              {item}
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 'auto', color: 'var(--text-muted)', fontSize: '11px' }}>
          DWK Bank · Octane Strategies · CIB Level 4
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ 
          width: '420px', 
          backgroundColor: 'var(--bg-card)', 
          borderRadius: '16px', 
          border: '1px solid var(--gold)',
          padding: '40px'
        }}>
          <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', borderBottom: '1px solid var(--border)' }}>
            <button 
              type="button"
              onClick={() => setTab('login')}
              style={{ paddingBottom: '12px', color: tab === 'login' ? 'var(--teal)' : 'var(--text-secondary)', borderBottom: tab === 'login' ? '2px solid var(--teal)' : 'none', fontWeight: '600' }}
            >
              Login
            </button>
            <button 
              type="button"
              onClick={() => setTab('signup')}
              style={{ paddingBottom: '12px', color: tab === 'signup' ? 'var(--teal)' : 'var(--text-secondary)', borderBottom: tab === 'signup' ? '2px solid var(--teal)' : 'none', fontWeight: '600' }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {tab === 'login' ? (
              <>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Welcome back</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Sign in to your Sanctum account</p>
                </div>
                <input type="email" placeholder="Email Address" required style={{ width: '100%', padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-card-lt)', border: '1px solid var(--border)', color: 'white' }} />
                <input type="password" placeholder="Password" required style={{ width: '100%', padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-card-lt)', border: '1px solid var(--border)', color: 'white' }} />
                <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-card-lt)', border: '1px solid var(--border)', color: 'white' }}>
                  <option value="customer">Customer</option>
                  <option value="fa">Financial Adviser</option>
                  <option value="tm">Team Manager</option>
                </select>
                <button type="submit" style={{ width: '100%', padding: '16px', borderRadius: '24px', backgroundColor: 'var(--teal)', color: 'var(--bg-primary)', fontWeight: '700', fontSize: '16px', marginTop: '8px' }}>
                  Sign In
                </button>
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '11px' }}>Biometric login enabled</div>
              </>
            ) : (
              <>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Create your account</h2>
                </div>
                <input type="text" placeholder="Full Name" required style={{ width: '100%', padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-card-lt)', border: '1px solid var(--border)', color: 'white' }} />
                <input type="email" placeholder="Email Address" required style={{ width: '100%', padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-card-lt)', border: '1px solid var(--border)', color: 'white' }} />
                <input type="password" placeholder="Password" required style={{ width: '100%', padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-card-lt)', border: '1px solid var(--border)', color: 'white' }} />
                <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-card-lt)', border: '1px solid var(--border)', color: 'white' }}>
                  <option value="customer">Customer</option>
                  <option value="fa">Financial Adviser</option>
                  <option value="tm">Team Manager</option>
                </select>
                <button type="submit" style={{ width: '100%', padding: '16px', borderRadius: '24px', backgroundColor: 'var(--teal)', color: 'var(--bg-primary)', fontWeight: '700', fontSize: '16px', marginTop: '8px' }}>
                  Create Account
                </button>
              </>
            )}
          </form>
        </div>
        {tab === 'login' && (
          <button
            onClick={() => navigate('/forgot-password')}
            style={{ marginTop: '16px', color: 'var(--teal)', fontSize: '12px', cursor: 'pointer', background: 'transparent', border: 'none', textDecoration: 'underline' }}
          >
            Forgot your password?
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
