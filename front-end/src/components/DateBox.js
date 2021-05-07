
const DateBox = (props) => {

    
    //filters for all the events on a particular day from the list of events for the month
    const relevantEvents = props.currentEvents.filter( (event) => {
        return (event.day === props.date);
    } );
    
    return (
        <>
            
            <div className={props.date > 0 ? "date-box" : "empty-date-box"} onClick={() => {//Sets the targetted day event list in the main app and opens it
                props.setDayEvents(relevantEvents);
                props.dayEventPopupToggle();
            }}>
                { (props.date > 0) ? props.date : "" }
                { relevantEvents.map( (event) => {
                    
                        //lists all the event on the particular day
                        return <div key={event._id} className="date-box-event">{event.title}</div>; //might be really crusty I dont know
                    
                })}
                
            </div>
            
        </>
    )

    
}



export default DateBox
