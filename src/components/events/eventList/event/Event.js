import classes from './Event.module.css'

import { Link } from 'react-router-dom'

import squirtleHead from '../../../../assets/squirtleHead.webp'
import bulbasaurHead from '../../../../assets/bulbasaurHead.webp'
import charmanderHead from '../../../../assets/charmanderHead.webp'
import { Divider } from '@mui/material'

import { getColorForEvent, getEventType, dateTimeToString } from '../../../../util/utility-functions';

const Event = (props) => {
    const event = props.event
    const id = event.id
    const name = event.name
    const eventType = event.event_type
    const startTime = new Date(event.start_time * 1000)
    const endTime = new Date(event.end_time * 1000)

    const getHeadForEvent = (eventType) => {
        switch (eventType) {
            case "workshop":
                return squirtleHead
            case "activity":
                return charmanderHead
            case "tech_talk":
                return bulbasaurHead
            default:
                return ""
        }
    }

    return (
        <Link to={`/${id}`} className={classes.link}>
            <div className={classes.wrapper} style={{borderColor: getColorForEvent(eventType)}}>
                <div className={classes.time}>
                    <div>{dateTimeToString(startTime)}</div>
                    <Divider/>
                    <div>{dateTimeToString(endTime)}</div>
                </div>
                <p className={classes.name}>{name}</p>
                <div className={classes.eventType}>
                    <img src={getHeadForEvent(eventType)} className={classes.head} alt="pokemon head"/>
                    <div className={classes.eventTypeName} style={{color: getColorForEvent(eventType)}}>{getEventType(eventType)}</div>
                </div>
            </div>
        </Link>
    )
}

export default Event