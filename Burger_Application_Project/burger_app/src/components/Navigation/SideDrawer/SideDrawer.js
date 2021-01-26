import React from 'react'
import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import BackDrop from './../../UI/Backdrop/Backdrop'

const sideDrawer = props => {
    const sideDrawerClasses = [classes.SideDrawer];
    if(props.visible) { sideDrawerClasses.push(classes.Open) }
    else { sideDrawerClasses.push(classes.Closed) }

    return (
        <>
        <BackDrop 
            visible={props.visible} 
            hide={props.hide}
        />
        <div className={sideDrawerClasses.join(' ')}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </>
    );
    
}

export default sideDrawer;