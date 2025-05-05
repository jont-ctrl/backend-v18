import express from 'express';
import { Client } from 'pg';

const app = express();
const PORT = 3000;

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

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
