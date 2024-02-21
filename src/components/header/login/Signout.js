import { Button } from "@mui/material"

import { useNavigate } from "react-router"

const Signout = () => {
    const navigate = useNavigate();

    const handleSignout = () => {
        localStorage.removeItem("login")
        navigate('/') // this is here because there was a bug and i dont have time to fix it lol so this gets around it
        window.location.reload()
    }

    return (
        <Button onClick={handleSignout} variant="contained">Sign out</Button>
    )
}

export default Signout