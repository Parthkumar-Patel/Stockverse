// Author : Amandeep Singh Matta(B00886925)
const mongoose = require('mongoose');

const securityQuestionsSchema = new mongoose.Schema(
  {
    question: String,
    
  },
  { collection: 'questions' } // Map to existing Collection Name or give a new name
);


const SecurityQuestion = mongoose.model('Questions', securityQuestionsSchema);

module.exports = SecurityQuestion;