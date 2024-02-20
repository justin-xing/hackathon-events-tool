import classes from './PokedexIcon.module.css'

const PokedexIcon = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.bigCircle}>
                <div className={classes.smallCircle}/>
            </div>
            <div className={classes.dotGroup}>
                <div className={classes.dotOne}/>
                <div className={classes.dotTwo}/>
                <div className={classes.dotThree}/>
            </div>
        </div>
    )
}

export default PokedexIcon