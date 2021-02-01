import React, { Component } from 'react';
import classes from './Blog.module.css';

import Posts from './../Posts/Posts'
import NewPost from './../NewPost/NewPost'
import {Route, Link} from 'react-router-dom';

class Blog extends Component {

    render () {    
        return (
            <div>
                <header className={classes.Blog}>
                    <nav>
                        <ul>
                            <li> <Link to='/'> HOME </Link> </li>
                            <li> <Link to={{
                                pathname: '/new-post',
                                search: '?asd'
                            }}> New Post </Link></li>
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