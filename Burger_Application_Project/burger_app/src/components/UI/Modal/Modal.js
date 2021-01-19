import React from 'react'
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css'

const modal = (props) => {
    return (
        <>
        <Backdrop
            visible={props.visible}
            hideModalAndBackdrop={props.hideModalAndBackdrop}
        />
        <div    
            className={classes.Modal}
            style={{
                transform: props.visible ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.visible ? '1' : '0'
            }}
        >
            {props.children}
        </div>
        </>
    );
};

export default modal; 