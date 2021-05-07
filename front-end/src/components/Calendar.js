import DateBox from "./DateBox";


const Calendar = (props) => {
    
    //Get and store all events for the month on display
    const x = getCurrentEvents();
   
    const currentEvents = [...x];
    
    
    
    
   

    //Get the first day of the month
    const dummyDate = new Date();
    dummyDate.setMonth(props.displayDate.getMonth());
    dummyDate.setFullYear(props.displayDate.getFullYear());
    dummyDate.setDate(1);
    const startDay = dummyDate.getDay();



    //List of number of days in each month
    const daysPerMonth = [31,28,31,30,31,30,31,31,30,31,30,31]
   
   
    
    
    return (
        //Maps an array of dates to date box components
        //The entire months events are passed to each one
        <div className="calendar">
        {
            generateDateBoxes(startDay, calculateDays(props.displayDate.getFullYear(), props.displayDate.getMonth()))
            .map((date) => {
                return <DateBox
                    date={date} key={date} currentEvents={currentEvents}
                    dayEventPopupToggle={props.dayEventPopupToggle} dayEventListV={props.dayEventListV}
                    setDayEvents={props.setDayEvents}
                />
            }  
            )
        }



        
      </div>

    )

    //Used to calculate the days in a particular month
    function calculateDays ( year, month  ) {
        
        if (month !== 1){
            return daysPerMonth[month];
        }
        else{
            if (year % 4 === 0){
                if ( year % 100 === 0 && year % 400 !== 0){
                    return daysPerMonth[month];
                }
                else{
                    return daysPerMonth[month] + 1;
                }
            }
            else{
                return daysPerMonth[month];
            }
        }
    }

    //Used to generate an array of dates based on a length and a start day
    function generateDateBoxes( startDay , length){
        const dateBoxes = [];

        for (let k = 1 - (startDay); k <= length; k++){
            
                dateBoxes.push(k);
            
        }

        return dateBoxes;
    }

    function getCurrentEvents () { 
        
        const events = props.events.filter( (event) => {
            
            return (event.year === props.displayDate.getFullYear() && event.month === props.displayDate.getMonth()); //maybe need to parseint whoknows
        });
        
        return events;
    }


    

    
    

    
}

export default Calendar
