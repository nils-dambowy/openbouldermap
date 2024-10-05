import { MongoClient } from 'mongodb';

// Replace the uri string with your connection string.
const uri = "mongodb+srv://ndambowy:rKx4CWdLVIIU4b5k@openbouldermap.oklbk.mongodb.net/?retryWrites=true&w=majority&appName=openbouldermap";
const client = new MongoClient(uri);

// Generic function to insert a movie into the database
export async function insertMovie(movieData) {
  try {
    await client.connect();
    const database = client.db('sample_mflix'); // Replace with your DB name
    const movies = database.collection('movies'); // Replace with your collection name

    // Insert the movie
    const result = await movies.insertOne(movieData);
    console.log(`Movie inserted with the id: ${result.insertedId}`);
  } catch (error) {
    console.error('Error inserting movie:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Example usage
// const movieData = { title: 'Jackie Robinson', year: 1950 };
// insertMovie(movieData).catch(console.dir);