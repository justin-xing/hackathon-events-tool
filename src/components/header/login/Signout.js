import { Button } from "@mui/material"

const Signout = () => {
    const handleSignout = () => {
        localStorage.removeItem("login")
        window.location.reload()
    }

    return (
        <Button onClick={handleSignout} variant="contained">Sign out</Button>
    )
}

export default Signout