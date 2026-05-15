import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({
  user: null,
  role: null,
  pendingRole: null,
  login: () => {},
  verify2FA: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [pendingRole, setPendingRole] = useState(null);
  const [pendingNav, setPendingNav] = useState(null);
  const navigate = useNavigate();

  const roleHome = {
    customer: '/customer/home',
    fa: '/fa/dashboard',
    tm: '/tm/dashboard',
  };

  // Navigate only after role state is committed to avoid ProtectedRoute race
  useEffect(() => {
    if (pendingNav && role) {
      navigate(pendingNav);
      setPendingNav(null);
    }
  }, [role, pendingNav, navigate]);

  // Step 1: validate credentials → hold role and redirect to 2FA screen
  const login = (selectedRole) => {
    setPendingRole(selectedRole);
    navigate('/2fa');
  };

  // Step 2: accept any non-empty code → finalise login
  const verify2FA = () => {
    const selectedRole = pendingRole;
    let mockUser = { name: 'Demo User', initials: 'DU', role: selectedRole };
    if (selectedRole === 'customer') mockUser = { name: 'Sarah Jenkins', initials: 'SJ', role: selectedRole };
    if (selectedRole === 'fa') mockUser = { name: 'David Chen', initials: 'DC', role: selectedRole };
    if (selectedRole === 'tm') mockUser = { name: 'Manager', initials: 'M', role: selectedRole };

    setRole(selectedRole);
    setUser(mockUser);
    setPendingRole(null);
    // Defer navigation until useEffect confirms role is committed
    setPendingNav(roleHome[selectedRole] || '/');
  };

  const logout = () => {
    setRole(null);
    setUser(null);
    setPendingRole(null);
    setPendingNav(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, role, pendingRole, login, verify2FA, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
