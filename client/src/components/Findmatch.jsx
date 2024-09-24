import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Select = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="p-2 border rounded-md"
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const ProfileCard = ({ name, age, hobbies, profilePicture }) => 

{
 return (
  <div className="bg-pink-50 w-fit grow max-w-[22rem] rounded-lg shadow-md flex flex-col h-full">
    <div className="h-64 w-full flex justify-center flex-shrink-0">
    <img
        src={profilePicture ? `data:image/jpeg;base64,${profilePicture}` : "/api/placeholder/150/150"}
        alt={name}
        className="w-full h-full object-contain"
      />
    </div>
    <div className="p-4 flex-grow flex justify-center flex-col">
      <h3 className="font-semibold self-center text-lg mb-2">{name}</h3>
      <p className="text-gray-500 self-center text-sm mb-1">Age: {age}</p>
      <p className="text-gray-500 self-center text-sm">Hobbies: {hobbies.join(', ')}</p>
    </div>
  </div>
)};

const ProfileMatches = () => {
  const [profiles, setProfiles] = useState([]);
  const [filterType, setFilterType] = useState('gender');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, [filterType]);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get(`/api/matches`, {
        params: { filterType },
        withCredentials: true,
        baseURL: 'http://localhost:5000' 
      });
      if (Array.isArray(response.data)) {
        setProfiles(response.data);
      } else {
        console.error('Unexpected data format:', response.data);
        setError('Unexpected data format received from server');
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
      setError('Error fetching profiles. Please try again later.');
    }
  };

  const filterOptions = [
    { value: 'gender', label: 'Based on Gender' },
    { value: 'distance', label: 'Based on Distance' },
    { value: 'interests', label: 'Based on Interests' },
  ];

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-center font-bold">Matches</h2>
        <Select
          value={filterType}
          onChange={setFilterType}
          options={filterOptions}
        />
      </div>
      <div className="flex flex-wrap justify-evenly gap-6">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile._id}
            name={`${profile.firstname} ${profile.lastname}`}
            age={profile.age}
            hobbies={profile.hobbies}
            profilePicture={profile.profilePicture}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileMatches;
