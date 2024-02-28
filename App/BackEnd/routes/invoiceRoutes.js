// invoiceRouter.js

const express = require('express');
const router = express.Router();
const InvoiceController = require('../controllers/invoiceController');

// Define routes
router.get('/', InvoiceController.getAllInvoices);
router.post('/', InvoiceController.createInvoice);
router.get('/:id', InvoiceController.getInvoiceById);
router.put('/:id', InvoiceController.updateInvoice);
router.delete('/:id', InvoiceController.deleteInvoice);

module.exports = router;