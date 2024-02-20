import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import classes from './EventPage.module.css'

const EventPage = () => {
    const params = useParams()
    const id = params.id

    const events = useSelector((state) => state.events.events)

    const eventType = (eventType) => {
        switch (eventType) {
            case "tech_talk":
                return "Tech Talk"
            case "workshop":
                return "Workshop"
            case "activity":
                return "Activity"
            default:
                return "Other"
        }
    }

    const findId = (event) => {
        return event.id == id;
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

    const getLink = (relatedId) => {
        const findRelatedId = (event) => {
            return event.id == relatedId
        }
        const index = events.findIndex(findRelatedId)
        if (index !== -1) {
            const relatedName = events[index].name
            return <Link to={`/${relatedId.toString()}`}>{relatedName}</Link>
        } else {
            return <Link to={`/${relatedId.toString()}`}></Link>
        }

    }

    if (events.length > 0) {
        const index = events.findIndex(findId)
        const event = events[index]
        const startTime = new Date(event.start_time * 1000)
        const endTime = new Date(event.end_time * 1000)
        let description = ""
        if (event.description) {
            description = event.description
        }
        let url = event.private_url
        if (!localStorage.login) {
            if (event.public_url) {
                url = event.public_url
            } else {
                url = ""
            }
        }
        let speakerNames = ""
        let speakerImageUrl = ""
        if (event.speakers.length > 0) {
            for (let i = 0; i < event.speakers.length; i++) {
                if (i === 0) {
                    speakerNames = event.speakers[i].name
                } else {
                    speakerNames = speakerNames + ", " + event.speakers[i].name
                }
            }
            if (event.speakers[0].profile_pic) {
                speakerImageUrl = event.speakers[0].profile_pic
            }
        }
        return (
            <div className={classes.wrapper}>
                <div className={classes.dexGrid}>

                    <Link to='/' className={classes.back}>
                        BACK
                    </Link>
                    <div className={classes.nameCard}>{`#${id}  ${event.name} with ${speakerNames}`}</div>
                    <div className={classes.type}>{eventType(event.event_type)}</div>
                    <div className={classes.picture}>
                        <img src={speakerImageUrl}/>
                    </div>
                    <div className={classes.timeCard}>{dateTimeToString(startTime) + " - " + dateTimeToString(endTime)}</div>
                    <div className={classes.description}>{description}</div>
                    <div className={classes.related}>{event.related_events.map(getLink)}</div>
                    <div className={classes.url}>{url}</div>
                </div>
            </div>
        )
    } else {
        return <></>
    }
}

export default EventPage