import React, {component} from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    width: 60%;
    margin: auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #eee;
    padding: 16px;
    text-align: center;

    @media (min-width: 500px){

        width: 450px

    }

`;

const person = (props) => {

    return (
        //<div className='Person' style={style}>
        <StyledDiv>
            <p onClick={props.click}> I'm a {props.name} and I am {props.age} years old </p>
            <p>{props.children}</p>
            <input onChange={props.changed} value={props.name}></input>
        </StyledDiv>
        //</div>
    );
}

export default person;