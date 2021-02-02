import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Navbar.module.css'


const Navbar = props => {
    return (
        <ul className={classes.Navbar}>
            <li>
                <NavLink to='/users'   activeClassName={classes.active}    >Users</NavLink>
            </li>
            <li>
                <NavLink to='/courses' activeClassName={classes.active}    >Courses</NavLink>
            </li>
        </ul>
    );
}

export default Navbar;