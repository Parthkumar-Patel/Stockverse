const mongoose = require("mongoose");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { ObjectId } = mongoose.Schema;
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	Userid:{ type : ObjectId},
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	cpassword: { type: String, required: true },
	securityQuestion: { type: String, required: true },
	securityAnswer: { type: String, required: true },
	isPremium: { type: Boolean, default: false },
	role: { type: Boolean, default: false },
	hash: {type: String, required: false},
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("User", userSchema);

const validate = (data) => {
	
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		cpassword: passwordComplexity().required().label("cpassword"),
		securityAnswer: Joi.string().required().label("securityAnswer"),
		securityQuestion: Joi.string().required().label("securityQuestion"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };
