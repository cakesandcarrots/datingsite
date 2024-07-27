import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
import User from './models/Users.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

const PORT = process.env.PORT; 
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());
app.use(cors());

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
    const profilePicture = req.file.buffer;

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
      profilePicture
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


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    if (user.password !== password) { 
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/user', async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    const profilePicBase64 = user.profilePicture.toString('base64');
    const profilePicUrl = `data:image/jpeg;base64,${profilePicBase64}`;

    res.json({
      ...user._doc, 
      profilePicture: profilePicUrl 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
