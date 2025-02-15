import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdvertCard from '../src/components/AdvertCard';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('../assets/placeholder.png', () => 'placeholder-image-mock');

describe('AdvertCard', () => {
  const mockAdvert = {
    id: 1,
    name: 'Test Advertisement',
    description: 'Test Description',
    location: 'Test Location',
    type: 'Недвижимость' as const,
    propertyType: 'квартира',
    area: 100,
    rooms: 3,
    price: 1000000,
  };

  it('renders advertisement details correctly', () => {
    render(
      <BrowserRouter>
        <AdvertCard advert={mockAdvert} />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Advertisement')).toBeInTheDocument();
    expect(screen.getByText('Локация: Test Location')).toBeInTheDocument();
  });
});