const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(express.json());

let db;

MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('Connected to MongoDB');
    db = client.db('gameResults');
});

app.post('/results', (req, res) => {
    const results = req.body;

    db.collection('results').insertOne(results, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error storing results');
            return;
        }

        res.status(200).send('Results stored successfully');
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
