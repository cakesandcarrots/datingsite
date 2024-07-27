import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user`, {
          params: { email },
        });
        console.log('User data:', response.data); // Log the response data
        setUser(response.data);
      } catch (error) {
        setError('Error fetching user data');
        console.error('Error fetching user data:', error);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <Container>
      <Row>
        <Col md={4} className="text-center">
          <img
            src={user.profilePicture} // Use base64 string directly
            alt="Profile"
            className="img-fluid"
            style={{ maxHeight: '300px' }}
          />
        </Col>
        <Col md={8}>
          <h2>{user.firstname} {user.lastname}</h2>
          <p>Email: {user.email}</p>
          <p>Gender: {user.gender}</p>
          <p>Date of Birth: {new Date(user.dateOfBirth).toLocaleDateString()}</p>
          <p>Hobbies: {user.hobbies.join(', ')}</p>
          <p>Biography: {user.biography}</p>
          <p>Hair Color: {user.hairColor}</p>
          <p>Eye Color: {user.eyeColor}</p>
          <p>Body Type: {user.bodyType}</p>
          <p>Height: {user.height} cm</p>
          <p>Weight: {user.weight} kg</p>
          <p>Ethnicity: {user.ethnicity}</p>
          <p>Location: {user.location ? `Lat: ${user.location.lat}, Lon: ${user.location.lon}` : 'Not provided'}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
