// Author : Monisha J (B00881079)
const express = require('express');
const sendPromotionsRouter = express.Router();
const sendPromotionsController = require('../controllers/sendPromotions');

sendPromotionsRouter.post('/sendPromotions', sendPromotionsController.sendEmails);


module.exports = sendPromotionsRouter;