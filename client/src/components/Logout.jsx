import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Authcontext';

const Logout = () => {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      setAuthenticated(false);
      navigate('/'); // Redirect to home page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2"
    >
      Logout
    </button>
  );
};

export default Logout;
