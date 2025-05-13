import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the Navigation component as it's tested separately
jest.mock('./Navigation', () => ({ device }) => (
  <div data-testid={`navigation-${device}`}>Navigation for {device}</div>
));

describe('Navbar', () => {
  test('renders the logo with alt text', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    const logo = screen.getByAltText('Little Lemon logo');
    expect(logo).toBeInTheDocument();
  });

  test('renders the hamburger icon initially', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    const hamburgerIcon = screen.getByAltText('Navigation Bar');
    expect(hamburgerIcon).toBeInTheDocument();
    expect(hamburgerIcon).toHaveAttribute('src', 'hamburger.png'); // Assuming the mock returns the filename
  });

  test('toggles the navigation menu on button click', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    const toggleButton = screen.getByRole('button', { name: /Navigation Bar/i });
    const hamburgerIcon = screen.getByAltText('Navigation Bar');

    // Initially, mobile navigation is not rendered
    expect(screen.queryByTestId('navigation-mobile')).not.toBeInTheDocument();
    expect(hamburgerIcon).toHaveAttribute('src', 'hamburger.png');

    // Click the button to open the menu
    fireEvent.click(toggleButton);

    // Mobile navigation should be rendered and icon should change
    expect(screen.getByTestId('navigation-mobile')).toBeInTheDocument();
    expect(hamburgerIcon).toHaveAttribute('src', 'close.png'); // Assuming the mock returns the filename

    // Click the button again to close the menu
    fireEvent.click(toggleButton);

    // Mobile navigation should not be rendered again
    expect(screen.queryByTestId('navigation-mobile')).not.toBeInTheDocument();
    expect(hamburgerIcon).toHaveAttribute('src', 'hamburger.png');
  });

  test('renders desktop navigation', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    expect(screen.getByTestId('navigation-desktop')).toBeInTheDocument();
  });
});