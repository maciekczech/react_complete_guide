import React, {Component} from 'react';
import classes from './Person.css'



class Person extends Component {

    constructor(props){
        super(props);
        console.log('[Person.js] Constructing Person...');
        this.state = {}
    }
    static getDerivedStateFromProps(state, props){
        console.log('[Person.js] getDerivedStateFromProps call..');
        return state;
    }

    componentDidMount(){
        console.log('[Person.js] componentDidMount call..');
    }

    render(){
        console.log('[Person.js] person rendering...');
        return (
            <div className={classes.Person}>
                <p onClick={this.props.click}> I'm a {this.props.name} and I am {this.props.age} years old </p>
                <p>{this.props.children}</p>
                <input onChange={this.props.changed} value={this.props.name}></input>
            </div>
        );
    }

}

export default Person;