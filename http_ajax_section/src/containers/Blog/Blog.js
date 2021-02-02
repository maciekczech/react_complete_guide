import React, { Component } from 'react';
import classes from './Blog.module.css';

import Posts from './../Posts/Posts';
import NewPost from './../NewPost/NewPost';
import {Route, NavLink, Switch} from 'react-router-dom';

class Blog extends Component {

    render () {    
        return (
            <div className={classes.Blog}>
                <header>
                    <nav>
                        <ul>
                            <li> <NavLink to='/posts/' activeClassName={classes.active}> HOME </NavLink> </li>
                            <li> <NavLink to={{
                                pathname: '/new-post'
                            }} activeClassName={classes.active}> New Post </NavLink></li>
                        </ul>
                    </nav>
                </header>

                <Route path='/new-post/' component={NewPost}/>
                <Route path='/posts/' component={Posts}/>

            </div>
        );
    }
}

export default Blog;