import Header from "./components/Header.js";
import AddEvent from "./components/AddEvent.js"
import Calendar from "./components/Calendar.js"
import EventList from "./components/EventList.js";
import JumpTo from "./components/JumpTo.js"

import {useState, useEffect} from "react";

function App () {


  //Visibility of certain elements; Toggled by buttons in the header and other elements
  const [addPopupV, setAddPopupV] = useState(false);
  const [jumpToV, setJumpToV] = useState(false);
  const [fullEventListV, setFullEventListV] = useState(false);
  const [dayEventListV, setDayEventListV] = useState(false);

  //The events and the "current" date
  const [events, setEvents] = useState([]);
  const [displayDate, setDisplayDate] = useState(new Date());

  //The events of a particular day (not specifically the display date)
  const [dayEvents, setDayEvents] = useState();


  //gets events from the server
  useEffect( () => {
    
    const getEvents = async () => {
      const eventsFromServer = await fetchEvents();
      setEvents(eventsFromServer);

    }
    
    getEvents();
    
  }, [])

  //CRUD operations, no single read because it would never be used
  const fetchEvents = async() => {
    const res = await fetch("http://localhost:5000/api/events")
    const data = await res.json();

    return data;

  }

  const addEvent = async (event) => {
    const res = await fetch("http://localhost:5000/api/events/", {
      method: "POST",
      headers: {
        "Content-type" : "application/json"
      },
      body: JSON.stringify(event)
    });

    const data = await res.json();
    
    const getEvents = async () => {
      const eventsFromServer = await fetchEvents();
      setEvents(eventsFromServer);

    }
    
    getEvents();//Find a better way to do this
    
  }

  const updateEvent = async (event, id) => {
    const res = await fetch(`http://localhost:5000/api/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-type" : "application/json"
      },
      body: JSON.stringify(event)
    });

    const data = await res.json();

    //figure out a way to refresh
    const getEvents = async () => {
      const eventsFromServer = await fetchEvents();
      setEvents(eventsFromServer);

    }
    
    getEvents();//Find a better way to do this
  }

  const deleteEvent =  async (id) => {
    const res = await fetch(`http://localhost:5000/api/events/${id}`,
    {
      method: "DELETE"
    })

    if (res.status === 200){
      setEvents(events.filter((event => {return event._id !== id})));
    }
    else{
      alert("Could not delete task");
    }
  };
  
  

  
  
  
  return (
    <>
    
    <Header className="header" /*Displays date and buttons */

        addPopupToggle={
          () => {
            setAddPopupV(!addPopupV)
            setFullEventListV(false);
            setDayEventListV(false);
            setJumpToV(false);
        }}

        fullEventPopupToggle={() => {
          setFullEventListV(!fullEventListV);
          setAddPopupV(false);
          setDayEventListV(false);
          setJumpToV(false);
        }} 

        jumpToPopupToggle = {
          () => {
            setJumpToV(!jumpToV);
            setFullEventListV(false);
            setAddPopupV(false);
            setDayEventListV(false);
            
        }}

        //header props
        setDisplayDate={setDisplayDate} displayDate={displayDate} addPopupV={addPopupV} fullEventListV={fullEventListV} 
        jumpToV={jumpToV} onBack={backMonth} onForward={forwardMonth}
    />

    
    {addPopupV   && <AddEvent displayDate={displayDate} addEvent={addEvent} addPopupToggle={
      //the popup used for adding events
          () => {
            setAddPopupV(false);//This is different from the one used in the header
            setFullEventListV(false);
            setDayEventListV(false);
            setJumpToV(false);
        }}/>}

    {fullEventListV   && <EventList events={events} deleteEvent={deleteEvent} updateEvent={updateEvent} setDisplayDate={setDisplayDate}
      //The popup that displays all the events
    />}

    {jumpToV && <JumpTo setDisplayDate={setDisplayDate} displayDate={displayDate} jumpToPopupToggle = {
      //popup allows users to go to whichever month they please
          () => {
            setJumpToV(false);//This is different from the one used in the header
            setFullEventListV(false);
            setAddPopupV(false);
            setDayEventListV(false);
            
        }}/>}

    {(dayEventListV && dayEvents.length > 0 ) && <EventList events={dayEvents} deleteEvent={deleteEvent}
    //popup shows up when a date with an event registered is clicked
     updateEvent={updateEvent} setDisplayDate={setDisplayDate} />}
    <Calendar displayDate={displayDate} events={events} dayEventListV={dayEventListV} dayEventPopupToggle={() => {
      //The actual calendar interface itself
      setDayEventListV(true);
      setFullEventListV(false);
      setAddPopupV(false);
      setJumpToV(false);
    }} setDayEvents={ (events) => {
      setDayEvents(events);
    }}/>
      
    </>
  );


  //Used to go back a month
  function backMonth () {

    const newDate = new Date();

    //FIX THIS FOR THE LOVE OF GOD
    newDate.setFullYear(displayDate.getFullYear());
    newDate.setMonth(displayDate.getMonth());
    newDate.setDate(displayDate.getDate());



    if (newDate.getMonth() > 0){
      newDate.setMonth(newDate.getMonth() - 1);
    }
    else{
      newDate.setFullYear(newDate.getFullYear() - 1);
      newDate.setMonth(11);
    }

    setDisplayDate(newDate);

  }

  //used to go forward a month
  function forwardMonth () {
    const newDate = new Date();
    
    //HERE TOO
    newDate.setFullYear(displayDate.getFullYear());
    newDate.setMonth(displayDate.getMonth());
    newDate.setDate(displayDate.getDate());
    
    

    if (newDate.getMonth() < 11){
      newDate.setMonth(newDate.getMonth() + 1);
    }
    else{
      newDate.setFullYear(newDate.getFullYear() + 1);
      newDate.setMonth(0);
    }

    setDisplayDate(newDate);
  }
}




export default App;
