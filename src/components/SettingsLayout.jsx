import React, { useState } from 'react';

const SettingsLayout = ({ tabs }) => {
  const [activeTabName, setActiveTabName] = useState(tabs[0].name);
  const activeTab = tabs.find(t => t.name === activeTabName) || tabs[0];

  return (
    <div style={{ display: 'flex', gap: '32px', height: '100%' }}>
      {/* Left nav */}
      <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {tabs.map(tab => (
          <button 
            key={tab.name}
            onClick={() => setActiveTabName(tab.name)}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: activeTabName === tab.name ? 'color-mix(in srgb, var(--teal) 15%, transparent)' : 'transparent',
              color: activeTabName === tab.name ? 'var(--teal)' : 'var(--text-secondary)',
              borderLeft: activeTabName === tab.name ? '4px solid var(--teal)' : '4px solid transparent',
              textAlign: 'left',
              fontWeight: '600'
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Right form */}
      <div style={{ flex: 1, backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '32px', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>{activeTab.name}</h2>
        <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '24px' }}>
          {activeTab.description || 'Update your settings and preferences here.'}
        </div>
        <div style={{ height: '1px', backgroundColor: 'var(--border)', marginBottom: '32px' }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {activeTab.fields.map((field, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{field.label}</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ flex: 1, backgroundColor: 'var(--bg-card-lt)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                  {field.type === 'password' ? '••••••••' : field.value}
                </div>
                <button style={{ color: 'var(--teal)', fontWeight: '600' }}>Edit</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
          <button style={{ backgroundColor: 'var(--teal)', color: 'var(--bg-primary)', padding: '12px 24px', borderRadius: '24px', fontWeight: '600', width: '160px' }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
