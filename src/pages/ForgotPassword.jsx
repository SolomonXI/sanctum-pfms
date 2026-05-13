import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('email'); // 'email' | 'sms'
  const [value, setValue] = useState('');
  const [step, setStep] = useState('form'); // 'form' | 'sent'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    setStep('sent');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Left branding panel */}
      <div style={{
        width: '620px', backgroundColor: 'var(--sidebar)', borderRight: '1px solid var(--gold)',
        padding: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center'
      }}>
        <div style={{ width: '48px', height: '48px', border: '2px solid var(--teal)', borderRadius: '50%', marginBottom: '24px' }}></div>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'var(--teal)', letterSpacing: '2px', marginBottom: '24px' }}>SANCTUM</h1>
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
        <div style={{ marginTop: 'auto', color: 'var(--text-muted)', fontSize: '11px' }}>DWK Bank · Octane Strategies · CIB Level 4</div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{
          width: '440px', backgroundColor: 'var(--bg-card)', borderRadius: '16px',
          border: '1px solid var(--gold)', padding: '40px'
        }}>
          {step === 'form' ? (
            <>
              <button
                onClick={() => navigate('/')}
                style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', background: 'transparent', border: 'none' }}
              >
                ← Back to Login
              </button>

              <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Reset your password</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '32px' }}>
                Choose how you'd like to receive your reset link.
              </p>

              {/* Method selector */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                {[
                  { id: 'email', label: '✉ Email' },
                  { id: 'sms', label: '📱 SMS' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { setMethod(opt.id); setValue(''); }}
                    style={{
                      flex: 1, padding: '12px', borderRadius: '10px', fontWeight: '600', fontSize: '14px',
                      cursor: 'pointer', transition: 'all 0.15s',
                      backgroundColor: method === opt.id ? 'color-mix(in srgb, var(--teal) 15%, transparent)' : 'var(--bg-card-lt)',
                      color: method === opt.id ? 'var(--teal)' : 'var(--text-secondary)',
                      border: method === opt.id ? '2px solid var(--teal)' : '2px solid transparent'
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {method === 'email' ? (
                  <div>
                    <label style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={value}
                      onChange={e => setValue(e.target.value)}
                      placeholder="Enter your registered email"
                      style={{ width: '100%', padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-card-lt)', border: '1px solid var(--border)', color: 'white', fontSize: '14px' }}
                    />
                  </div>
                ) : (
                  <div>
                    <label style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={value}
                      onChange={e => setValue(e.target.value)}
                      placeholder="+44 7700 000000"
                      style={{ width: '100%', padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-card-lt)', border: '1px solid var(--border)', color: 'white', fontSize: '14px' }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  style={{ width: '100%', padding: '16px', borderRadius: '24px', backgroundColor: 'var(--teal)', color: 'var(--bg-primary)', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}
                >
                  Send Reset {method === 'email' ? 'Link' : 'Code'}
                </button>
              </form>
            </>
          ) : (
            /* Success state */
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'color-mix(in srgb, var(--green) 15%, transparent)', border: '2px solid var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
                ✓
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: '700' }}>
                {method === 'email' ? 'Reset link sent!' : 'Code sent!'}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6' }}>
                {method === 'email'
                  ? <>We sent a password reset link to <strong style={{ color: 'var(--teal)' }}>{value}</strong>. Check your inbox and follow the instructions.</>
                  : <>We sent a 6-digit reset code to <strong style={{ color: 'var(--teal)' }}>{value}</strong>. It will expire in 10 minutes.</>
                }
              </p>
              <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border)', margin: '8px 0' }}></div>
              <button
                onClick={() => navigate('/')}
                style={{ width: '100%', padding: '14px', borderRadius: '24px', backgroundColor: 'var(--teal)', color: 'var(--bg-primary)', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}
              >
                Back to Login
              </button>
              <button
                onClick={() => { setStep('form'); setValue(''); }}
                style={{ color: 'var(--text-muted)', fontSize: '12px', cursor: 'pointer', background: 'transparent', border: 'none' }}
              >
                Didn't receive it? Try again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
