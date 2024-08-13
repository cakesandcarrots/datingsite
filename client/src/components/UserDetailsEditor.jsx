import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';

const UserEditPanel = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({
    gender: [],
    hairColor: [],
    eyeColor: [],
    bodyType: [],
    ethnicity: []
  });
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/fetchData');
        setOptions({
          gender: res.data.gender,
          hairColor: res.data.haircolor,
          eyeColor: res.data.eyecolor,
          bodyType: res.data.bodyshape,
          ethnicity: res.data.ethnicity
        });
      } catch (err) {
        setError('Failed to fetch options data');
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchOptions();
    fetchUser();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(user).forEach(key => {
        if (key === 'hobbies') {
          formData.append(key, JSON.stringify(user[key]));
        } else if (key === 'profilePicture' && user[key] instanceof File) {
          formData.append(key, user[key]);
        } else {
          formData.append(key, user[key]);
        }
      });

      await axios.put(`http://localhost:5000/api/user/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('User data updated successfully');
    } catch (err) {
      alert('Failed to update user data');
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-800 text-white flex justify-between items-center">
            <h2 className="text-xl font-semibold">Edit User: {user.firstname} {user.lastname}</h2>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center text-sm text-gray-300 hover:text-white"
            >
              <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
            </button>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-center mb-6">
              {user.profilePicture && (
                <img
                  src={`data:image/png;base64,${user.profilePicture}`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
              )}
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={user.firstname}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={user.lastname}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                  <select
                    name="gender"
                    id="gender"
                    value={user.gender}
                    onChange={handleInputChange}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    {options.gender.map(g => (
                      <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    value={user.dateOfBirth.split('T')[0]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="hobbies" className="block text-sm font-medium text-gray-700">Hobbies</label>
                  <input
                    type="text"
                    name="hobbies"
                    id="hobbies"
                    value={user.hobbies.join(', ')}
                    onChange={(e) => handleInputChange({
                      target: {
                        name: 'hobbies',
                        value: e.target.value.split(',').map(hobby => hobby.trim())
                      }
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="biography" className="block text-sm font-medium text-gray-700">Biography</label>
                  <textarea
                    name="biography"
                    id="biography"
                    value={user.biography}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="hairColor" className="block text-sm font-medium text-gray-700">Hair Color</label>
                  <select
                    name="hairColor"
                    id="hairColor"
                    value={user.hairColor}
                    onChange={handleInputChange}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    {options.hairColor.map(h => (
                      <option key={h.id} value={h.id}>{h.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="eyeColor" className="block text-sm font-medium text-gray-700">Eye Color</label>
                  <select
                    name="eyeColor"
                    id="eyeColor"
                    value={user.eyeColor}
                    onChange={handleInputChange}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    {options.eyeColor.map(e => (
                      <option key={e.id} value={e.id}>{e.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="bodyType" className="block text-sm font-medium text-gray-700">Body Type</label>
                  <select
                    name="bodyType"
                    id="bodyType"
                    value={user.bodyType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    {options.bodyType.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height</label>
                  <input
                    type="number"
                    name="height"
                    id="height"
                    value={user.height}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight</label>
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    value={user.weight}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="ethnicity" className="block text-sm font-medium text-gray-700">Ethnicity</label>
                  <select
                    name="ethnicity"
                    id="ethnicity"
                    value={user.ethnicity}
                    onChange={handleInputChange}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    {options.ethnicity.map(e => (
                      <option key={e.id} value={e.id}>{e.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                  <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm">
                    Latitude: {user.location.lat}, Longitude: {user.location.lng}
                  </div>
                </div>
                <div>
                  <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
                  <input
                    type="file"
                    name="profilePicture"
                    id="profilePicture"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
                >
                  <Save size={16} className="mr-2" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditPanel;
