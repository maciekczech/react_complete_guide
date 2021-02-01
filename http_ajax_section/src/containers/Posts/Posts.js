import React, {Component} from 'react';
import axios from './../../../src/axios';
import classes from './Posts.module.css';
import Post from './../../components/Post/Post'

class Posts extends Component {

    state={
        posts: [],
    }

    componentDidMount(){
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
        this.setState({selectedPostID: id});
    }

    render(){

        let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>;
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return <Post 
                key={post.id} 
                title={post.title} 
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)}
                />
            })
        }

        return(
            <section className={classes.Posts}>
                {posts}
            </section>
        )
    }
};

export default Posts;