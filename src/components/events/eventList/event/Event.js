import classes from './Event.module.css'

import { Link } from 'react-router-dom'

const Event = (props) => {
    const event = props.event
    const id = event.id
    const name = event.name
    const eventType = event.event_type
    const startTime = new Date(event.start_time * 1000)
    const endTime = new Date(event.end_time * 1000)

    const getColorForEvent = (eventType) => {
        switch (eventType) {
            case "workshop":
                return "blue"
            case "activity":
                return "red"
            case "tech_talk":
                return "green"
            default:
                return "yellow"
        }
    }

    const getMinuteString = (minutes) => {
        if (minutes == 0) {
            return "00"
        } else {
            return minutes
        }
    }

    const dateTimeToString = (date) => {
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()} ${date.getHours()}:${getMinuteString(date.getMinutes())}`
    }

    return (
        <Link to={`/${id}`} className={classes.link}>
            <div className={classes.wrapper} style={{borderColor: getColorForEvent(eventType)}}>
                <p className={classes.time}>{dateTimeToString(startTime) + " - " + dateTimeToString(endTime)}</p>
                <p className={classes.name}>{name}</p>
            </div>
        </Link>
    )
}

export default Event