import React from 'react';
import { render, screen } from '@testing-library/react';
import IpDetailsDisplay from './IpDetailsDisplay';

describe('IpDetailsDisplay', () => {
  // Test Case 1: Renders with valid data
  it('should render correctly with valid locationData', () => {
    const mockLocationData = {
      query: '8.8.8.8',
      regionName: 'California',
      timezone: 'America/Los_Angeles',
      isp: 'Google LLC',
    };

    render(<IpDetailsDisplay locationData={mockLocationData} />);

    // Check for IP ADDRESS
    expect(screen.getByText('IP ADDRESS')).toBeInTheDocument();
    expect(screen.getByText(mockLocationData.query)).toBeInTheDocument();

    // Check for LOCATION
    expect(screen.getByText('LOCATION')).toBeInTheDocument();
    expect(screen.getByText(mockLocationData.regionName)).toBeInTheDocument();

    // Check for Time Zone
    expect(screen.getByText('Time Zone')).toBeInTheDocument(); // Note: "Time Zone" in component vs "TIMEZONE" in task, using component's text
    expect(screen.getByText(mockLocationData.timezone)).toBeInTheDocument();

    // Check for ISP
    expect(screen.getByText('ISP')).toBeInTheDocument();
    expect(screen.getByText(mockLocationData.isp)).toBeInTheDocument();
  });

  // Test Case 2: Renders with missing data (placeholders)
  it('should render placeholders when locationData fields are missing', () => {
    const mockLocationDataMissing = {
      query: null,
      regionName: undefined,
      timezone: '',
      isp: null,
    };

    render(<IpDetailsDisplay locationData={mockLocationDataMissing} />);

    // The component uses '|| "-"' for undefined/null/empty string values
    expect(screen.getByText('IP ADDRESS')).toBeInTheDocument();
    expect(screen.getAllByText('-')[0]).toBeInTheDocument(); // query will be '-'

    expect(screen.getByText('LOCATION')).toBeInTheDocument();
    expect(screen.getAllByText('-')[1]).toBeInTheDocument(); // regionName will be '-'

    expect(screen.getByText('Time Zone')).toBeInTheDocument();
    expect(screen.getAllByText('-')[2]).toBeInTheDocument(); // timezone will be '-'

    expect(screen.getByText('ISP')).toBeInTheDocument();
    expect(screen.getAllByText('-')[3]).toBeInTheDocument(); // isp will be '-'
  });

  // Test Case 3: Renders null when locationData itself is null
  it('should render null when locationData is null', () => {
    const { container } = render(<IpDetailsDisplay locationData={null} />);

    // When locationData is null, the component returns null, so the container should be empty.
    expect(container.firstChild).toBeNull();
  });
});
