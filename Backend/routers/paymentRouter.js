// Author : Monisha J (B00881079)
const express = require('express');
const paymentRouter = express.Router();
const paymentController = require('../controllers/paymentController');

paymentRouter.get('/paymentList/:userId', paymentController.getAllTransactions);
paymentRouter.get('/paymentList/users/:userId/transactions/:transactionId', paymentController.getTransaction);
paymentRouter.post('/makePayment/:userId', paymentController.makePayment);

module.exports = paymentRouter;