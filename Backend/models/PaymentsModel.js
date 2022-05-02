// Author : Monisha J(B00881079)
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const paymentSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
        },
        payments: {
            type: Object,
            required: true,
            trim: true
        }
    },
    { timestamps: true }
);

// User Model
const Payments = mongoose.model('Payments', paymentSchema);

module.exports = Payments;
