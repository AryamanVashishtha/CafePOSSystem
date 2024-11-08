import CryptoJS from 'crypto-js';
import { secretKey } from './encryptionDetails';

export const encryptText = (text) => {
    const ciphertext = CryptoJS.AES.encrypt(text, secretKey).toString();
    
    // Convert to URL-safe Base64 by replacing '+' with '-', '/' with '_', and removing '=' padding
    return ciphertext.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };

  export const decryptText = (encryptedText) => {
    // Convert URL-safe Base64 back to standard Base64
    const base64 = encryptedText.replace(/-/g, '+').replace(/_/g, '/');
    
    const bytes = CryptoJS.AES.decrypt(base64, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);  // Convert bytes to plain text
  };
