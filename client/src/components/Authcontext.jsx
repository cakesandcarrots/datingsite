import React, { createContext, useContext, useState, useEffect } from 'react';

// Utility function to get a cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Utility function to set a cookie
const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/;`;
};

// Utility function to delete a cookie
const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);

  useEffect(() => {
    const userSession = getCookie('userSession');
    const adminSession = getCookie('adminSession');

    if (userSession) {
      setAuthenticated(true);
    }

    if (adminSession) {
      setAdminAuthenticated(true);
    }
  }, []);

  const login = () => {
    setAuthenticated(true);
    setCookie('userSession', 'true', 1); // 1 day expiry for example
  };

  const adminLogin = () => {
    setAdminAuthenticated(true);
    setCookie('adminSession', 'true', 1); // 1 day expiry for example
  };

  const logout = () => {
    setAuthenticated(false);
    deleteCookie('userSession');
  };

  const adminLogout = () => {
    setAdminAuthenticated(false);
    deleteCookie('adminSession');
  };

  return (
    <AuthContext.Provider value={{ authenticated, adminAuthenticated, setAuthenticated, setAdminAuthenticated, login, adminLogin, logout, adminLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
