import React from 'react'
import classes from './Backdrop.module.css'


const backdrop = props => {
    return (
        <div>
            {props.children}
        </div>
    );
};

export default backdrop;