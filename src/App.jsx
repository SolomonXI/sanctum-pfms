import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Customer
import CustomerHome from './pages/customer/Home';
import TransactionHistory from './pages/customer/TransactionHistory';
import Statistics from './pages/customer/Statistics';
import CustomerSettings from './pages/customer/Settings';

// FA
import FADashboard from './pages/fa/Dashboard';
import Scheduling from './pages/fa/Scheduling';
import ClientInvestment from './pages/fa/ClientInvestment';
import ReportBuilder from './pages/fa/ReportBuilder';
import MarketAnalysis from './pages/fa/MarketAnalysis';

// TM
import OverviewDashboard from './pages/tm/OverviewDashboard';
import TeamTab from './pages/tm/TeamTab';
import MemberDetail from './pages/tm/MemberDetail';
import IssuesRequests from './pages/tm/IssuesRequests';
import TMSettings from './pages/tm/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Customer Routes */}
      <Route element={<ProtectedRoute role="customer" />}>
        <Route element={<Layout pageTitle="Dashboard" />}>
          <Route path="/customer/home" element={<CustomerHome />} />
        </Route>
        <Route element={<Layout pageTitle="Transaction History" />}>
          <Route path="/customer/transactions" element={<TransactionHistory />} />
        </Route>
        <Route element={<Layout pageTitle="Statistics" />}>
          <Route path="/customer/statistics" element={<Statistics />} />
        </Route>
        <Route element={<Layout pageTitle="Settings" />}>
          <Route path="/customer/settings" element={<CustomerSettings />} />
        </Route>
      </Route>

      {/* FA Routes */}
      <Route element={<ProtectedRoute role="fa" />}>
        <Route element={<Layout pageTitle="FA Dashboard" />}>
          <Route path="/fa/dashboard" element={<FADashboard />} />
        </Route>
        <Route element={<Layout pageTitle="Scheduling" />}>
          <Route path="/fa/scheduling" element={<Scheduling />} />
        </Route>
        <Route element={<Layout pageTitle="Client Investment" />}>
          <Route path="/fa/clients" element={<ClientInvestment />} />
        </Route>
        <Route element={<Layout pageTitle="Report Builder" />}>
          <Route path="/fa/reports" element={<ReportBuilder />} />
        </Route>
        <Route element={<Layout pageTitle="Market Analysis" />}>
          <Route path="/fa/market-analysis" element={<MarketAnalysis />} />
        </Route>
      </Route>

      {/* TM Routes */}
      <Route element={<ProtectedRoute role="tm" />}>
        <Route element={<Layout pageTitle="Overview Dashboard" />}>
          <Route path="/tm/dashboard" element={<OverviewDashboard />} />
        </Route>
        <Route element={<Layout pageTitle="Team Tab" />}>
          <Route path="/tm/team" element={<TeamTab />} />
        </Route>
        <Route element={<Layout pageTitle="Member Detail" />}>
          <Route path="/tm/member/:id" element={<MemberDetail />} />
        </Route>
        <Route element={<Layout pageTitle="Issues & Requests" />}>
          <Route path="/tm/issues" element={<IssuesRequests />} />
        </Route>
        <Route element={<Layout pageTitle="Settings" />}>
          <Route path="/tm/settings" element={<TMSettings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
