
const securityQuestion = require("../models/SecurityQuestion");



exports.getRandomQuestion = async (req, res) => {
    try{
    const randomQuestion = await securityQuestion.aggregate([{$sample: {size: 3}}]);
    res.status(200).json({
      questions: randomQuestion,
      success: true
    });
    }catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
    }
  };