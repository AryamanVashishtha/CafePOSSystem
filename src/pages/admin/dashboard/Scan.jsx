import { useState, useRef, useEffect } from 'react';
import Layout from '../../../components/layout/Layout';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';

function Scan() {
  const [data, setData] = useState('No result');
  const navigate = useNavigate();
  const qrReaderRef = useRef(null);

  // Function to stop all media tracks (audio and video)
  const stopCameraStream = () => {
    if (qrReaderRef.current) {
      const videoElement = qrReaderRef.current.videoRef; // Access the video element

      if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject;
        const tracks = stream.getTracks(); // Get all media tracks (audio and video)
        tracks.forEach((track) => {
          track.stop(); // Stop each track
        });
        videoElement.srcObject = null; // Set srcObject to null to fully release resources
      }
    }
  };

  // Handle scanning result and navigation
  const handleScan = (scanData) => {
    setData(scanData); // Set the scanned data
    stopCameraStream(); // Stop the camera feed after 2 seconds

    // Delay stopping the camera and navigating for 2 seconds
    setTimeout(() => {
      navigate(`/orderinfo/${scanData}`); // Navigate to the order info page
    }, 2000); // 2-second delay
  };

  // Cleanup the camera stream when the component unmounts
  useEffect(() => {
    return () => {
      stopCameraStream(); // Cleanup the camera feed when the component is unmounted
    };
  }, []);

  return (
    <Layout>
      <section className="text-gray-600 body-font mt-10 mb-10">
        <div className="container px-5 mx-auto mb-10">
          <div style={{ textAlign: 'center' }}>
            <QrReader
              ref={qrReaderRef}
              onResult={(result, error) => {
                if (result?.text) {
                  handleScan(result.text); // Call handleScan with the scanned text
                }
                if (error) {
                  console.error(error);
                }
              }}
              style={{ width: '100%' }}
            />
            <p>{data}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Scan;
