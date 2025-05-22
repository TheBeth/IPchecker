import axios from 'axios';
import { IP_API_BASE_URL } from '../constants';

export const getIpInfo = async (ipAddress) => {
  let url = IP_API_BASE_URL;
  if (ipAddress) {
    url += ipAddress;
  }

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching IP info:', error);
    throw error;
  }
};
