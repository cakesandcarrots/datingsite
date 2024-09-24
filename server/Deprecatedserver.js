import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
import User from './src/models/User.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173', // replace with your React app's URL
  credentials: true
}));

// Set up session middleware
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: MONGODB_URI }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Set to true if you're using HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error('Only .png and .jpeg format allowed!'), false);
    }
  }
});

app.post('/api/register', upload.single('profilePicture'), async (req, res) => {
  try {
    const { firstname, lastname, email, gender, dateOfBirth, hobbies, biography, hairColor, eyeColor, bodyType, height, weight, ethnicity, location, password, confirmPassword } = req.body;
    const profilePicture = req.file ? req.file.buffer : null;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const newUser = new User({
      firstname,
      lastname,
      email,
      gender,
      dateOfBirth,
      hobbies,
      biography,
      hairColor,
      eyeColor,
      bodyType,
      height,
      weight,
      ethnicity,
      location: JSON.parse(location),
      password,
      profilePicture,
      status: 0
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/fetchData', async (req, res) => {
  try {
    const database = mongoose.connection.db;

    const bodyshape = await database.collection('bodyshape').find().toArray();
    const ethnicity = await database.collection('ethnicity').find().toArray();
    const eyecolor = await database.collection('eyecolor').find().toArray();
    const gender = await database.collection('gender').find().toArray();
    const haircolor = await database.collection('haircolor').find().toArray();
    const hobbies = await database.collection('hobbies').find().toArray();

    const resdata = { bodyshape, ethnicity, eyecolor, gender, haircolor, hobbies }
    res.json(resdata);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/bodyshape', async (req, res) => {
  try {
    const bodyshape = await mongoose.connection.db.collection('bodyshape').find().toArray();
    res.json(bodyshape);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/ethnicity', async (req, res) => {
  try {
    const ethnicity = await mongoose.connection.db.collection('ethnicity').find().toArray();
    res.json(ethnicity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/eyecolor', async (req, res) => {
  try {
    const eyecolor = await mongoose.connection.db.collection('eyecolor').find().toArray();
    res.json(eyecolor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/haircolor', async (req, res) => {
  try {
    const haircolor = await mongoose.connection.db.collection('haircolor').find().toArray();
    res.json(haircolor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/hobbies', async (req, res) => {
  try {
    const hobbies = await mongoose.connection.db.collection('hobbies').find().toArray();
    res.json(hobbies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    req.session.user = { email: user.email };
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/checkAuth', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

app.get('/api/dashboard-data', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const newUsers = await User.countDocuments({ status: 0 });
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('_id firstname lastname gender status createdAt');

    res.json({
      totalUsers,
      newUsers,
      recentUsers
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/user/:userId/status', async (req, res) => {
  const { userId } = req.params;
  const { status } = req.body;

  if (![0, 1, 2].includes(Number(status))) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status: Number(status) },
      { new: true, select: '_id firstname lastname gender status' }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.clearCookie('connect.sid'); // Adjust if your session cookie has a different name
    res.json({ message: 'Logged out successfully' });
  });
});


app.get('/api/user', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { email } = req.session.user;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const profilePicBase64 = user.profilePicture ? user.profilePicture.toString('base64') : '';
    const profilePicUrl = profilePicBase64 ? `data:image/jpeg;base64,${profilePicBase64}` : '';
    res.json({
      ...user._doc,
      profilePicture: profilePicUrl
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = user.toObject();
    userData.profilePicture = user.pfilterrofilePicture ? user.profilePicture.toString('base64') : '';

    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/user/:userId', upload.single('profilePicture'), async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body;

  if (req.file) {
    updateData.profilePicture = req.file.buffer;
  }

  if (updateData.hobbies) {
    updateData.hobbies = JSON.parse(updateData.hobbies);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = updatedUser.toObject();
    userData.profilePicture = updatedUser.profilePicture ? updatedUser.profilePicture.toString('base64') : '';

    res.json(userData);
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const calculateAge = (dateOfBirth) => {
  const diffMs = Date.now() - new Date(dateOfBirth).getTime();
  const ageDt = new Date(diffMs);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
};

const haversineDistance = (coords1, coords2) => {
  const toRad = (x) => x * Math.PI / 180;

  const lat1 = coords1.lat;
  const lon1 = coords1.lng;
  const lat2 = coords2.lat;
  const lon2 = coords2.lng;
  const R = 6371; // Radius of the Earth in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
console.log("Distance of person is " ,d)
  return d;
};

const calculateHobbiesMatch = (userHobbies, otherHobbies) => {
  let matchCount = 0;
  for (let hobby of userHobbies) {
    if (otherHobbies.includes(hobby)) {
      matchCount++;
    }

  }
  console.log(matchCount)

  return (matchCount / userHobbies.length) >= 0.5;
};




export const getMatches = async (req, res) => {


  if (!req.session.user) return res.status(401).json({ error: 'Unauthorized' });

  const { email } = req.session.user;
  const { filterType = 'gender' } = req.query;
console.log(req.query)
  try {
    const currentUser = await User.findOne({ email });
    if (!currentUser) return res.status(404).json({ error: 'User not found' });

    const genderPreference = currentUser.gender === '1' ? '2' : '1';
    const query = { status: 1, gender: genderPreference };

    let users = await User.find(query)
      .select('firstname lastname profilePicture hobbies dateOfBirth location')
      .limit(100);
    if (filterType === 'distance') {
      const currentUserLocation = JSON.parse(JSON.stringify(currentUser.location));
      users = users.filter(user => {
        const userLocation = JSON.parse(JSON.stringify(user.location));
        return haversineDistance(currentUserLocation, userLocation) <= 30;
      });

    } else if (filterType === 'interests') {
      const currentUserHobbies = currentUser.hobbies[0].split(',');
      users = users.filter(user => calculateHobbiesMatch(currentUserHobbies, user.hobbies[0].split(',')));
      console.log(users)
    }

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
