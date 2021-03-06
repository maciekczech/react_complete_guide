import React, {useEffect, useRef, useContext} from "react";
import classes from './Cockpit.css'
import AuthContext from '../../context/auth-context'

const cockpit = props => {

    const toggleButtonRef = useRef(null);
    const authContext = useContext(AuthContext);

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
        toggleButtonRef.current.click();
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
                ref={toggleButtonRef} 
                className={buttonAssignedClasses}
                onClick={props.click}
                >
                Hide everything
            </button> 
            <button 
            onClick={authContext.authenticateUserHandler}
            >
                Log in!
            </button> 
                    
        </div>
    );
}

export default cockpit;