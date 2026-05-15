import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowLeft, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const TwoFactor = () => {
  const { verify2FA, pendingRole } = useAuth();
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resent, setResent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const inputs = useRef([]);

  // Guard: if someone lands here without a pending role, send back to login
  useEffect(() => {
    if (!pendingRole) navigate('/');
  }, [pendingRole, navigate]);

  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...code];
    next[idx] = val;
    setCode(next);
    setError('');
    if (val && idx < 5) inputs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
    if (e.key === 'Enter') handleVerify();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const next = [...code];
    pasted.split('').forEach((ch, i) => { next[i] = ch; });
    setCode(next);
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerify = () => {
    const full = code.join('');
    if (full.length < 6) {
      setError('Please enter all 6 digits.');
      return;
    }
    setVerifying(true);
    // Simulate a brief verification delay, then accept any code
    setTimeout(() => {
      verify2FA();
    }, 900);
  };

  const handleResend = () => {
    setResent(true);
    setCode(['', '', '', '', '', '']);
    inputs.current[0]?.focus();
    setTimeout(() => setResent(false), 3000);
  };

  const roleLabel = {
    customer: 'Customer',
    fa: 'Financial Adviser',
    tm: 'Team Manager',
  }[pendingRole] ?? '';

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
        <img src={logo} alt="Sanctum Logo" style={{ width: '64px', height: '64px', objectFit: 'contain', marginBottom: '20px' }} />
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'var(--teal)', letterSpacing: '2px', marginBottom: '24px' }}>
          SANCTUM
        </h1>
        <div style={{ height: '1px', backgroundColor: 'var(--gold)', marginBottom: '24px', width: '60px' }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{
            backgroundColor: 'color-mix(in srgb, var(--teal) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--teal) 25%, transparent)',
            borderRadius: '12px',
            padding: '24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <ShieldCheck size={24} color="var(--teal)" />
              <span style={{ fontWeight: '700', fontSize: '16px', color: 'var(--teal)' }}>Two-Factor Authentication</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>
              An additional layer of security ensures only you can access your Sanctum account. Enter the 6-digit code sent to your registered device.
            </p>
          </div>

          {roleLabel && (
            <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
              Signing in as <span style={{ color: 'var(--teal)', fontWeight: '600' }}>{roleLabel}</span>
            </div>
          )}
        </div>

        <div style={{ marginTop: 'auto', color: 'var(--text-muted)', fontSize: '11px' }}>
          DWK Bank · Octane Strategies · CIB Level 4
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            width: '420px',
            backgroundColor: 'var(--bg-card)',
            borderRadius: '16px',
            border: '1px solid var(--gold)',
            padding: '40px',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              style={{
                width: '64px', height: '64px', borderRadius: '50%',
                backgroundColor: 'color-mix(in srgb, var(--teal) 15%, transparent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px'
              }}
            >
              <ShieldCheck size={32} color="var(--teal)" />
            </motion.div>
            <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>Verify your identity</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.5 }}>
              Enter the 6-digit code sent to your registered device. Any code will work for this demo.
            </p>
          </div>

          {/* 6-digit input */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '8px' }}>
            {code.map((digit, idx) => (
              <motion.input
                key={idx}
                ref={el => inputs.current[idx] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(e.target.value, idx)}
                onKeyDown={e => handleKeyDown(e, idx)}
                onPaste={handlePaste}
                whileFocus={{ scale: 1.08, borderColor: 'var(--teal)' }}
                style={{
                  width: '48px',
                  height: '56px',
                  textAlign: 'center',
                  fontSize: '22px',
                  fontWeight: '700',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-card-lt)',
                  border: `2px solid ${digit ? 'var(--teal)' : 'var(--border)'}`,
                  color: 'white',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
            ))}
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ color: 'var(--red)', fontSize: '12px', textAlign: 'center', marginBottom: '8px' }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Resend */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <AnimatePresence mode="wait">
              {resent ? (
                <motion.span
                  key="sent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ color: 'var(--green)', fontSize: '12px' }}
                >
                  ✓ Code resent!
                </motion.span>
              ) : (
                <motion.button
                  key="resend"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleResend}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--text-muted)', fontSize: '12px',
                    display: 'inline-flex', alignItems: 'center', gap: '4px'
                  }}
                >
                  <RefreshCw size={12} /> Resend code
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Verify button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleVerify}
            disabled={verifying}
            style={{
              width: '100%', padding: '16px', borderRadius: '24px',
              backgroundColor: verifying ? 'color-mix(in srgb, var(--teal) 60%, transparent)' : 'var(--teal)',
              color: 'var(--bg-primary)', fontWeight: '700', fontSize: '15px',
              border: 'none', cursor: verifying ? 'default' : 'pointer',
              transition: 'background-color 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}
          >
            {verifying ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                  style={{ width: '18px', height: '18px', border: '2px solid var(--bg-primary)', borderTopColor: 'transparent', borderRadius: '50%' }}
                />
                Verifying…
              </>
            ) : (
              'Verify & Sign In'
            )}
          </motion.button>

          {/* Back */}
          <button
            onClick={() => navigate('/')}
            style={{
              marginTop: '20px', width: '100%', background: 'none', border: 'none',
              color: 'var(--text-muted)', fontSize: '13px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
            }}
          >
            <ArrowLeft size={14} /> Back to login
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default TwoFactor;
