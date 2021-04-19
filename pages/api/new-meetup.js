import { MongoClient } from "mongodb"

// /api/new-meetup

async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;

        // const { title, image, address, description } = data;

        const client = MongoClient.connect("mongodb+srv://chads:sony1234@cluster0.06sav.mongodb.net/meetups?retryWrites=true&w=majority")
        const db = client.db();

        const meetupsCollection = db.collection("meetups");

        meetupsCollection.insertOne(data);
    }
}

export default handler;