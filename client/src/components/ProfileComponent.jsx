import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileComponent = () => {
  const [profileDetails, setProfileDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/current', { withCredentials: true });
        setProfileDetails(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!profileDetails) {
    return <ErrorMessage message="No profile data available." />;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProfileCard profileDetails={profileDetails} formatDate={formatDate} />
        <div className="space-y-8">
          <PhysicalAttributes profileDetails={profileDetails} />
          <AboutMe profileDetails={profileDetails} />
          <Location profileDetails={profileDetails} />
        </div>
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="flex justify-center items-center h-screen">
    <p className="text-red-500">{message}</p>
  </div>
);

const ProfileCard = ({ profileDetails, formatDate }) => (
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
    <ProfileInfo profileDetails={profileDetails} formatDate={formatDate} />
  </div>
);

const ProfileInfo = ({ profileDetails, formatDate }) => (
  <div className="space-y-4">
    {['email', 'gender', 'dateOfBirth'].map((field) => (
      <InfoField
        key={field}
        label={field.charAt(0).toUpperCase() + field.slice(1)}
        value={
          field === 'gender'
            ? profileDetails.genderInfo?.gender || 'Not specified'
            : field === 'dateOfBirth'
            ? formatDate(profileDetails[field])
            : profileDetails[field]
        }
      />
    ))}
  </div>
);

const InfoField = ({ label, value }) => (
  <div>
    <label className="block text-sm text-gray-500 mb-1">{label}</label>
    <input 
      type="text" 
      value={value} 
      readOnly 
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const PhysicalAttributes = ({ profileDetails }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-semibold mb-4">Physical Attributes</h3>
    <div className="grid grid-cols-2 gap-4">
      {[
        { label: 'Hair Color', value: profileDetails.hairColorInfo?.color },
        { label: 'Eye Color', value: profileDetails.eyeColorInfo?.color },
        { label: 'Body Type', value: profileDetails.bodyShapeInfo?.shape },
        { label: 'Height', value: `${profileDetails.height} cm` },
        { label: 'Weight', value: `${profileDetails.weight} kg` },
        { label: 'Ethnicity', value: profileDetails.ethnicityInfo?.ethnicity },
      ].map(({ label, value }) => (
        <div key={label}>
          <p className="font-medium">{label}</p>
          <p className="text-gray-600">{value || 'Not specified'}</p>
        </div>
      ))}
    </div>
  </div>
);

const AboutMe = ({ profileDetails }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-semibold mb-4">About Me</h3>
    <p className="text-gray-600 mb-4">{profileDetails.biography}</p>
    <h4 className="font-medium mb-2">Hobbies</h4>
    <div className="flex flex-wrap gap-2">
      {profileDetails.hobbies[0].split(',').map((hobby, index) => (
        <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
          {hobby.trim()}
        </span>
      ))}
    </div>
  </div>
);

const Location = ({ profileDetails }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-semibold mb-4">Location</h3>
    <p className="text-gray-600">Latitude: {profileDetails.location.lat}</p>
    <p className="text-gray-600">Longitude: {profileDetails.location.lng}</p>
  </div>
);

export default ProfileComponent;