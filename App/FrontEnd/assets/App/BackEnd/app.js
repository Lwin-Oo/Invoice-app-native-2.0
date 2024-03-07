const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware

const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();

const MONGODB_URI = 'mongodb+srv://LwinOo:Leoforlight1898@invoice-app.memo8p8.mongodb.net/invoiceApp?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => {
    console.log('Connected to MongoDB Atlas');
})

.catch((error) => {
    console.error('Error connecting to MongoDB Atlas: ', error.message);
});

// Middleware
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

app.use('/api/invoices', invoiceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
