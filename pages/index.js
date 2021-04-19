// import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";


const DUMMY_MEETUPS = [
    {
        id: "m1",
        title: "A First Meetup",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
        address: "some address 5, 12345 some city",
        description: "This is a first meetup"

    },
    {
        id: "m2",
        title: "A Second Meetup",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
        address: "some address 10, 12345 some city",
        description: "This is a second meetup"

    }
]
function HomePage(props) {
    // const [loadedMeetups, setLoadedMeetups] = useState([])
    // useEffect(() => {
    //     // send a http request and fetch data 
    //     setLoadedMeetups(DUMMY_MEETUPS);

    // }, [])
    return (

        <MeetupList meetups={props.meetups} />

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
    return {
        props: {
            meetups: DUMMY_MEETUPS
        },
        // number of seconds next js will wait re generate data on the server 
        revalidate: 1
    };
}

export default HomePage;