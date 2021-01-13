import React, {useEffect} from "react";
import classes from './Cockpit.css'

const cockpit = props => {

    useEffect(() => {
        console.log("[Cockpit.js] useEffect on persons change call...");
        const timer = setTimeout(() => {
            alert('Saved some data to the cloud');
        }, 1000);
        return() => {
            clearTimeout(timer);
        }
    }, [props.persons]); //gets triggered only on a persons change

    useEffect(() => {
        console.log("[Cockpit.js] useEffect initial render call...");
        return () => {
            console.log('[Cockpit.js] Clean up work in useEffect (only after the cockpit is removed)')
        }
    }, []); //get triggered only on initial render

    useEffect( () => {
        console.log("[Cockpit.js] useEffect 2nd call...");
        return () => {
            console.log('[Cockpit.js] Clean up work in 2nd useEffect');
        }
    });


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

export default React.memo(cockpit);