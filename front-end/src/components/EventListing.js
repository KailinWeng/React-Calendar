import {useState} from "react";
import UpdateEvent from "./UpdateEvent";
const EventListing = (props) => {

    //To toggle the update popup
    const [updateEventPopupV, setUpdateEventPopupV] = useState(false);

    //For display purposes
    const monthArray = [
        "January","February","March","April","May","June","July","August","September","October","November","December"
    ]


    return (
        <div className="event-listing">
            <div onClick={
                () => {
                    const newDisplayDate = new Date();
                    newDisplayDate.setFullYear(props.event.year);
                    newDisplayDate.setMonth(props.event.month);

                    props.setDisplayDate(newDisplayDate);
                }
            } className="event-listing-text">
                <b>{props.event.title}</b>
                {"\t"}
                {props.event.description}
                <br/>
                {props.event.day} {monthArray[props.event.month]} {props.event.year }
            </div>
            <div>
                <button className="small-button-edit" onClick={() => {//edits the event; opens the update popup
                    setUpdateEventPopupV(!updateEventPopupV)}} >
                    {"⚙"}
                </button>
                <button className="small-button-delete" onClick={() => {//deletes the event
                    console.log(props.event._id);
                    props.deleteEvent(props.event._id)}}>
                    {"X"}
                </button>
                
            </div>
            {//The update popup
                updateEventPopupV   && <UpdateEvent event={props.event} updateEvent={props.updateEvent}
                updatePopupToggle={ () => {setUpdateEventPopupV(false)}}/>
            }

        </div>
    )
}

export default EventListing
