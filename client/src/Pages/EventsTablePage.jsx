import EventTable from "../Components/EventTable"
import TopBar from "../Components/TopBar"

const EventsTablePage = () => {
  return (
    <div>
        <TopBar/>
        <EventTable admin={true}/>
    </div>
  )
}

export default EventsTablePage
