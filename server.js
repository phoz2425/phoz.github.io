// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

const uri = 'mongodb+srv://2022100485:linemans024@lnsapp.8xktspp.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/data', async (req, res) => {
    await client.connect();
    const collection = client.db("test").collection("devices");
    const data = await collection.find({}).toArray();
    res.json(data);
    await client.close();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
