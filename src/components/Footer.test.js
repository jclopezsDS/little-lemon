import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Footer', () => {
  test('renders the logo with alt text', () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const logo = screen.getByAltText('Little Lemon logo');
    expect(logo).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Menu/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Reservations/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Order/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
  });

  test('renders contact information', () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    expect(screen.getByText(/2395 Maldove Way/i)).toBeInTheDocument();
    expect(screen.getByText(/Chicago Illinois/i)).toBeInTheDocument();
    expect(screen.getByText(/\(629\)-243-6827/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /info@littlelemon.com/i })).toBeInTheDocument();
  });

  test('renders social media links', () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    expect(screen.getByRole('link', { name: /Facebook/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Instagram/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Join us!/i })).toBeInTheDocument();
  });
});