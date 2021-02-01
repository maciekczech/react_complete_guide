import React, { Component } from 'react';
import classes from './Blog.module.css';

import Posts from './../Posts/Posts';
import NewPost from './../NewPost/NewPost';
import FullPost from './../FullPost/FullPost'
import {Route, NavLink, Switch} from 'react-router-dom';

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
                <Switch>
                    <Route path='/new-post' exact component={NewPost}/>
                    <Route path='/:id' exact component={FullPost}/>
                </Switch>
            </div>
        );
    }
}

export default Blog;