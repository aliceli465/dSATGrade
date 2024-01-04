//for inserting og data into mongo cluster
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://nameal1234:prepwithjen@dsatcluster.mpkyhge.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function insertDocuments() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("questions"); // Replace with your actual database name
    const collection = database.collection("bb4"); // Replace with your actual collection name

    // Generate 27 documents with a for loop
    const documents = [];
    for (let i = 1; i <= 27; i++) {
      documents.push({ "section": "rw", "question": i, "missed": 0 });
      documents.push({ "section": "rwEasy", "question": i, "missed": 0 });
      documents.push({ "section": "rwHard", "question": i, "missed": 0 });
    }
    for (let i = 1; i <= 22; i++) {
        documents.push({ "section": "math", "question": i, "missed": 0 });
        documents.push({ "section": "mathEasy", "question": i, "missed": 0 });
        documents.push({ "section": "mathHard", "question": i, "missed": 0 });
    }

    // Insert the documents into the collection
    const result = await collection.insertMany(documents);

    console.log(`${result.insertedCount} documents inserted successfully`);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

insertDocuments().catch(console.error);
