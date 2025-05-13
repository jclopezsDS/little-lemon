import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

// Mock the updateTimes function and availableTimes prop
const mockUpdateTimes = jest.fn();
const mockAvailableTimes = ["17:00", "18:00", "19:00", "20:00", "21:00"];

describe('BookingForm', () => {
  test('renders all form fields', () => {
    render(<BookingForm availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);

    // Check for presence of labels and inputs
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of People/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Seating preferences/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Additional Comments/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Book Table/i })).toBeInTheDocument();
  });

  test('updates state on input change', () => {
    render(<BookingForm availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);

    const fNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.change(fNameInput, { target: { value: 'John' } });
    expect(fNameInput.value).toBe('John');

    const peopleInput = screen.getByLabelText(/Number of People/i);
    fireEvent.change(peopleInput, { target: { value: '5' } });
    expect(peopleInput.value).toBe('5');
  });

  test('calls updateTimes when date changes', () => {
    render(<BookingForm availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);

    const dateInput = screen.getByLabelText(/Select Date/i);
    fireEvent.change(dateInput, { target: { value: '2025-12-31' } });

    expect(mockUpdateTimes).toHaveBeenCalled();
  });

  test('displays available times correctly', () => {
    render(<BookingForm availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);

    const timeSelect = screen.getByLabelText(/Select Time/i);
    expect(timeSelect).toHaveTextContent("17:00");
    expect(timeSelect).toHaveTextContent("18:00");
    expect(timeSelect).toHaveTextContent("19:00");
    expect(timeSelect).toHaveTextContent("20:00");
    expect(timeSelect).toHaveTextContent("21:00");
  });
});