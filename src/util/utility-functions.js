export const getColorForEvent = (eventType) => {
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

export const getEventType = (eventType) => {
    switch (eventType) {
        case "tech_talk":
            return "TECH TALK";
        case "workshop":
            return "WORKSHOP";
        case "activity":
            return "ACTIVITY";
        default:
            return "OTHER";
    }
};

export const getMinuteString = (minutes) => {
    if (minutes == 0) {
        return "00"
    } else {
        return minutes
    }
}

export const dateTimeToString = (date) => {
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()} ${date.getHours()}:${getMinuteString(date.getMinutes())}`
}