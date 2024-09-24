import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { firstname, lastname, email, gender, dateOfBirth, hobbies, biography, hairColor, eyeColor, bodyType, height, weight, ethnicity, location, password, confirmPassword } = req.body;
    const profilePicture = req.file ? req.file.buffer : null;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const newUser = new User({
      firstname, lastname, email, gender, dateOfBirth, hobbies, biography,
      hairColor, eyeColor, bodyType, height, weight, ethnicity,
      location: JSON.parse(location), password, profilePicture, status: 0
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    req.session.user = { email: user.email };
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
};

export const checkAuth = (req, res) => {
  if (req.session.user) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
};