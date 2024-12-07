import { useState } from "react";
import axios from "axios";
import "../css/AddEventForm.css";

const AddEventForm = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    ticketPrice: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Event Data Submitted:", eventData);

    try {

      const response = await axios.post("http://localhost:5000/api/events", eventData);
      
      if (response.status === 201) {
        setSubmitted(true); 
      }
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Error adding event. Please try again.");
    }
  };

  return (
    <div className="add-event-form">
      <h2>Add Event</h2>
      <p>Fill out the form below to add a new event.</p>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Event Name:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={eventData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={eventData.category}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a Category --</option>
              <option value="Dance">Dance</option>
              <option value="Music">Music</option>
              <option value="Art">Art</option>
              <option value="Workshop">Workshop</option>
              <option value="Sports">Sports</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ticketPrice">Ticket Price (USD):</label>
            <input
              type="number"
              id="ticketPrice"
              name="ticketPrice"
              value={eventData.ticketPrice}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <button type="submit">Add Event</button>
        </form>
      ) : (
        <div className="success-message">
          <h3>Event Added Successfully!</h3>
          <p>Thank you for adding the event. You can add another event if needed.</p>
          <button onClick={() => setSubmitted(false)}>Add Another Event</button>
        </div>
      )}
    </div>
  );
};

export default AddEventForm;
