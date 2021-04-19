import NewMeetupForm from "../../components/meetups/NewMeetupForm"

function NewMeetupPage() {
    function addMeetupHandler(data) {
        console.log(data)
    }
    return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}

export default NewMeetupPage;