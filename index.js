require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@learning.9ft5due.mongodb.net/?appName=Learning`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const visaCollection = client.db("visaDatabase").collection("visas");
        const userCollection = client.db("userDatabase").collection("users");
        const appliedVisaCollection = client.db("appliedVisaDatabase").collection("appliedVisas");

        userCollection
        app.get('/users', async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result);
        })
        app.post('/users', async (req, res) => {
            const newUserInfo = req.body;
            const result = await userCollection.insertOne(newUserInfo);
            console.log(newUserInfo);
            res.send(result);
        })


        // visaCollection
        app.get('/visas', async (req, res) => {
            const result = await visaCollection.find().toArray();
            res.send(result);
        })

        app.post('/visas', async (req, res) => {
            const newVisaInfo = req.body;
            const result = await visaCollection.insertOne(newVisaInfo);
            console.log(newVisaInfo);
            res.send(result);
        })
        // await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send("Fly-right server is on...");
})
app.listen(port, () => {
    console.log(`Server running on : ${port}`);
})