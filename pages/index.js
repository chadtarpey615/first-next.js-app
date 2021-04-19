import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";



// const DUMMY_MEETUPS = [
//     {
//         id: "m1",
//         title: "A First Meetup",
//         image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
//         address: "some address 5, 12345 some city",
//         description: "This is a first meetup"

//     },
//     {
//         id: "m2",
//         title: "A Second Meetup",
//         image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
//         address: "some address 10, 12345 some city",
//         description: "This is a second meetup"

//     }
// ]
function HomePage(props) {
    // const [loadedMeetups, setLoadedMeetups] = useState([])
    // useEffect(() => {
    //     // send a http request and fetch data 
    //     setLoadedMeetups(DUMMY_MEETUPS);

    // }, [])
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse a huge list of highly active Reat meetups!!!" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>

    )
}

// export async function getServerSideProps(context) {
//     // everything in this function runs on the server not on the client side 

//     const req = context.req
//     const res = context.res
//     // fetch data from an api
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// }

export async function getStaticProps() {
    // fetch data from an api
    const client = await MongoClient.connect("mongodb+srv://chads:Sony1234@cluster0.06sav.mongodb.net/meetups?retryWrites=true&w=majority")
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        // number of seconds next js will wait re generate data on the server 
        revalidate: 1
    };
}

export default HomePage;