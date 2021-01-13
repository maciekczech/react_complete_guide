import React, {useEffect} from "react";
import classes from './Cockpit.css'

const cockpit = props => {

    useEffect(() => {
        console.log("[Cockpit.js] useEffect on persons change call...");
        setTimeout(() => {
            alert('Saved some data to the cloud');
        }, 1000);
    }, [props.persons]); //gets triggered only on a persons change

    useEffect(() => {
        console.log("[Cockpit.js] useEffect initial render call...");
        setTimeout(() => {
            alert('Rendered Persons for the first time');
        }, 1000);
    }, []); //get triggered only on initial render


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