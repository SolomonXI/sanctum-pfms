import React from 'react';
import SettingsLayout from '../../components/SettingsLayout';

const CustomerSettings = () => {
  const tabs = [
    {
      name: 'Profile & Account',
      description: 'Update your profile and personal account details.',
      fields: [
        { label: 'Full Name', value: 'Sarah Jenkins' },
        { label: 'Email Address', value: 'sarah.jenkins@example.com' },
        { label: 'Phone Number', value: '+44 7700 900123' },
        { label: 'Billing Address', value: '14 Mayfair Place, London' },
        { label: 'Account Type', value: 'HNW Premiere', readonly: true }
      ]
    },
    {
      name: 'Security',
      description: 'Manage your password and authentication methods.',
      fields: [
        { label: 'Current Password', value: '', type: 'password' },
        { label: 'New Password', value: '', type: 'password' },
        { label: 'Two-Factor Authentication (2FA)', value: 'Enabled', type: 'toggle' },
        { label: 'Recovery Email', value: 's.jenkins.backup@email.com' }
      ]
    },
    {
      name: 'Notifications',
      description: 'Control how and when you receive alerts.',
      fields: [
        { label: 'Push Notifications', value: 'Enabled', type: 'toggle' },
        { label: 'Email Summaries', value: 'Weekly Portfolio Update' },
        { label: 'SMS Alerts', value: 'Disabled', type: 'toggle' },
        { label: 'Marketing Emails', value: 'Disabled', type: 'toggle' }
      ]
    },
    {
      name: 'Linked Devices',
      description: 'View and manage devices authorised to access your account.',
      fields: [
        { label: 'MacBook Pro (London, UK)', value: 'Active now', readonly: true },
        { label: 'iPhone 15 Pro (London, UK)', value: 'Last active 2h ago', readonly: true },
        { label: 'Trusted Device Limit', value: '5 devices' }
      ]
    },
    {
      name: 'Card Management',
      description: 'Manage your physical and virtual cards.',
      fields: [
        { label: 'Primary Debit Card', value: 'Visa Infinite •••• 4291', readonly: true },
        { label: 'Credit Card', value: 'Mastercard Black •••• 1004', readonly: true },
        { label: 'Contactless Limit', value: '£100.00' },
        { label: 'Online Payments', value: 'Enabled', type: 'toggle' },
        { label: 'International Transactions', value: 'Enabled', type: 'toggle' }
      ]
    },
    {
      name: 'Data & Privacy',
      description: 'Manage your data sharing and consent preferences.',
      fields: [
        { label: 'Open Banking Consent', value: 'Active — 3 connected apps', readonly: true },
        { label: 'Marketing Preferences', value: 'Disabled', type: 'toggle' },
        { label: 'Analytics Sharing', value: 'Enabled', type: 'toggle' },
        { label: 'Data Export Email', value: 'sarah.jenkins@example.com' }
      ]
    },
    {
      name: 'Help & Support',
      description: 'Get help or contact your financial adviser.',
      fields: [
        { label: 'Assigned Adviser', value: 'David Chen (Senior Wealth Adviser)', readonly: true },
        { label: 'Priority Support PIN', value: '8294' },
        { label: 'Preferred Contact Method', value: 'Email' },
        { label: 'Complaint Reference', value: 'No open complaints', readonly: true }
      ]
    }
  ];

  return <SettingsLayout tabs={tabs} />;
};

export default CustomerSettings;
