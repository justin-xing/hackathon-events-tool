import classes from './Header.module.css';
import PokedexIcon from './logo/PokedexIcon';
import Login from './login/Login';
import Signout from './login/Signout';
import { Link } from 'react-router-dom';

const Header = () => {
    const loggedIn = localStorage.getItem("login") === "y"
    return (
        <div className={classes.header}>
            <div style={{color: "#DB3C36"}}>Filler</div>
            <PokedexIcon/>
            <h1><Link to='/' className={classes.link}>HACKADEX</Link></h1>
            {loggedIn ? <Signout/> : <Login/>}
        </div>
    );
}

export default Header;