import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({
  user: null,
  role: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const roleHome = {
    customer: '/customer/home',
    fa: '/fa/dashboard',
    tm: '/tm/dashboard',
  };

  const login = (selectedRole) => {
    setRole(selectedRole);
    // Mock user based on role
    let mockUser = { name: 'Demo User', initials: 'DU', role: selectedRole };
    if (selectedRole === 'customer') mockUser = { name: 'Sarah Jenkins', initials: 'SJ', role: selectedRole };
    if (selectedRole === 'fa') mockUser = { name: 'David Chen', initials: 'DC', role: selectedRole };
    if (selectedRole === 'tm') mockUser = { name: 'Manager', initials: 'M', role: selectedRole };
    
    setUser(mockUser);
    navigate(roleHome[selectedRole] || '/');
  };

  const logout = () => {
    setRole(null);
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
