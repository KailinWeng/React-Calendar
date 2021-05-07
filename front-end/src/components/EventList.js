import EventListing from "./EventListing.js"

const EventList = (props) => {
    
    return (
        <div className="event-list-popup">
            <h1 className="popup-header">Events</h1>
            
            {
                props.events.map( (event) => {//Returns an event listing for every thing on the passed array
                    return <EventListing event={event} key={event._id} deleteEvent={props.deleteEvent} 
                    updateEvent={props.updateEvent} setDisplayDate={props.setDisplayDate}/>
            } )}

        </div>
    )
}

export default EventList
