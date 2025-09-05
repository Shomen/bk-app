import { TextEncoder, TextDecoder } from 'util';
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;
import {render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Services from './Services';
import '@testing-library/jest-dom';

jest.mock('../assets/data.json', () => ([
  {
    id: 1,
    category: "Fitness",
    name: "Service One",
    description: "High-intensity interval training session.",
    price: 40,
    image: "https://via.placeholder.com/150",
    duration: "45 minutes",
    address: "123 Fitness St, Workout City"
    },
    {
     id:2,
    category: "Wellness",
    name: "Service Two",
    description: "Relaxing full-body spa therapy.",
    price: 120,
    image: "https://via.placeholder.com/150",
    duration: "1.5 hours",
    address: "456 Wellness Ave, Relax Town"
    }
]));

describe('Services Page', () => {
  test('renders services page with correct title', () => {
    render(
      <MemoryRouter>
        <Services />
      </MemoryRouter>
    );
    const titleElement = screen.getByText(/Our Services/i);
    expect(titleElement).toBeInTheDocument();
  });
    test('renders service cards', () => {
    render(
      <MemoryRouter>
        <Services />
      </MemoryRouter>
    );
    const serviceOne = screen.getByText(/Service One/i);
    const serviceTwo = screen.getByText(/Service Two/i);
    expect(serviceOne).toBeInTheDocument();
    expect(serviceTwo).toBeInTheDocument();
  });
  test('displays service descriptions and prices', () => {
    render(
      <MemoryRouter>
        <Services />
      </MemoryRouter>
    );
    expect(screen.getByText(/High-intensity interval training session./i)).toBeInTheDocument();
    expect(screen.getByText(/\$40/i)).toBeInTheDocument();
    expect(screen.getByText(/Relaxing full-body spa therapy./i)).toBeInTheDocument();
    expect(screen.getByText(/\$120/i)).toBeInTheDocument();
  });
  test('renders service images', () => {
    render(
      <MemoryRouter>
        <Services />
      </MemoryRouter>
    );
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(2);
    expect(images[0]).toHaveAttribute('src', 'https://via.placeholder.com/150');
    expect(images[1]).toHaveAttribute('src', 'https://via.placeholder.com/150');
  });
  test('booking button is present on each service card', () => {
    render(
      <MemoryRouter>
        <Services />
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole('button', { name: /Book Now/i });
    expect(buttons.length).toBe(2);
  });
});