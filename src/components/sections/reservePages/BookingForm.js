import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Box } from '@mui/material'; // Import Material UI components

export default function ReservationForm(props) {
  const navigate = useNavigate(); // Initialize useNavigate
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [people, setPeople] = useState(1);
  const [date, setDate] = useState("");
  const [occasion, setOccasion] = useState("");
  const [preferences, setPreferences] = useState("");
  const [comments, setComments] = useState("");

  const [finalTime, setFinalTime] = useState(
    props.availableTimes.map((times) => <MenuItem key={times} value={times}>{times}</MenuItem>)
  );

  function handleDateChange(e) {
    setDate(e.target.value);

    var stringify = e.target.value;
    const date = new Date(stringify);

    props.updateTimes(date);

    setFinalTime(props.availableTimes.map((times) => <MenuItem key={times} value={times}>{times}</MenuItem>));
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission

    // Basic validation using HTML5 constraint validation API
    if (e.target.checkValidity()) {
      // Gather form data
      const formData = {
        fName,
        lName,
        email,
        tel,
        people,
        date,
        time: document.getElementById('time').value, // Get selected time
        occasion,
        preferences,
        comments,
      };

      // Assuming a submitForm prop exists to handle the data
      // If not, this is where you would send data to a backend or state manager
      console.log("Form Data:", formData); // Log data for demonstration

      // Call the submit function passed from parent (if any)
      if (props.submitForm) {
        props.submitForm(formData);
      }

      // Navigate to confirmation page after successful submission
      navigate('/confirmation');

    } else {
      // Form is invalid, browser will show validation messages
      console.log("Form is invalid. Please check the fields.");
    }
  }

  return (
    <Box component="form" className="reservation-form" onSubmit={handleSubmit} sx={{
      '& .MuiTextField-root, & .MuiFormControl-root': {
        m: 1,
        width: '100%',
      },
      padding: 2,
      border: '1px solid #ccc',
      borderRadius: 1,
      maxWidth: 600,
      margin: 'auto',
    }}> {/* Add onSubmit handler and MUI Box */}
      <Typography variant="h4" gutterBottom>Book a Table</Typography> {/* Add a heading */}
      <TextField
        label="First Name"
        id="fName"
        placeholder="First Name"
        required
        inputProps={{ minLength: 2, maxLength: 50 }}
        value={fName}
        onChange={(e) => setFName(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Last Name"
        id="lName"
        placeholder="Last Name"
        inputProps={{ minLength: 2, maxLength: 50 }}
        value={lName}
        onChange={(e) => setLName(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Email"
        type="email"
        id="email"
        placeholder="Email"
        value={email}
        required
        inputProps={{ minLength: 4, maxLength: 200 }}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Phone Number"
        type="tel"
        id="tel"
        placeholder="(xxx)-xxx-xxxx"
        value={tel}
        required
        inputProps={{ minLength: 10, maxLength: 25 }}
        onChange={(e) => setTel(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Number of People"
        type="number"
        id="people"
        placeholder="Number of People"
        value={people}
        required
        inputProps={{ min: 1, max: 100 }}
        onChange={(e) => setPeople(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Select Date"
        type="date"
        id="date"
        required
        value={date}
        onChange={handleDateChange}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="time-label">Select Time</InputLabel>
        <Select
          labelId="time-label"
          id="time"
          required
          label="Select Time"
        >
          {finalTime}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="occasion-label">Occasion</InputLabel>
        <Select
          labelId="occasion-label"
          id="occasion"
          value={occasion}
          label="Occasion"
          onChange={(e) => setOccasion(e.target.value)}
        >
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="Birthday">Birthday</MenuItem>
          <MenuItem value="Anniversary">Anniversary</MenuItem>
          <MenuItem value="Engagement">Engagement</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="preferences-label">Seating preferences</InputLabel>
        <Select
          labelId="preferences-label"
          id="preferences"
          value={preferences}
          label="Seating preferences"
          onChange={(e) => setPreferences(e.target.value)}
        >
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="Indoors">Indoors</MenuItem>
          <MenuItem value="Outdoor (Patio)">Outdoor (Patio)</MenuItem>
          <MenuItem value="Outdoor (Sidewalk)">Outdoor (Sidewalk)</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Additional Comments"
        id="comments"
        placeholder="Additional Comments"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />

      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" display="block" gutterBottom>
          Note: You cannot edit your reservation after submission. Please
          double-check your answer before submitting your reservation request.
        </Typography>
        <Button variant="contained" type="submit" className="action-button"> {/* Use MUI Button */}
          Book Table
        </Button>
      </Box>
    </Box>
  );
}
