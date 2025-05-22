import axios from 'axios';
import { getIpInfo } from './ipService';
import { IP_API_BASE_URL } from '../constants';

jest.mock('axios');

describe('getIpInfo', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test Case 1: Successful API call with an IP
  it('should return IP data when called with a valid IP address', async () => {
    const mockIp = '8.8.8.8';
    const mockResponseData = {
      query: mockIp,
      status: 'success',
      country: 'United States',
      regionName: 'California',
      city: 'Mountain View',
      isp: 'Google LLC',
      org: 'Google LLC',
      timezone: 'America/Los_Angeles',
    };
    axios.get.mockResolvedValueOnce({ data: mockResponseData });

    const result = await getIpInfo(mockIp);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${IP_API_BASE_URL}${mockIp}`);
    expect(result).toEqual(mockResponseData);
  });

  // Test Case 2: Successful API call without an IP (current user)
  it('should return current user IP data when called without an IP address', async () => {
    const mockResponseData = {
      query: '123.123.123.123', // Example current IP
      status: 'success',
      country: 'United States',
      regionName: 'Virginia',
      city: 'Ashburn',
      isp: 'Some ISP',
      org: 'Some Org',
      timezone: 'America/New_York',
    };
    axios.get.mockResolvedValueOnce({ data: mockResponseData });

    const result = await getIpInfo(''); // Or getIpInfo() or getIpInfo(null)

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(IP_API_BASE_URL);
    expect(result).toEqual(mockResponseData);
  });

  // Test Case 3: API call failure
  it('should throw an error when the API call fails', async () => {
    const mockIp = 'invalid-ip';
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    // We expect getIpInfo to throw an error
    await expect(getIpInfo(mockIp)).rejects.toThrow(errorMessage);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${IP_API_BASE_URL}${mockIp}`);
  });

  it('should handle API returning a "fail" status', async () => {
    const mockIp = '10.0.0.1'; // A private IP, which ip-api.com might return 'fail' for
    const mockResponseData = {
      status: 'fail',
      message: 'private range',
      query: mockIp,
    };
    axios.get.mockResolvedValueOnce({ data: mockResponseData });

    const result = await getIpInfo(mockIp);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${IP_API_BASE_URL}${mockIp}`);
    expect(result).toEqual(mockResponseData); // App.js handles this 'fail' status
  });
});
