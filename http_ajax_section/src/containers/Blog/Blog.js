import React, { Component } from 'react';
import classes from './Blog.module.css';

import Posts from './../Posts/Posts'
import NewPost from './../NewPost/NewPost'
import {Route, NavLink} from 'react-router-dom';

class Blog extends Component {

    render () {    
        return (
            <div className={classes.Blog}>
                <header>
                    <nav>
                        <ul>
                            <li> <NavLink to='/' exact activeClassName={classes.active}> HOME </NavLink> </li>
                            <li> <NavLink to={{
                                pathname: '/new-post'
                            }} exact activeClassName={classes.active}> New Post </NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Route path='/' exact component={Posts}/>
                <Route path='/new-post' exact component={NewPost}/>
            </div>
        );
    }
}

export default Blog;