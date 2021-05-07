import {useState} from 'react';

const AddEvent = (props) => {
    //state objects for the new event being constructed
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState(props.displayDate.getFullYear());
    const [month, setMonth] = useState({});
    const [day, setDay] = useState(props.displayDate.getDate());


    const daysPerMonth = [31,28,31,30,31,30,31,31,30,31,30,31]

    //Called when the form is submitted
    function submission (e) {
        e.preventDefault();

        
        //checks if a date is present
        if (!title){
            alert("Please add a title");
            return;

        }

        //checks if a date is present
        if (!betterParse(year) || betterParse(month) < 0 || !betterParse(day)){
            alert("Specify a date");
            return;
        }
        
        //checks if the day is valid
        if (betterParse(day) < 1 || betterParse(day) > calculateDays(betterParse(year),betterParse(month))){
            alert("Invalid date");
            return;
        }
        

        //adds the event and closes the popup
        props.addEvent({title,description,year,month,day});
       
        props.addPopupToggle();
    }

    

    return (
        <form className="add-event-popup" onSubmit={submission}>
            <h1 className="popup-header">Add a new Event</h1>
            <div className='text-box'>
                <label>Title</label>
                <input
                type='text'
                placeholder='...'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className='text-box'>
                <label>Description</label>
                <input
                type='text'
                placeholder='...'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className='text-box'>
                <label>Year</label>
                <input
                type='text'
                placeholder='...'
                value={year}
                onChange={(e) => setYear(e.target.value)}
                />
            </div>
            
            <div className='text-box'>
                <label>Month</label>
                <select name="month" required={true} onChange={(e) => setMonth(e.target.value)}>
                    <option></option>
                    <option value={0}>January</option>
                    <option value={1}>February</option>
                    <option value={2}>March</option>
                    <option value={3}>April</option>
                    <option value={4}>May</option>
                    <option value={5}>June</option>
                    <option value={6}>July</option>
                    <option value={7}>August</option>
                    <option value={8}>September</option>
                    <option value={9}>October</option>
                    <option value={10}>November</option>
                    <option value={11}>December</option>

                </select>
            </div>
            <div className='text-box'>
                <label>Day</label>
                <input
                type='text'
                placeholder='...'
                value={day}
                onChange={(e) => setDay(e.target.value)}
                />
            </div>
        
            <div>
                <input type='submit' value='Save Event' className='button' />
            </div>

        </form>
    )

    //Calculates the amount of days in a particular month, used to verify dates
    function calculateDays ( year, month  ) {
        //If not in february, draws from an array
        if (month !== 1){
            return daysPerMonth[month];
        }
        //leap year bs
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

    //a parseint that works with 0
    function betterParse(x) {
        if (isNaN(parseInt(x))){
            return 0;
        }
        return parseInt(x);
    };
}

export default AddEvent
