// src/utils/sendOrderConfirmation.js
import emailjs from 'emailjs-com';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_USER_ID } from './emailconfig';
import { encryptText } from './encryptionConfig';


export const sendOrderConfirmation = (orderInfo) => {

    let temp = 0;
    orderInfo.cartItems.forEach((cartItem) => {
      temp = temp + parseInt(cartItem.price)
    })
    const encryptedLink = encryptText(orderInfo.paymentId);
    const totalPrice = temp;
    const orderHtml = `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Product</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${orderInfo.cartItems.map(item => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.title}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">₹${item.price}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p style="font-weight: bold;">Total: ₹${totalPrice}</p>
        <h2 style={{ color: 'red' }}>Please show the following QR code to cafeteria counter and collect your order</h2>
        <img style="display: block; margin: auto;" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encryptedLink}" alt="QR Code" />
        
        <p>Thank you for shopping with us!</p>
      </body>
      </html>
  `;
  const templateParams = {
    user_name: orderInfo.addressInfo.name,
    user_email: orderInfo.addressInfo.email.trim(),
    date:orderInfo.addressInfo.date,
    cartItems: orderInfo.cartItems,
    orderHtml
  };

  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams,
    EMAILJS_USER_ID
  )
  .then((response) => {
    console.log('Order confirmation email sent!', response.status, response.text, templateParams.user_email);
    return response;
  })
  .catch((error) => {
    console.error('Failed to send order confirmation email:', error, templateParams.user_email);
    throw error;
  });
};
