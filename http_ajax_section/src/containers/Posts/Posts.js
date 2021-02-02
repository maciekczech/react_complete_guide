import React, {Component} from 'react';
import axios from './../../../src/axios';
import classes from './Posts.module.css';
import Post from './../../components/Post/Post'
import {Route} from 'react-router-dom';
import FullPost from './../FullPost/FullPost';

class Posts extends Component {

    state={
        posts: [],
    }

    componentDidMount(){
        console.log(this.props)
        axios.get('/posts').then(response => {
            const posts = response.data.slice(0,4);
            const updatedPosts = posts.map( post => {
                return {
                    ...post,
                    author: "Maciej"
                }
            })
            this.setState({ posts: updatedPosts});
        }).catch(error => {
            this.setState({ error: error });
        })};

    postSelectedHandler = (id) => {
        this.props.history.push('/posts/' + id);
    }

    render(){

        let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>;
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return (
                //<Link to={'/' + post.id} key={post.id}>
                    <Post 
                    key={post.id}
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)}
                    />
                //</Link>
                );
            })
        }

        return(
            <div>
                <section className={classes.Posts}>
                    {posts}
                </section>
                <div>
                    <Route path={this.props.match.url + "/:id"} component={FullPost}/>
                </div>
            </div>
        )
    }
};

export default Posts;