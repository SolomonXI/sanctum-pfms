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
        { label: 'Team Size', value: '5 Advisers' }
      ]
    },
    {
      name: 'KPI Thresholds',
      description: 'Set performance targets for your team.',
      fields: [
        { label: 'KPI Target', value: '90%' },
        { label: 'Minimum Client Rating', value: '4.0 / 5.0' },
        { label: 'SLA Response Time', value: '24 Hours' }
      ]
    },
    {
      name: 'Alert Preferences',
      description: 'Configure threshold rules for automated team alerts.',
      fields: [
        { label: 'Alert Threshold', value: 'Medium & High Only' },
        { label: 'Daily Digest', value: 'Enabled (9:00 AM)' }
      ]
    },
    {
      name: 'Compliance Config',
      description: 'Manage regulatory compliance settings.',
      fields: [
        { label: 'Review Cycle', value: 'Quarterly' },
        { label: 'Automated Lockout', value: 'After 3 missed trainings' }
      ]
    },
    {
      name: 'Data Export',
      description: 'Export team performance and client data.',
      fields: [
        { label: 'Format', value: 'CSV / PDF' },
        { label: 'Scheduled Reports', value: 'End of Month' }
      ]
    },
    {
      name: 'Integrations',
      description: 'Connect third-party analytics and HR tools.',
      fields: [
        { label: 'HR System', value: 'Workday (Connected)' },
        { label: 'Analytics', value: 'Tableau (Connected)' }
      ]
    },
    {
      name: 'Security',
      description: 'Manage admin access and security rules.',
      fields: [
        { label: 'Admin Password', value: '', type: 'password' },
        { label: '2FA Required for Team', value: 'Enforced' }
      ]
    }
  ];

  return <SettingsLayout tabs={tabs} />;
};

export default TMSettings;
