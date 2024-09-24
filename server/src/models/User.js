import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  hobbies: { type: [String], required: true },
  biography: { type: String, required: true },
  hairColor: { type: String, required: true },
  eyeColor: { type: String, required: true },
  bodyType: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  ethnicity: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  password: { type: String, required: true },
  profilePicture: { type: Buffer, required: true },
  status: { type: Number, default: 0 }, 
});

const User = mongoose.model('User', userSchema);
export default User;
