import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
function MeetupDetails(props) {
    return (
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description} />
    )
}

export async function getStaticPaths() {
    // connect to mongo database
    const client = await MongoClient.connect("mongodb+srv://chads:Sony1234@cluster0.06sav.mongodb.net/meetups?retryWrites=true&w=majority")
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();


    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params:
                { meetupId: meetup._id.toString() }
        }))


    }
}

export async function getStaticProps(context) {

    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect("mongodb+srv://chads:Sony1234@cluster0.06sav.mongodb.net/meetups?retryWrites=true&w=majority")
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId), })

    client.close();
    // fetch data for a single meetup
    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            },

        },
    };
}

export default MeetupDetails;