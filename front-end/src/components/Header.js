



const Header = (props) => {
    

    
    return (
        <div className="header">
            
            <h1 /*Displays the date*/>{dayOfWeek(props.displayDate.getDay())}, {monthOfYear(props.displayDate.getMonth())} {formatDate(props.displayDate.getDate())} {props.displayDate.getFullYear()} </h1>
            <button className="button" onClick={ props.addPopupToggle}/*Displays the add event button*/>
                {props.addPopupV ? "Cancel" : "Add New Event"}
            </button>
            <button className="button" onClick={ props.fullEventPopupToggle}/*Displays the event list button*/>
                {props.fullEventListV ? "Cancel" : "View Events"}
            </button>
            <button className="button" onClick={ props.jumpToPopupToggle}/*Displays the jump to button*/>
                {props.jumpToV ? "Cancel" : "Jump To"}
            </button>
            <div>
                <button className="arrow" onClick={ props.onBack}/*Back button */>
                    {"<"}
                </button>
                <button className="arrow"  onClick={ props.onForward}/*Forward button */>
                    {">"}
                </button>
            </div>
        </div>
    )
}

function dayOfWeek( x ) {

    let weekday = "";
    switch (x) {
        
        case 0:
            weekday = "Sunday";
            break;
        case 1:
            weekday = "Monday";
            break;
        case 2:
            weekday = "Tuesday";
            break;
        case 3:
            weekday = "Wednesday";
            break;
        case 4:
            weekday = "Thursday";
            break;
        case 5:
            weekday = "Friday";
            break;
        case 6:
            weekday = "Saturday";
            break;
        default:
            weekday = "Sunday";
            break;
    }
    return weekday;
}

function monthOfYear( x ) {

    let month = "";
    switch (x) {
        
        case 0:
            month = "January";
            break;
        case 1:
            month = "February";
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;
        default :
            month = "January";
            break;
        
    }
    return month;
}

function formatDate (x) {
    const formattedDate = "" + x;
    if ((x >= 10 && x < 20) ){
        return formattedDate + "th"
    }
    switch (x % 10){
        case 1:
            return formattedDate + "st";
            
        case 2:
            return formattedDate + "nd";
            
        case 3:
            return formattedDate + "rd";
        
            
    }
    return formattedDate + "th";
    

   



}




export default Header

