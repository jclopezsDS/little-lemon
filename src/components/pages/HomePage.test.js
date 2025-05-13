import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import Heading from '../sections/headingPages/Heading';
import Specials from '../sections/headingPages/Specials';
import Testimonials from '../sections/headingPages/Testimonials';
import About from '../sections/headingPages/About';

// Mock the child components to simplify testing HomePage
jest.mock('../sections/headingPages/Heading', () => () => <div data-testid="heading-section"></div>);
jest.mock('../sections/headingPages/Specials', () => () => <div data-testid="specials-section"></div>);
jest.mock('../sections/headingPages/Testimonials', () => () => <div data-testid="testimonials-section"></div>);
jest.mock('../sections/headingPages/About', () => () => <div data-testid="about-section"></div>);


describe('HomePage', () => {
  test('renders Heading, Specials, Testimonials, and About components', () => {
    render(<HomePage />);

    // Check if the mocked child components are rendered
    expect(screen.getByTestId('heading-section')).toBeInTheDocument();
    expect(screen.getByTestId('specials-section')).toBeInTheDocument();
    expect(screen.getByTestId('testimonials-section')).toBeInTheDocument();
    expect(screen.getByTestId('about-section')).toBeInTheDocument();
  });
});