import React from 'react';
import iconArrow from '../asset/image/icon-arrow.svg';

function IpInputForm({ inputIp, setInputIp, handleSearch, isIPValid }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(); // This will call fetchData(inputIp) in App.js
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='IP Address'
        value={inputIp}
        onChange={(e) => setInputIp(e.target.value)}
      />
      <button type='submit' disabled={!isIPValid && !!inputIp}>
        <img src={iconArrow} alt='icon' />
      </button>
    </form>
  );
}

export default IpInputForm;
