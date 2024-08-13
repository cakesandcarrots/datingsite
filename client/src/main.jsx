import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Tagline from './components/Tagline';
import Couple from './components/Couple';
import RegistrationForm from './components/RegistrationForm';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProfileMatches from './components/Findmatch';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/Authcontext';
import UserEditPanel from './components/UserDetailsEditor';

const HomePage = () => (
  <>
    <Tagline />
    <Couple />
  </>
);

const MainApp = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/admin', '/admin/dashboard', '/edit-user/:userId'];

  const shouldHideNavbar = (path) => {
    return hideNavbarRoutes.some((route) => {
      const regex = new RegExp(`^${route.replace(/:\w+/g, '\\w+')}$`);
      return regex.test(path);
    });
  };

  return (
    <>
      {!shouldHideNavbar(location.pathname) && <Navbar />}
      <Routes>
        <Route path='/findmatch' element={<ProfileMatches />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<RegistrationForm />} />
        <Route path='/login' element={<Login />} />
        <Route path='/edit-user/:userId' element={<UserEditPanel />} />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path='/admin' element={<AdminLogin />} />
        <Route
          path='/admin/dashboard'
          element={<AdminDashboard />}
        />
      </Routes>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <MainApp />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
