import React from "react";
import classes from './Cockpit.css'

const cockpit = props => {

    let paragraphAssignedClasses = [];
    let buttonAssignedClasses = '';

    if (props.personsListLength <= 2) { paragraphAssignedClasses.push(classes.red); } // classes = ['red']
    if (props.personsListLength <= 1) { paragraphAssignedClasses.push(classes.bold); } // classes = ['red', 'bold']

    if(props.showPersons){
        buttonAssignedClasses = classes.Clicked;
    }


    return(
        <div className={classes.Cockpit}>
            <p
                className={paragraphAssignedClasses.join(' ')}
                >
                This is really working!
            </p>
            <button 
                className={buttonAssignedClasses}
                onClick={props.click}
                >
                Hide everything
            </button>        
        </div>
    );
}

export default cockpit;