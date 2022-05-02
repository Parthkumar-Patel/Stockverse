// Author : Monisha J (B00881079)
const Payments = require('../models/PaymentsModel');
const userController = require('../controllers/userController');
const { STRIPE_KEY } = require("../config");

const stripe = require('stripe')(STRIPE_KEY);
const debug = require('debug')('app:PaymentController');

exports.getAllTransactions = async (req, res) => {
    try {
        const { userId } = req.params;
        const transactionList = await Payments.find({ userId });
        res.status(200).json({
            list: transactionList?.[0] || [],
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};

exports.getTransaction = async (req, res) => {
    try {
        const { userId, transactionId } = req.params;
        const transactionList = await Payments.find({ userId });
        res.status(200).json({
            transaction: transactionList?.[0]?.["payments"]?.filter((item) => {
                return item.transactionId === transactionId
            }) || [],
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};

exports.addPayment = async (userId, paymentDetails) => {
    try {
        const foundList = await Payments.find({
            userId
        });
        if (foundList.length > 0) {
            let details = [...foundList[0].payments, paymentDetails];
            const updatedList = await Payments.updateOne(
                { userId },
                {
                    $set: { payments: details },
                },
                { new: true }
            );
            return { ...foundList[0], payments: details };
        } else {
            const list = {
                userId,
                payments: [paymentDetails],
            };
            const updatedList = await Payments.create(list);
            return list;
        }
    } catch (err) {
        debug(err);
    }
};

exports.makePayment = async (req, res) => {
    try {
        const { userId } = req.params;
        const token = req.body;
        return stripe.customers
            .create({
                email: token.email,
                source: token.id,
            })
            .then((customer) => {
                stripe.charges
                    .create(
                        {
                            amount: 1 * 100,
                            currency: 'cad',
                            customer: customer.id,
                            receipt_email: token.email,
                        })
                    .then(async (result) => {
                        let data = {
                            email: result?.receipt_email, transactionId: result?.id,
                            details: result?.payment_method_details,
                            status: "SUCCESS",
                            createdDate: result?.created
                        }
                        let updatedList = await this.addPayment(userId, data);
                        let user = await userController.updateUserSubscription(userId);
                        return res.status(200).json({ list: updatedList, success: true });
                    })
                    .catch((err) => console.log(err));
            })
    } catch (err) {
        res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};