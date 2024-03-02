// invoiceController.js

const Invoice = require('../models/invoiceModel');

const InvoiceController = {
    getAllInvoices: async (req, res) => {
        try {
            const invoices = await Invoice.find();
            res.json(invoices);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    createInvoice: async (req, res) => {
        const { 
            invoiceNumber, 
            customerName, 
            date, 
            billingStreetInfo, 
            billingCity, 
            billingState, 
            billingZIP, 
            shippingStreetInfo, 
            shippingCity, 
            shippingState, 
            shippingZIP, 
            items, 
            totalQuantities, 
            totalAmount, 
            customerEmail 
        } = req.body;

        const newInvoice = new Invoice({
            invoiceNumber,
            customerName,
            date,
            billingStreetInfo,
            billingCity,
            billingState,
            billingZIP,
            shippingStreetInfo,
            shippingCity,
            shippingState,
            shippingZIP,
            items,
            totalQuantities,
            totalAmount,
            customerEmail
        });

        try {
            const createdInvoice = await newInvoice.save();
            res.status(201).json(createdInvoice);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    getInvoiceById: async (req, res) => {
        const id = req.params.id;
        try {
            const invoice = await Invoice.findById(id);
            if (!invoice) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            res.json(invoice);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    updateInvoice: async (req, res) => {
        const { id } = req.params;
        const updateFields = req.body;

        try {
            const updatedInvoice = await Invoice.findByIdAndUpdate(id, updateFields, { new: true });
            if (!updatedInvoice) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            res.json(updatedInvoice);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    deleteInvoice: async (req, res) => {
        const { id } = req.params;

        try {
            const deletedInvoice = await Invoice.findByIdAndDelete(id);
            if (!deletedInvoice) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            res.json({ message: 'Invoice deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = InvoiceController;
