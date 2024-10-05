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

MongoClient.connect(uri)
  .then(client => {
    db = client.db('openbouldermap');  
    console.log('Connected to MongoDB');
  })
  .catch(error => console.error('Error connecting to MongoDB:', error));


app.post('/add-boulder', async (req, res) => {
  try {
    const boulder = req.body;
    const result = await db.collection('boulders').insertOne(boulder);
    res.status(200).json({ message: 'Boulder added!', id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error adding boulder', error });
  }
});

app.get('/boulders', async (req, res) => {
    try {
      const boulders = await db.collection('boulders').find().toArray();
      res.status(200).json(boulders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching boulders', error });
    }
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});