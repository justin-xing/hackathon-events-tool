import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import charmander from "../../../../assets/charmander.png";
import squirtle from "../../../../assets/squirtle.png";
import bulbasaur from "../../../../assets/bulbasaur.png";
import pokeball from "../../../../assets/pokeball.png";

import classes from "./EventPage.module.css";

const EventPage = () => {
    const params = useParams();
    const id = params.id;

    const events = useSelector((state) => state.events.events);

    const eventType = (eventType) => {
        switch (eventType) {
            case "tech_talk":
                return "Tech Talk";
            case "workshop":
                return "Workshop";
            case "activity":
                return "Activity";
            default:
                return "Other";
        }
    };

    const getEventImage = (eventType) => {
        switch (eventType) {
            case "tech_talk":
                return bulbasaur;
            case "workshop":
                return squirtle;
            case "activity":
                return charmander;
            default:
                return "";
        }
    };

    const getEventColor = (eventType) => {
        switch (eventType) {
            case "tech_talk":
                return "#B5F06C";
            case "workshop":
                return "#9AEDFF";
            case "activity":
                return "#FF9442";
            default:
                return "";
        }
    };

    const findId = (event) => {
        return event.id == id;
    };

    const getMinuteString = (minutes) => {
        if (minutes == 0) {
            return "00";
        } else {
            return minutes;
        }
    };

    const dateTimeToString = (date) => {
        return `${date.toLocaleString("default", {
            month: "long",
        })} ${date.getDate()} ${date.getHours()}:${getMinuteString(
            date.getMinutes()
        )}`;
    };

    const convertToThreeDigitString = (num) => {
        if (num < 10) {
            return "00" + num.toString();
        } else if (num < 100) {
            return "0" + num.toString();
        } else {
            return num.toString();
        }
    };

    const getLink = (relatedId) => {
        const findRelatedId = (event) => {
            return event.id == relatedId;
        };
        const index = events.findIndex(findRelatedId);
        if (index !== -1) {
            const relatedName = events[index].name;
            return (
                <Link
                    to={`/${relatedId.toString()}`}
                    style={{ marginRight: "20px" }}
                >
                    {relatedName}
                </Link>
            );
        } else {
            return <Link to={`/${relatedId.toString()}`}></Link>;
        }
    };

    if (events.length > 0) {
        const index = events.findIndex(findId);
        const event = events[index];
        const startTime = new Date(event.start_time * 1000);
        const endTime = new Date(event.end_time * 1000);
        let description = "";
        if (event.description) {
            description = event.description;
        }
        let url = event.private_url;
        if (!localStorage.login) {
            if (event.public_url) {
                url = event.public_url;
            } else {
                url = "";
            }
        }
        let speakerNames = "";
        if (event.speakers.length > 0) {
            for (let i = 0; i < event.speakers.length; i++) {
                if (i === 0) {
                    speakerNames = event.speakers[i].name;
                } else {
                    speakerNames = speakerNames + ", " + event.speakers[i].name;
                }
            }
        }
        return (
            <div className={classes.wrapper}>
                <div className={classes.dexGrid}>
                    <Link to="/" className={classes.back}>
                        BACK
                    </Link>
                    <div className={classes.nameCard}>
                        <div className={classes.name}>
                            <img src={pokeball} className={classes.pokeball} alt="pokeball icon"/>
                            <div className={classes.id}>{convertToThreeDigitString(id)}</div>
                            <div className={classes.eventName}>{event.name}</div>
                        </div>
                        <div className={classes.speakers}>{`with ${
                            speakerNames !== "" ? speakerNames : "[TBD]"
                        }`}</div>
                    </div>
                    <div className={classes.infoGroup}>
                        <div
                            className={classes.type}
                            style={{
                                backgroundColor: getEventColor(
                                    event.event_type
                                ),
                            }}
                        >
                            {eventType(event.event_type)}
                        </div>
                        <div className={classes.timeCard}>
                            {dateTimeToString(startTime) +
                                " - " +
                                dateTimeToString(endTime)}
                        </div>
                    </div>
                    <div className={classes.picture}>
                        <img
                            src={getEventImage(event.event_type)}
                            className={classes.image}
                            alt="a cute pokemon"
                        />
                    </div>
                    <div className={classes.description}>{description}</div>
                    <div className={classes.related}>
                        Related events: {event.related_events.map(getLink)}
                    </div>
                    <a className={classes.url} href={url}>
                        Event Link
                    </a>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
};

export default EventPage;
