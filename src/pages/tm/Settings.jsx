import React from 'react';
import SettingsLayout from '../../components/SettingsLayout';

const TMSettings = () => {
  const tabs = [
    {
      name: 'Team & Organisation',
      description: 'Manage details for your assigned advisory team.',
      fields: [
        { label: 'Team Name', value: 'Alpha Wealth Management' },
        { label: 'Bank Branch', value: 'London City' },
        { label: 'Team Size', value: '5 Advisers', readonly: true },
        { label: 'Manager Name', value: 'Jordan Okafor' },
        { label: 'Contact Email', value: 'j.okafor@sanctum.com' }
      ]
    },
    {
      name: 'KPI Thresholds',
      description: 'Set performance targets for your team.',
      fields: [
        { label: 'KPI Target (%)', value: '90' },
        { label: 'Minimum Client Rating', value: '4.0' },
        { label: 'SLA Response Time', value: '24 Hours' },
        { label: 'Monthly Review Quota', value: '12 reviews per adviser' }
      ]
    },
    {
      name: 'Alert Preferences',
      description: 'Configure threshold rules for automated team alerts.',
      fields: [
        { label: 'Alert Threshold', value: 'Medium & High Only' },
        { label: 'Daily Digest', value: 'Enabled', type: 'toggle' },
        { label: 'Email Alerts', value: 'Enabled', type: 'toggle' },
        { label: 'SMS Escalation', value: 'Disabled', type: 'toggle' }
      ]
    },
    {
      name: 'Compliance Config',
      description: 'Manage regulatory compliance settings.',
      fields: [
        { label: 'Review Cycle', value: 'Quarterly' },
        { label: 'Automated Lockout', value: 'After 3 missed trainings', readonly: true },
        { label: 'Regulator', value: 'FCA (UK)' },
        { label: 'Compliance Officer', value: 'Linda Wu', readonly: true }
      ]
    },
    {
      name: 'Data Export',
      description: 'Export team performance and client data.',
      fields: [
        { label: 'Export Format', value: 'CSV / PDF' },
        { label: 'Scheduled Reports', value: 'End of Month' },
        { label: 'Export Recipient Email', value: 'j.okafor@sanctum.com' }
      ]
    },
    {
      name: 'Integrations',
      description: 'Connect third-party analytics and HR tools.',
      fields: [
        { label: 'HR System', value: 'Workday (Connected)', readonly: true },
        { label: 'Analytics Platform', value: 'Tableau (Connected)', readonly: true },
        { label: 'API Webhook URL', value: 'https://hooks.sanctum.internal/tm' }
      ]
    },
    {
      name: 'Security',
      description: 'Manage admin access and security rules.',
      fields: [
        { label: 'Admin Password', value: '', type: 'password' },
        { label: '2FA Required for Team', value: 'Enabled', type: 'toggle' },
        { label: 'Session Timeout (mins)', value: '30' }
      ]
    }
  ];

  return <SettingsLayout tabs={tabs} />;
};

export default TMSettings;
