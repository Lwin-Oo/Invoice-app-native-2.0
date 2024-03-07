import * as Print from 'expo-print';

export const generatePdf = async (invoiceNumber, selectedDate, customerName, items) => {
  const htmlContent = generateHtml(invoiceNumber, selectedDate, customerName, items);
  const pdf = await Print.printToFileAsync({ html: htmlContent });
  return pdf.uri;
};

const generateHtml = (invoiceNumber, selectedDate, customerName, items) => {
  // Generate HTML content based on the invoice data
  let htmlContent = `<html><body>
    <h1>Invoice</h1>
    <p>Invoice Number: ${invoiceNumber}</p>
    <p>Date: ${selectedDate}</p>
    <p>Customer Name: ${customerName}</p>
    <table>
      <tr>
        <th>Item Name</th>
        <th>Quantity</th>
        <th>Unit Price</th>
      </tr>`;
  
  items.forEach(item => {
    htmlContent += `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.unitPrice}</td>
      </tr>`;
  });

  htmlContent += `</table></body></html>`;
  
  return htmlContent;
};
