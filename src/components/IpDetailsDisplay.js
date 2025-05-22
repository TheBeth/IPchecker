import React from 'react';

function IpDetailsDisplay({ locationData }) {
  if (!locationData) {
    return null; // Or some placeholder/loading state
  }

  return (
    <div className='show-detail'>
      <div>
        <p>IP ADDRESS</p>
        <h2>{locationData.query || '-'}</h2>
      </div>
      <div>
        <p>LOCATION</p>
        <h2>{locationData.regionName || '-'}</h2>
      </div>
      <div>
        <p>Time Zone</p>
        <h2>{locationData.timezone || '-'}</h2>
      </div>
      <div style={{ border: 'none' }}>
        <p>ISP</p>
        <h2>{locationData.isp || '-'}</h2>
      </div>
    </div>
  );
}

export default IpDetailsDisplay;
