import classes from "./Events.module.css";

import { useState, useEffect, useCallback } from 'react'

import Box from "@mui/material/Box";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

import EventList from "./eventList/EventList";
import { useSelector } from "react-redux";

const Events = () => {
    const dayArray = useSelector(state => state.events.dayArray)
    const eventsArray = useSelector(state => state.events.eventsArray)

    const [day, setDay] = useState('0');

    const handleChange = (event, newDay) => {
        setDay(newDay);
    };

    return (
    <div className={classes.eventsWrapper}>
        <div className={classes.events}>
            <TabContext value={day}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="primary">
                        {dayArray.map((day, index) => {
                            return <Tab label={day} value={index}/>
                        })}
                    </TabList>
                </Box>
                <EventList eventArray={eventsArray[day]}/>
            </TabContext>
        </div>
    </div>);
};

export default Events;
