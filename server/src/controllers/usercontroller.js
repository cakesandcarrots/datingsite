import mongoose from 'mongoose';
import User from '../models/User.js';

// Dashboard data retrieval logic remains the same
export const getDashboardData = async (req, res) => {
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
};

// Update user status logic remains the same
export const updateUserStatus = async (req, res) => {
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
};

// Fetch current user with lookup to get additional details from related collections
export const getCurrentUser = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { email } = req.session.user;

  try {
    const userWithDetails = await User.aggregate([
      { $match: { email } },

      // Convert fields like gender, hairColor, eyeColor, bodyType, and ethnicity to numbers
      {
        $addFields: {
          gender: { $toInt: "$gender" },
          hairColor: { $toInt: "$hairColor" },
          eyeColor: { $toInt: "$eyeColor" },
          bodyType: { $toInt: "$bodyType" },
          ethnicity: { $toInt: "$ethnicity" }
        }
      },

      {
        $lookup: {
          from: 'gender',
          localField: 'gender',
          foreignField: 'id',
          as: 'genderInfo'
        }
      },
      { $unwind: '$genderInfo' },

      {
        $lookup: {
          from: 'haircolor',
          localField: 'hairColor',
          foreignField: 'id',
          as: 'hairColorInfo'
        }
      },
      { $unwind: '$hairColorInfo' },

      {
        $lookup: {
          from: 'eyecolor',
          localField: 'eyeColor',
          foreignField: 'id',
          as: 'eyeColorInfo'
        }
      },
      { $unwind: '$eyeColorInfo' },

      {
        $lookup: {
          from: 'bodyshape',
          localField: 'bodyType',
          foreignField: 'id',
          as: 'bodyShapeInfo'
        }
      },
      { $unwind: '$bodyShapeInfo' },

      {
        $lookup: {
          from: 'ethnicity',
          localField: 'ethnicity',
          foreignField: 'id',
          as: 'ethnicityInfo'
        }
      },
      { $unwind: '$ethnicityInfo' },

      {
        $lookup: {
          from: 'hobbies',
          localField: 'hobbies',
          foreignField: 'hobby',
          as: 'hobbiesInfo'
        }
      }
    ]);

    console.log(userWithDetails);

    if (!userWithDetails || userWithDetails.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userWithDetails[0];
    const profilePicBase64 = user.profilePicture ? user.profilePicture.toString('base64') : '';
    user.profilePicture = profilePicBase64 ? `data:image/jpeg;base64,${profilePicBase64}` : '';

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Fetch user by ID with lookup
export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const userWithDetails = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },

      // Convert fields like gender, hairColor, eyeColor, bodyType, and ethnicity to numbers
      {
        $addFields: {
          gender: { $toInt: "$gender" },
          hairColor: { $toInt: "$hairColor" },
          eyeColor: { $toInt: "$eyeColor" },
          bodyType: { $toInt: "$bodyType" },
          ethnicity: { $toInt: "$ethnicity" }
        }
      },

      {
        $lookup: {
          from: 'gender',
          localField: 'gender',
          foreignField: 'id',
          as: 'genderInfo'
        }
      },
      { $unwind: '$genderInfo' },

      {
        $lookup: {
          from: 'haircolor',
          localField: 'hairColor',
          foreignField: 'id',
          as: 'hairColorInfo'
        }
      },
      { $unwind: '$hairColorInfo' },

      {
        $lookup: {
          from: 'eyecolor',
          localField: 'eyeColor',
          foreignField: 'id',
          as: 'eyeColorInfo'
        }
      },
      { $unwind: '$eyeColorInfo' },

      {
        $lookup: {
          from: 'bodyshape',
          localField: 'bodyType',
          foreignField: 'id',
          as: 'bodyShapeInfo'
        }
      },
      { $unwind: '$bodyShapeInfo' },

      {
        $lookup: {
          from: 'ethnicity',
          localField: 'ethnicity',
          foreignField: 'id',
          as: 'ethnicityInfo'
        }
      },
      { $unwind: '$ethnicityInfo' },

      {
        $lookup: {
          from: 'hobbies',
          localField: 'hobbies',
          foreignField: 'hobby',
          as: 'hobbiesInfo'
        }
      }
    ]);

    if (!userWithDetails || userWithDetails.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userWithDetails[0];
    if (user.profilePicture) {
      user.profilePicture = `data:image/jpeg;base64,${user.profilePicture.toString('base64')}`;
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Update user with optional profile picture and hobbies parsing
export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body;

  try {
    // Handle profile picture
    if (req.file) {
      // If a new file is uploaded
      updateData.profilePicture = req.file.buffer;
    } else if (updateData.profilePicture && updateData.profilePicture.startsWith('data:image')) {
      // If the profile picture is sent as base64
      const base64Data = updateData.profilePicture.split(',')[1];
      updateData.profilePicture = Buffer.from(base64Data, 'base64');
    } else {
      // If no new picture is provided, remove it from updateData to keep the existing one
      delete updateData.profilePicture;
    }

    // Parse location if it's a string
    if (typeof updateData.location === 'string') {
      updateData.location = JSON.parse(updateData.location);
    }

    // Parse hobbies if it's a string
    if (typeof updateData.hobbies === 'string') {
      updateData.hobbies = JSON.parse(updateData.hobbies);
    }

    // Convert string numbers to actual numbers
    ['height', 'weight'].forEach(field => {
      if (updateData[field]) {
        updateData[field] = parseFloat(updateData[field]);
      }
    });

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prepare response data
    const userData = updatedUser.toObject();
    if (userData.profilePicture) {
      userData.profilePicture = `data:image/jpeg;base64,${userData.profilePicture.toString('base64')}`;
    }

    res.json(userData);
  } catch (error) {
    console.error('Error updating user data:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};