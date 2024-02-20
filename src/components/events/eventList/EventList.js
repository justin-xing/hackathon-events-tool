import Event from "./event/Event"

import classes from './EventList.module.css'

const EventList = (props) => {
    if (props.eventArray) {
        return (
            <div className={classes.wrapper}>
                {props.eventArray.map((event) => <Event event={event}/>)}
            </div>
        )
    } else {
        return <></>
    }
}

export default EventList