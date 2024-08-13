import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileComponent = () => {
  const [profileDetails, setProfileDetails] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user', { withCredentials: true });
        console.log(response.data);
        setProfileDetails(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfile();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (!profileDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center mb-6">
            {profileDetails.profilePicture ? (
              <img
                src={profileDetails.profilePicture}
                alt="Profile"
                className="w-40 h-40 object-cover rounded-full mb-4"
              />
            ) : (
              <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-4xl font-bold mb-4">
                {profileDetails.firstname[0]}
              </div>
            )}
            <h2 className="text-2xl font-bold text-gray-800">
              {profileDetails.firstname} {profileDetails.lastname}
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Email</label>
              <input 
                type="email" 
                value={profileDetails.email} 
                readOnly 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Gender</label>
              <input 
                type="text" 
                value={profileDetails.gender} 
                readOnly 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Date of Birth</label>
              <input 
                type="text" 
                value={formatDate(profileDetails.dateOfBirth)} 
                readOnly 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Physical Attributes</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Hair Color</p>
                <p className="text-gray-600">{profileDetails.hairColor}</p>
              </div>
              <div>
                <p className="font-medium">Eye Color</p>
                <p className="text-gray-600">{profileDetails.eyeColor}</p>
              </div>
              <div>
                <p className="font-medium">Body Type</p>
                <p className="text-gray-600">{profileDetails.bodyType}</p>
              </div>
              <div>
                <p className="font-medium">Height</p>
                <p className="text-gray-600">{profileDetails.height} cm</p>
              </div>
              <div>
                <p className="font-medium">Weight</p>
                <p className="text-gray-600">{profileDetails.weight} kg</p>
              </div>
              <div>
                <p className="font-medium">Ethnicity</p>
                <p className="text-gray-600">{profileDetails.ethnicity}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">About Me</h3>
            <p className="text-gray-600 mb-4">{profileDetails.biography}</p>
            <h4 className="font-medium mb-2">Hobbies</h4>
            <div className="flex flex-wrap gap-2">
              {profileDetails.hobbies.map((hobby, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {hobby}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Location</h3>
            <p className="text-gray-600">Latitude: {profileDetails.location.latitude}</p>
            <p className="text-gray-600">Longitude: {profileDetails.location.longitude}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;