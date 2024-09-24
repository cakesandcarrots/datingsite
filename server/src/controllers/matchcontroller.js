import User from '../models/User.js';
import { calculateAge, haversineDistance, calculateHobbiesMatch } from '../utils/helper.js';

export const getMatches = async (req, res) => {
  console.log(req.query)
  if (!req.session.user) return res.status(401).json({ error: 'Unauthorized' });

  const { email } = req.session.user;
  const { filterType = 'gender' } = req.query;

  try {
    const currentUser = await User.findOne({ email });
    if (!currentUser) return res.status(404).json({ error: 'User not found' });

    const genderPreference = currentUser.gender === '1' ? '2' : '1';
    const query = { status: 1, gender: genderPreference };

    let users = await User.find(query)
      .select('firstname lastname profilePicture hobbies dateOfBirth location')
      .limit(100);

    if (filterType === 'distance') {
    
      const currentUserLocation = currentUser.location;
      users = users.filter(user => 
        haversineDistance(currentUserLocation, user.location) <= 30
      );
    } else if (filterType === 'interests') {
      const currentUserHobbies = currentUser.hobbies[0].split(',');
      users = users.filter(user => {
        const userHobbies = user.hobbies[0].split(',');
        return calculateHobbiesMatch(currentUserHobbies, userHobbies);
      })};

    const matchesWithBase64 = users.map(match => ({
      ...match.toObject(),
      profilePicture: match.profilePicture ? match.profilePicture.toString('base64') : null,
      age: calculateAge(match.dateOfBirth),
    }));

    res.json(matchesWithBase64);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};