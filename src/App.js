import './App.css';
import 'leaflet/dist/leaflet.css'
import { MapContainer, Popup, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import banner from '../src/asset/image/pattern-bg.png';
import { useEffect, useState } from 'react';
import L from 'leaflet'
import iconLocate from '../src/asset/image/icon-location.svg'
import iconArrow from '../src/asset/image/icon-arrow.svg'
import axios from 'axios';

function App() {
  const [location, setLocation] = useState('');
  const [inputIp, setInputIp] = useState('')


  // const fetchData = async () => {
  //   try {
  //     const res = await axios.get(`https://wookie.codesubmit.io/ipcheck?ip=${inputIp}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: 'Bearer WookieIP2022'
  //       }
  //     })
  //     setLocation(res)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  const fetchData = () => {
    try{
      fetch(`http://ip-api.com/json/${inputIp}`)
        .then(response => response.json())
        .then(data => setLocation(data))
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // IP Test
  var rx = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
  const isIP = rx.test(inputIp)

  const handleSubmit = (e) => {
    e.preventDefault()

  }

  const mapIcon = L.icon({
    iconUrl: iconLocate,
    iconSize: [33, 40],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
  });

  let center = [location.lat, location.lon];
  return (
    <div>
      <div className='upper-page'>
        <img src={banner} alt='banner' />
      </div>
      <div className='input-ip'>
        <h1>IP Address Tracker</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='IP Address'
            value={inputIp}
            onChange={(e) => setInputIp(e.target.value)}
          />
          <button type='submit' onClick={() => fetchData()} disabled={!isIP}>
            <img src={iconArrow} alt='icon' />
          </button>
        </form>
        <div className='show-detail'>
          <div>
            <p>IP ADDRESS</p>
            <h2>{location.query}</h2>
          </div>
          <div>
            <p>LOCATION</p>
            <h2>{location.regionName}</h2>
          </div>
          <div>
            <p>Time Zone</p>
            <h2>{location.timezone}</h2>
          </div>
          <div style={{ border: 'none' }}>
            <p>ISP</p>
            <h2>{location.isp}</h2>
          </div>
        </div>
      </div>
      {location && <div className='lower-page'>
        <MapContainer
          center={[23, 45]}
          zoom={2}
          style={{ width: '100vw', height: '65vh', zIndex: '0' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=WhudaG1AvZgpeFPYlf14"
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          />
          <ZoomControl position='bottomright' />

          <Marker position={[location.lat, location.lon]} icon={mapIcon} >
            <Popup>
              {location.regionName} <br /> {location.query} <br /> {location.isp}
            </Popup>
          </Marker>
        </MapContainer>
      </div>}
    </div>
  );
}

export default App;
