import mongoose from 'mongoose';

export const fetchAllStaticData = async (req, res) => {
  try {
    const database = mongoose.connection.db;

    const bodyshape = await database.collection('bodyshape').find().toArray();
    const ethnicity = await database.collection('ethnicity').find().toArray();
    const eyecolor = await database.collection('eyecolor').find().toArray();
    const gender = await database.collection('gender').find().toArray();
    const haircolor = await database.collection('haircolor').find().toArray();
    const hobbies = await database.collection('hobbies').find().toArray();

    const resdata = { bodyshape, ethnicity, eyecolor, gender, haircolor, hobbies };
    res.json(resdata);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchBodyShape = async (req, res) => {
  try {
    const bodyshape = await mongoose.connection.db.collection('bodyshape').find().toArray();
    res.json(bodyshape);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchEthnicity = async (req, res) => {
  try {
    const ethnicity = await mongoose.connection.db.collection('ethnicity').find().toArray();
    res.json(ethnicity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchEyeColor = async (req, res) => {
  try {
    const eyecolor = await mongoose.connection.db.collection('eyecolor').find().toArray();
    res.json(eyecolor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchHairColor = async (req, res) => {
  try {
    const haircolor = await mongoose.connection.db.collection('haircolor').find().toArray();
    res.json(haircolor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchHobbies = async (req, res) => {
  try {
    const hobbies = await mongoose.connection.db.collection('hobbies').find().toArray();
    res.json(hobbies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};