import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './Authcontext';
import Logout from './Logout';
import { useState } from 'react';

function Navbar() {
  const { authenticated, adminAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [dashboardActive, setDashboardActive] = useState(false);

  const handleDashboardClick = () => {
    if (dashboardActive) {
      navigate('/');
    } else {
      navigate('/dashboard');
    }
    setDashboardActive(!dashboardActive);
  };

  return (
    <div className="h-[13vh] flex justify-center items-stretch w-full flex-wrap sm:flex-nowrap">
      <button
        className="flex-1 bg-[#f7eded] font-rockoflf text-lg tracking-wider font-bold border border-black"
        onClick={handleDashboardClick}
      >
        Dashboard
      </button>
      <button className="flex-1 sm:flex-[3] bg-white pb-4 font-blitzwing text-4xl sm:text-6xl tracking-wide border border-black">
        <Link to="/" className="no-underline text-black">
          <span className="text-[#ffb1b1]">Match</span>Maker
        </Link>
      </button>
      {!authenticated && !adminAuthenticated ? (
        <>
          <button className="flex-1 bg-[#fff3f2] font-rockoflf text-lg tracking-wider font-bold border border-black">
            <Link to="/login" className="no-underline text-black">Log In</Link>
          </button>
          <button className="flex-1 bg-[#ffb4b4] font-rockoflf text-lg tracking-wider font-bold border border-black">
            <Link to="/register" className="no-underline text-black">Sign Up</Link>
          </button>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-[#fff3f2] font-rockoflf text-lg tracking-wider font-bold border border-black">
          <Logout />
        </div>
      )}
    </div>
  );
}

export default Navbar;
