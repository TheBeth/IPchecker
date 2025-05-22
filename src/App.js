import './App.css';
import banner from './asset/image/pattern-bg.png';
import { useEffect, useState } from 'react';
import { getIpInfo } from './services/ipService';
import { IP_ADDRESS_REGEX } from './constants';
import IpInputForm from './components/IpInputForm';
import IpDetailsDisplay from './components/IpDetailsDisplay';
import MapDisplay from './components/MapDisplay';

function App() {
  const [location, setLocation] = useState(null); // Initialize with null
  const [inputIp, setInputIp] = useState('');
  const [error, setError] = useState(null); // State for managing error messages

  const fetchData = async (ip) => {
    setError(null); // Clear previous errors
    try {
      const data = await getIpInfo(ip);
      if (data && data.status !== 'fail') { // ip-api returns status: 'fail' for private/invalid IPs
        setLocation(data);
        setError(null); // Clear error on success
      } else {
        setLocation(null);
        setError(data && data.message ? `Error: ${data.message}` : "Failed to fetch IP information. Invalid IP or private address.");
        console.error("fetchData: No data received or API error status", data);
      }
    } catch (err) {
      console.error("Error in App fetchData:", err);
      setLocation(null); // Clear location on error
      setError("Failed to fetch IP information. Please check your connection or try again later.");
    }
  };

  useEffect(() => {
    fetchData(); // Fetches data for the current user's IP on initial load
  }, [])

  // IP Test
  const isIPValid = IP_ADDRESS_REGEX.test(inputIp);

  const handleSearch = () => {
    if (inputIp && !isIPValid) {
      alert("Invalid IP Address format."); // Or set an error state
      return;
    }
    fetchData(inputIp); // Fetch data for the entered IP on submit (or current if inputIp is empty)
  };

  return (
    <div>
      <div className='upper-page'>
        <img src={banner} alt='banner' />
      </div>
      <div className='input-ip'> {/* This class might need to be on the IpInputForm/IpDetailsDisplay root for styling */}
        <h1>IP Address Tracker</h1>
        <IpInputForm
          inputIp={inputIp}
          setInputIp={setInputIp}
          handleSearch={handleSearch}
          isIPValid={isIPValid}
        />
        {error && <p className="error-message">{error}</p>}
        <IpDetailsDisplay locationData={location} />
      </div>
      <MapDisplay locationData={location} />
    </div>
  );
}

export default App;
