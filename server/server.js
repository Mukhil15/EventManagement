import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const PORT = 5000;

app.use(express.json());
import cors from 'cors';
app.use(cors());

const dbConfig = {
    host: 'localhost', 
    user: '',    
    password: '', 
    database: '',  
};

let connection;
const connectToDatabase = async () => {
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected to MySQL database.');
    } catch (error) {
        console.error('Error connecting to database:', error.message);
    }
};
await connectToDatabase();



app.post('/api/events', (req, res) => {
    const { title, description, date, time, location, category, ticketPrice } = req.body;
  
    const query = `
      INSERT INTO Events (title, description, date, time, location, category, ticket_price)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    connection.execute(query, [title, description, date, time, location, category, ticketPrice], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to add event' });
      }
      res.status(201).json({ message: 'Event added successfully', eventId: result.insertId });
    });
  });

app.get('/api/events', async (req, res) => {
    const query = 'SELECT * FROM Events';
    try {
        const [rows] = await connection.execute(query);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/events/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Events WHERE id = ?';
    try {
        const [rows] = await connection.execute(query, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/events/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, location, date, time, category, ticket_price } = req.body;
    const query = `
        UPDATE Events 
        SET title = ?, description = ?, location = ?, date = ?, time = ?, category = ?, ticket_price = ?
        WHERE id = ?
    `;
    try {
        const [result] = await connection.execute(query, [
            title, description, location, date, time, category, ticket_price, id,
        ]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ message: 'Event updated successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
