import React, { useState } from 'react';
import { format, startOfWeek, addDays, subWeeks, addWeeks } from 'date-fns';

const CalendarPage = () => {
    // State to hold the current date
    const [currentWeek, setCurrentWeek] = useState(new Date());

    // Get the start of the week from the current date
    const startWeek = startOfWeek(currentWeek, { weekStartsOn: 1 });

    // Function to change week
    const changeWeek = (amount: number) => {
        // Update the week by subtracting or adding
        const newWeek = amount < 0 ? subWeeks(currentWeek, 1) : addWeeks(currentWeek, 1);
        setCurrentWeek(newWeek);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button onClick={() => changeWeek(-1)}>Previous</button>
            <div style={{ display: 'flex', margin: '0 20px' }}>
                {[...Array(7).keys()].map(i => {
                    const day = addDays(startWeek, i);
                    return (
                        <div key={i} style={{ margin: '0 10px', textAlign: 'center' }}>
                            {format(day, 'EEEE do MMM')}
                            {format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') && <div style={{ marginTop: '5px', height: '10px', width: '10px', borderRadius: '50%', background: 'red', display: 'inline-block' }}></div>}
                        </div>
                    );
                })}
            </div>
            <button onClick={() => changeWeek(1)}>Next</button>
        </div>
    );
};

export default CalendarPage;
