// Author : Sai Rahul Kodumuru (B00875628)
const { User } = require('../models/User');
const mongoose = require('mongoose');
const debug = require('debug')('app:UserController');

exports.findUser = async (req, res) => {
  try {
    const user = await User.find({});

    res.status(200).json({
      message: 'User found',
      user,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: 'Internal Server Error',
      success: false,
    });
  }
};

exports.getUserById = (req, res, next, id) => {
  if (id.length < 12) {
    return res.status(400).json({
      success: false,
      message: 'Invalid user id',
    });
  }

  User.findById(mongoose.Types.ObjectId(id.trim()), (err, user) => {
    if (err || !user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    req.profile = { userId: user._id };
    next();
  });
};

// Author : Pallavi Cherukupalli (B00875628)
exports.getAllusers = async (req, res) => {
  try {
    const usersList = await User.find({});
    res.status(200).json({
      users: usersList,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

// Author : Monisha J (B00881079)
exports.updateUserSubscription = async (userId) => {
  try {
    let user = await User.updateOne(
      { _id: userId },
      { $set: { isPremium: true } }
    );

    console.log(user);
    return user;
  } catch (err) {
    return err;
  }
};

exports.getUsersBySubscription = async (isPremium) => {
  try {
    const usersList = await User.find({isPremium});
    return usersList;
  } catch (err) {
    return err;
  }
};

//Author Amandeep Singh Matta(B00886925)
exports.getRoleById = async (req, res) => {
  try {
    const { Userid } = req.params;

    const user = await User.findById({ _id: Userid });

    if (!user)
      return res.status(401).send({ message: "Invalid Email " });
    if (user.role)
      res.status(200).send({ message: "The user is admin", role: user.role });
    else
      res.status(200).send({ message: "This is a normal user", role: user.role });

  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error.message });

  }
};


exports.getRoleByEmail = async (req, res) => {
  try {


    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(401).send({ message: "Invalid Email " });
    if (user.role)
      res.status(200).send({ message: "The user is admin", role: user.role });
    else
      res.status(200).send({ message: "This is a normal user", role: user.role });

  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error.message });

  }
};

exports.getUserDetailsById = async (req, res) => {
  try {
    const { Userid } = req.params;

    const user = await User.findById({ _id: Userid });

    if (!user)
      return res.status(401).send({ message: "Invalid Email " });

    if (user)
      res.status(200).send({ message: "User Details", email: user.email, firstName: user.firstName, lastName: user.lastName });

  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error.message });

  }
}
