
const userInput = props => {
    return(
        <div>
            <p>Two way binding exercise</p>
            <p>Some sort of message</p>
            <p>You could change the below name up there</p>
            <p>Output for user: {props.userName} {props.userSurname}</p>            
        </div>
    );
}

export default userInput