import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Middleware för att hantera JSON-begärningar
app.use(express.json());

// Test middleware
app.use((req, res, next) => {
  console.log('middleware hej');
  console.log(req.url);
  console.log(req.method);
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello welcome' });
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Något gick fel vid databasförfrågan' });
  }
});

app.get('/users/add-dummy-data', async (req, res) => {
  try {
    await pool.query(
      'INSERT INTO users (username, email, age) VALUES ($1, $2, $3)',
      ['Bob', 'bob@gmail.com', 30]
    );
    res.json({ message: 'Added dummy data' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Något gick fel vid lägga till dummy data' });
  }
});

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
