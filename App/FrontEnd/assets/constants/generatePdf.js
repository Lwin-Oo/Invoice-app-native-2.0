import html2pdf from 'html2pdf.js';

const generatePdf = async (formData) => {
    try {
        if (!formData.items || !Array.isArray(formData.items)) {
            throw new Error('Items data is missing or invalid');
        }
        const itemListHtml = formData.items.map(item => `<tr><td>${item.name}</td><td>${item.quantity}</td><td>${item.unitPrice}</td><td>${item.quantity * item.unitPrice}</td></tr>`).join('');
        const htmlContent = `
            <html>
            <head>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        font-size: 12px;
                        color: #333;
                    }
                    h1 {
                        font-size: 24px;
                        color: #333;
                        margin-bottom: 20px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid #ccc;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                    .invoice-details {
                        margin-bottom: 20px;
                    }
                    .invoice-details p {
                        margin: 5px 0;
                    }
                    .total {
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <h1>Invoice</h1>
                <div class="invoice-details">
                    <p>Invoice Number: ${formData.invoiceNumber}</p>
                    <p>Date: ${formData.date}</p>
                    <p>Customer Name: ${formData.customerName}</p>
                    <p>Customer Email: ${formData.customerEmail}</p>
                    <p>Billing Address: ${formData.billingStreetInfo}, ${formData.billingCity}, ${formData.billingState}, ${formData.billingZIP}</p>
                    <p>Shipping Address: ${formData.shippingStreetInfo}, ${formData.shippingCity}, ${formData.shippingState}, ${formData.shippingZIP}</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemListHtml}
                    </tbody>
                </table>
                <p class="total">Total Quantities: ${formData.totalQuantities}</p>
                <p class="total">Total Amount: ${formData.totalAmount}</p>
            </body>
            </html>
        `;

        const options = {
            filename: `Invoice-${formData.invoiceNumber}-To-${formData.customerName}.pdf`,
            html2canvas: {
                scale: 3, // Increase to get better resolution on the PDF
            },
            jsPDF: {
                unit: 'in',
                format: 'letter',
                orientation: 'portrait',
            },
        };

        html2pdf().set(options).from(htmlContent).save();

    } catch (error) {
        console.error('Error generating PDF: ', error);
        throw error;
    }
};

export default generatePdf;
