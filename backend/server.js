const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;  // Your MongoDB URI from Railway

app.use(cors());
app.use(express.json());

let db;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db('your-database-name');  // Replace with your actual DB name
    console.log('Connected to MongoDB');
  })
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Example route to add a document to a MongoDB collection
app.post('/add-movie', async (req, res) => {
  try {
    const movie = req.body;
    const result = await db.collection('movies').insertOne(movie);
    res.status(200).json({ message: 'Movie added!', id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error adding movie', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});