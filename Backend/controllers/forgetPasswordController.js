const { User } = require("../models/User");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
exports.verifyUser = async (req, res) => {
    try {
        
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (!user)
            return res.status(401).send({ message: "User not found " });
        res.status(200).send({ message: "User Found", id: user._id });

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });

    }
};



exports.getSecurityQuestionOfUser = async (req, res) => {
    try {
        const {Userid} = req.params;
        
        const user =await User.findById({ _id:Userid });
        
        if (!user)
            return res.status(401).send({ message: "Invalid Email " });
        res.status(200).send({ message: "Question found", question: user.securityQuestion });

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });

    }
};
exports.updatePassword = async (req, res) => {
    try {
        const {Userid} = req.params;
        const user =await User.findById({ _id:Userid });
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
		console.log(user);
        
		const hashPassword = await bcrypt.hash(req.body.password, salt);
    
        user.password=hashPassword;
        user.cpassword=hashPassword;

        const data = await User.findOneAndUpdate(
            {
              _id: Userid,
            },
            {password:hashPassword,cpassword:hashPassword},
            { new: true }
          );
      
          if (!data) {
            return res.status(404).json({
              success: false,
              message: 'Invalid User id for given userId',
            });
          }
      
          return res.status(200).json({
            success: true,
            message: 'Password changed successfully',
          });
       


    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });

    }
};
exports.verifyAnswer= async (req, res) => {
    try {
        
        const user =await User.findById({ _id:req.body.id });
		const hashAnswer = await bcrypt.hash(req.body.answer, user.hash);
        console.log(hashAnswer);
        console.log(user.securityAnswer);
		if(hashAnswer===user.securityAnswer)
		    res.status(200).send({ message: "Answer is correct", user: user });
        else
            res.status(200).send({ message: "Answer is false"});
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });

    }
};



