import express from 'express';

const app = express();
const PORT = 3000;

// Middleware för att hantera JSON-begärningar
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello welcome' });
});

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
