import { useState } from "react";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Box, TextField } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '10px solid #141414',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    backgroundColor: '#DEDEDE',
    color: 'black',
  };

const Login = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const emailChange = (event) => {
        setEmail(event.target.value)
    }

    const passwordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = () => {
        if (email === "test@example.com" && password === "password") {
            console.log("logged in")
            localStorage.setItem("login", "y");
            window.location.reload();
        }
    }

    return (
        <>
            <Button variant="contained" onClick={handleOpen} sx={{backgroundColor: '#28AAFD'}}>
                Login
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    Login
                    <TextField label={'Email'} value={email} onChange={emailChange}/>
                    <TextField label={'Password'} value={password} onChange={passwordChange}/>
                    <Button onClick={handleSubmit} sx={{color: 'black'}}>Login</Button>
                </Box>
            </Modal>
        </>
    );
};

export default Login;
