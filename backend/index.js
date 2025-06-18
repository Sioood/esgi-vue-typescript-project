const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());  // pour parser le JSON

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
