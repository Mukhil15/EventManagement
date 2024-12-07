import { useEffect, useState } from "react";
import "../css/Eventtable.css";
import axios from "axios";
import SampleEvents from "./SampleEvents";

const EventTable = ({ admin }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    ticketPrice: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {console.log(error);setEvents(SampleEvents)});
  }, []);

  const handleEdit = (event) => {
    setSelectedEvent(event); 
    setEventData(event);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/events/${selectedEvent.id}`,
        eventData
      );
      if (response.status === 200) {
        alert("Event updated successfully!");
        setSelectedEvent(null); 
        setEventData({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          category: "",
          ticketPrice: "",
        });
        axios
          .get("http://localhost:5000/api/events")
          .then((response) => setEvents(response.data));
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Error updating event. Please try again.");
    }
  };

  return (
    <div className="event-table">
      <h2>Events</h2>
      {!selectedEvent && (events.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Category</th>
              <th>Ticket Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{event.location}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.time}</td>
                <td>{event.category}</td>
                <td>${event.ticket_price}</td>
                {admin ? (
                  <td>
                    <button onClick={() => handleEdit(event)}>Edit</button>
                  </td>
                ) : (
                  <td>
                    <button>Register</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No events available.</p>
      ))}

      {selectedEvent && (
        <div className="edit-event-form">
          <h3>Edit Event</h3>
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

            <button type="submit">Update Event</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EventTable;
