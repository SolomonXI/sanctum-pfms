import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem, fadeUp, slideInLeft } from '../utils/animations';

// A single editable field row
const FieldRow = ({ field }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(field.value);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCancel = () => {
    setValue(field.value); // revert
    setEditing(false);
  };

  // Toggle fields (ON/OFF)
  if (field.type === 'toggle') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{field.label}</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ flex: 1, backgroundColor: 'var(--bg-card-lt)', padding: '14px 16px', borderRadius: '8px', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '14px' }}>
            {value}
          </div>
          <button
            onClick={() => { setValue(v => v === 'Enabled' ? 'Disabled' : 'Enabled'); setSaved(true); setTimeout(() => setSaved(false), 2000); }}
            style={{ color: saved ? 'var(--green)' : 'var(--teal)', fontWeight: '600', cursor: 'pointer', background: 'transparent', border: 'none', whiteSpace: 'nowrap' }}
          >
            {saved ? '✓ Saved' : (value === 'Enabled' ? 'Turn Off' : 'Turn On')}
          </button>
        </div>
      </div>
    );
  }

  // Password field
  if (field.type === 'password') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{field.label}</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {editing ? (
            <input
              type="password"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Enter new password"
              style={{ flex: 1, padding: '14px 16px', borderRadius: '8px', backgroundColor: 'var(--bg-card-lt)', border: '2px solid var(--teal)', color: 'white', fontSize: '14px' }}
            />
          ) : (
            <div style={{ flex: 1, backgroundColor: 'var(--bg-card-lt)', padding: '14px 16px', borderRadius: '8px', border: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '20px', letterSpacing: '4px' }}>
              ••••••••
            </div>
          )}
          {editing ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={handleCancel} style={{ color: 'var(--text-muted)', fontWeight: '600', cursor: 'pointer', background: 'transparent', border: 'none' }}>Cancel</button>
              <button onClick={handleSave} style={{ color: 'var(--teal)', fontWeight: '600', cursor: 'pointer', background: 'transparent', border: 'none' }}>Save</button>
            </div>
          ) : (
            <button onClick={() => setEditing(true)} style={{ color: saved ? 'var(--green)' : 'var(--teal)', fontWeight: '600', cursor: 'pointer', background: 'transparent', border: 'none', whiteSpace: 'nowrap' }}>
              {saved ? '✓ Updated' : 'Change'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Read-only info fields
  if (field.readonly) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{field.label}</label>
        <div style={{ flex: 1, backgroundColor: 'color-mix(in srgb, var(--text-muted) 8%, transparent)', padding: '14px 16px', borderRadius: '8px', border: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '14px' }}>
          {field.value}
        </div>
      </div>
    );
  }

  // Default editable text
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{field.label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {editing ? (
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            autoFocus
            style={{ flex: 1, padding: '14px 16px', borderRadius: '8px', backgroundColor: 'var(--bg-card-lt)', border: '2px solid var(--teal)', color: 'white', fontSize: '14px' }}
          />
        ) : (
          <div style={{ flex: 1, backgroundColor: 'var(--bg-card-lt)', padding: '14px 16px', borderRadius: '8px', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '14px' }}>
            {value || <span style={{ color: 'var(--text-muted)' }}>—</span>}
          </div>
        )}
        {editing ? (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handleCancel} style={{ color: 'var(--text-muted)', fontWeight: '600', cursor: 'pointer', background: 'transparent', border: 'none' }}>Cancel</button>
            <button onClick={handleSave} style={{ color: 'var(--teal)', fontWeight: '600', cursor: 'pointer', background: 'transparent', border: 'none' }}>Save</button>
          </div>
        ) : (
          <button onClick={() => setEditing(true)} style={{ color: saved ? 'var(--green)' : 'var(--teal)', fontWeight: '600', cursor: 'pointer', background: 'transparent', border: 'none', whiteSpace: 'nowrap' }}>
            {saved ? '✓ Saved' : 'Edit'}
          </button>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────

const SettingsLayout = ({ tabs }) => {
  const [activeTabName, setActiveTabName] = useState(tabs[0].name);
  const [saveFlash, setSaveFlash] = useState(false);
  const activeTab = tabs.find(t => t.name === activeTabName) || tabs[0];

  const handleSaveAll = () => {
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 2000);
  };

  return (
    <div style={{ display: 'flex', gap: '32px', height: '100%' }}>
      {/* Left nav */}
      <motion.div variants={slideInLeft} initial="hidden" animate="visible" style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {tabs.map(tab => (
          <button
            key={tab.name}
            onClick={() => setActiveTabName(tab.name)}
            style={{
              padding: '12px 16px', borderRadius: '8px',
              backgroundColor: activeTabName === tab.name ? 'color-mix(in srgb, var(--teal) 15%, transparent)' : 'transparent',
              color: activeTabName === tab.name ? 'var(--teal)' : 'var(--text-secondary)',
              borderLeft: activeTabName === tab.name ? '4px solid var(--teal)' : '4px solid transparent',
              textAlign: 'left', fontWeight: '600', cursor: 'pointer'
            }}
          >
            {tab.name}
          </button>
        ))}
      </motion.div>

      {/* Right form */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" style={{ flex: 1, backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '32px', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>{activeTab.name}</h2>
        <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '24px' }}>
          {activeTab.description || 'Update your settings and preferences here.'}
        </div>
        <div style={{ height: '1px', backgroundColor: 'var(--border)', marginBottom: '32px' }}></div>

        {/* Fields — each has its own independent edit state */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTabName} 
            variants={staggerContainer} 
            initial="hidden" 
            animate="visible" 
            exit="hidden"
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {activeTab.fields.map((field, idx) => (
              <motion.div key={`${activeTabName}-${idx}`} variants={staggerItem}>
                <FieldRow field={field} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSaveAll}
            style={{
              backgroundColor: saveFlash ? 'var(--green)' : 'var(--teal)',
              color: 'var(--bg-primary)', padding: '12px 24px', borderRadius: '24px',
              fontWeight: '600', width: '180px', cursor: 'pointer', transition: 'background-color 0.2s', border: 'none'
            }}
          >
            {saveFlash ? '✓ Changes Saved!' : 'Save Changes'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsLayout;
