import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <div className="h-[13vh] flex justify-center items-stretch w-full flex-wrap sm:flex-nowrap">
        <button className="flex-1 bg-[#f7eded] font-rockoflf text-lg tracking-wider font-bold border border-black">
          <Link to="/dashboard" className="no-underline text-black">Dashboard</Link>
        </button>
        <button className="flex-1 sm:flex-[3] bg-white pb-4 font-blitzwing text-4xl sm:text-6xl tracking-wide border border-black">
          <Link to="/" className="no-underline text-black"><span className="text-[#ffb1b1]">Match</span>Maker</Link>
        </button>
        <button className="flex-1 bg-[#fff3f2] font-rockoflf text-lg tracking-wider font-bold border border-black">
          <Link to="/login" className="no-underline text-black">Log In</Link>
        </button>
        <button className="flex-1 bg-[#ffb4b4] font-rockoflf text-lg tracking-wider font-bold border border-black">
          <Link to="/register" className="no-underline text-black">Sign Up</Link>
        </button>
      </div>
    </>
  );
}

export default Navbar;
