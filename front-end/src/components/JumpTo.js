import {useState} from 'react'

const JumpTo = (props) => {
    //state for the form 
    const [year, setYear] = useState(props.displayDate.getFullYear());
    const [month, setMonth] = useState({});

    function submission (e) {
        e.preventDefault();

        //Checking if they specified a date. No limitation since the month is a select and the year I dont care about
        if (!betterParse(year) || betterParse(month) < 0){
            alert("Specify a date");
            return;
        }

        //sets the display date to a new date object with the month specified
        const newDisplayDate = new Date();
        newDisplayDate.setFullYear(betterParse(year));
        newDisplayDate.setMonth(betterParse(month));

        props.setDisplayDate(newDisplayDate);

        //closes the popup
        props.jumpToPopupToggle();
    }

    return (
        <form className="add-event-popup" onSubmit={submission}>
            <h1 className="popup-header">Jump To</h1>
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
             
            <input type='submit' value='Go' className='button' />


        </form>
    )

    //parseint that works on 0
    function betterParse(x) {
        if (isNaN(parseInt(x))){
            return 0;
        }
        return parseInt(x);
    };
}

export default JumpTo;
