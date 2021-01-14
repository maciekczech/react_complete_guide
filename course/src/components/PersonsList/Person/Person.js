import React, {Component} from 'react';
import classes from './Person.css'
import withClass from '../../../hoc/withClassF'
import Auxiliary from '../../../hoc/Auxiliary'
import PropTypes from 'prop-types'
import AuthContext from '../../../context/auth-context'



class Person extends Component {

    constructor(props){
        super(props);
        console.log('[Person.js] Constructing Person...');
        this.state = {}
        this.inputElementRef = React.createRef();
    }

    componentDidMount(){
        console.log('[Person.js] componentDidMount call..');
        this.inputElementRef.current.focus();
    }

    render(){
        console.log('[Person.js] person rendering...');
        return (
            <Auxiliary>
                <AuthContext.Consumer>
                    {(context) => context.authenticated ? <p> Authenticated </p> : <p> Please Log in</p> }
                </AuthContext.Consumer>
                <p onClick={this.props.click}> I'm a {this.props.name} and I am {this.props.age} years old </p>
                <p>{this.props.children}</p>
                <input ref={this.inputElementRef} onChange={this.props.changed} value={this.props.name}></input>
            </Auxiliary>
            
        );
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func,
};

export default withClass(Person, classes.Person);