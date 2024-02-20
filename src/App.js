import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Events from './components/events/Events'
import EventPage from './components/events/eventList/event/EventPage';

import Root from './components/Root';
import Error from './components/Error'
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { eventsActions } from './store/events-slice';

function App() {

    // fetch events on page load
    const URL = 'https://api.hackthenorth.com/v3/events'
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(URL)
        .then(function (response) {
            dispatch(eventsActions.receiveEvents(response.data)) // store data to be used on other pages
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [])

    const router = createBrowserRouter([
        {
          path: "/",
          element: <Root/>,
          errorElement: <Error/>,
          children: [
            { path: "/", element: <Events /> },
            { path: ":id", element: <EventPage/> }
          ],
        },
      ]);

    return <RouterProvider router={router} />
}

export default App;
