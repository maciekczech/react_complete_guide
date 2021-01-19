import React from "react";
import classes from './BuildControl.module.css'

const buildControl = props => ( 
    <div className={classes.BuildControl}>
        <div className={classes.Label}> {props.label} </div>
        <button className={classes.More} onClick={props.more} >More</button>
        <button className={classes.Less} onClick={props.less} disabled={props.isDisabled}>Less</button>
    </div>
);

export default buildControl;