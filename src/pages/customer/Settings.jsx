import React from 'react';
import SettingsLayout from '../../components/SettingsLayout';

const CustomerSettings = () => {
  const tabs = [
    {
      name: 'Profile & Account',
      description: 'Update your profile and account details.',
      fields: [
        { label: 'Full Name', value: 'Sarah Jenkins' },
        { label: 'Email Address', value: 'sarah.jenkins@example.com' },
        { label: 'Phone Number', value: '+44 7700 900123' },
        { label: 'Billing Address', value: '14 Mayfair Place, London' },
        { label: 'Account Type', value: 'HNW Premiere' }
      ]
    },
    {
      name: 'Security',
      description: 'Manage your password and authentication methods.',
      fields: [
        { label: 'Password', value: '', type: 'password' },
        { label: 'Two-Factor Authentication (2FA)', value: 'Enabled (Face ID)' },
        { label: 'Recovery Email', value: 's.jenkins.backup@email.com' }
      ]
    },
    {
      name: 'Notifications',
      description: 'Control how and when you receive alerts.',
      fields: [
        { label: 'Push Notifications', value: 'All transactions and alerts' },
        { label: 'Email Summaries', value: 'Weekly Portfolio Update' },
        { label: 'SMS Alerts', value: 'Disabled' }
      ]
    },
    {
      name: 'Linked Devices',
      description: 'View and manage devices authorized to access your account.',
      fields: [
        { label: 'Current Device', value: 'MacBook Pro (London, UK) - Active now' },
        { label: 'Mobile App', value: 'iPhone 15 Pro (London, UK) - Last active 2h ago' }
      ]
    },
    {
      name: 'Card Management',
      description: 'Manage your physical and virtual cards.',
      fields: [
        { label: 'Primary Debit Card', value: 'Visa Infinite ending in 4291 (Active)' },
        { label: 'Credit Card', value: 'Mastercard Black ending in 1004 (Active)' },
        { label: 'Contactless Limit', value: '£100.00' }
      ]
    },
    {
      name: 'Data & Privacy',
      description: 'Manage your data sharing and consent preferences.',
      fields: [
        { label: 'Open Banking Consent', value: 'Active for 3 connected apps' },
        { label: 'Marketing Preferences', value: 'Opted Out' },
        { label: 'Data Export', value: 'Download my account data' }
      ]
    },
    {
      name: 'Help & Support',
      description: 'Get help or contact your financial adviser.',
      fields: [
        { label: 'Assigned Adviser', value: 'David Chen (Senior Wealth Adviser)' },
        { label: 'Priority Support PIN', value: '8294' }
      ]
    }
  ];

  return <SettingsLayout tabs={tabs} />;
};

export default CustomerSettings;
