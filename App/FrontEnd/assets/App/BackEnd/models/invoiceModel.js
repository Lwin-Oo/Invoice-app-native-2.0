const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    billingStreetInfo: {
        type: String,
        required: true
    },
    billingCity: {
        type: String,
        required: true
    },
    billingState: {
        type: String,
        required: true
    },
    billingZIP: {
        type: String,
        required: true
    },
    shippingStreetInfo: {
        type: String,
        required: true
    },
    shippingCity: {
        type: String,
        required: true
    },
    shippingState: {
        type: String,
        required: true
    },
    shippingZIP: {
        type: String,
        required: true
    },
    items: [
        {
            name: String,
            quantity: Number,
            unitPrice: Number
        }
    ],
    totalQuantities: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
