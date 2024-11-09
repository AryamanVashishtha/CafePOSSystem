import { useState, useRef, useEffect } from 'react';
import Layout from '../../../components/layout/Layout';
import {Scanner} from '@yudiel/react-qr-scanner';
import { useNavigate } from 'react-router-dom';

function Scan() {
  const [data, setData] = useState('No result');
  const navigate = useNavigate();

  // Handle scanning result and navigation
  const handleScan = (scanData) => {
    if (scanData) {
      setData(scanData); // Set the scanned data
      // Delay stopping the camera and navigating for 2 seconds
      setTimeout(() => {
        navigate(`/orderinfo/${scanData}`); // Navigate to the order info page
      }, 2000); // 2-second delay
    }
  };


  return (
    <Layout>
      <section className="text-gray-600 body-font mt-10 mb-10">
        <div className="container px-5 mx-auto mb-10">
          <div style={{ textAlign: 'center' }}>
            <Scanner
              onScan={(result, error) => {
                if (result) {
                  handleScan(result[0].rawValue); // Call handleScan with the scanned text
                }
                if (error) {
                  console.error(error);
                }
              }}
              constraints={{ facingMode: 'environment' }} // Use back camera if available
              style={{ width: '100%' }}
            />

          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Scan;
