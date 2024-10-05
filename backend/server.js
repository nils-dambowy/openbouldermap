const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
require('dotenv').config();

const port = process.env.MONGOPORT;
const uri = process.env.MONGO_URL;  

app.use(cors());
app.use(express.json());

let db;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db('openbouldermap');  
    console.log('Connected to MongoDB');
  })
  .catch(error => console.error('Error connecting to MongoDB:', error));

app.post('/add-movie', async (req, res) => {
  try {
    const movie = req.body;
    const result = await db.collection('boulders').insertOne(movie);
    res.status(200).json({ message: 'Movie added!', id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error adding movie', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});