import html2pdf from 'html2pdf.js';

const generatePdf = async (formData) => {
    try {

        if(!formData.items || !Array.isArray(formData.items)){
            throw new Error('Items data is missing or invalid');
        }
        const itemListHtml = formData.items.map(item => `<li>${item.name}: Quantity - ${item.quantity}, Unit Price - ${item.unitPrice}</li>`).join('');
        const htmlContent = `
            <html>
                <h1>Invoice</h1>
                <p>Invoice Number: ${formData.invoiceNumber}</p>
                <p>Date: ${formData.date}</p>
                <p>Customer Name: ${formData.customerName}</p>
                <p>Customer Email: ${formData.customerEmail}</p>
                <p>Billing Street Info: ${formData.billingStreetInfo}</p>
                <p>Billing City: ${formData.billingCity}</p>
                <p>Billing State: ${formData.billingState}</p>
                <p>Billing ZIP: ${formData.billingZIP}</p>
                <p>Shipping Street Info: ${formData.shippingStreetInfo}</p>
                <p>Shipping City: ${formData.shippingCity}</p>
                <p>Shipping State: ${formData.shippingState}</p>
                <p>Shipping ZIP: ${formData.shippingZIP}</p>
                
                <ul>
                    ${itemListHtml}
                </ul>

                <p>Total Quantities: ${formData.totalQuantities}</p>
                <p>Total Amount: ${formData.totalAmount}</p>
            </html>
        `;

        const options = {
            filename: 'invoice.pdf',
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
