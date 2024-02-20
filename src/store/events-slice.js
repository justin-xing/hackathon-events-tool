import { createSlice } from "@reduxjs/toolkit";

const comparisonFn = (a, b) => {
    if (a.start_time > b.start_time) {
        return 1
    } else if (a.start_time < b.start_time) {
        return -1
    } else {
        return 0
    }
}

const getSplitEventData = (eventArray) => {
    const dayArray = []
    const eventArrayArray = []

    const eventCount = eventArray.length

    for (let i = 0; i < eventCount; i++) {
        const date = new Date(eventArray[i].start_time * 1000);
        const strDate = date.toLocaleString('default', { month: 'long' }) + " " + date.getDate() + " " + date.getYear()

        const index = dayArray.findIndex((d) => strDate === d)
        if (index === -1) {
            dayArray.push(strDate)
            let eventsForADay = []
            eventsForADay.push(eventArray[i])
            eventArrayArray.push(eventsForADay)
        } else {
            eventArrayArray[index].push(eventArray[i])
        }
    }
    return [dayArray, eventArrayArray]
}

const isPublic = (event) => {
    if (event.permission === "private") {
        return false;
    } else {
        return true;
    }
}

const eventsSlice = createSlice({
  name: "events",
  initialState: { events: [], dayArray: [], eventsArray: [] },
  reducers: {
    receiveEvents(state, action) {
        // lets filter our events if we're not signed in
        let events = action.payload
        if (!localStorage.login) {
            events = action.payload.filter(isPublic)
        } else {
            events = action.payload
        }
        state.events = events
        // after fetching events, lets sort these events based on time
        const sortedEventArray = events.sort(comparisonFn)
        // after that's done, we'll split the data according to days
        const [dayArray, eventArray] = getSplitEventData(sortedEventArray)
        state.dayArray = dayArray
        state.eventsArray = eventArray
    },
  },
});

export const eventsActions = eventsSlice.actions;

export default eventsSlice;
