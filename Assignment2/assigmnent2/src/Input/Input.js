
const input = props => {
    return (
        <div>
            <p> Length of the below text: {props.textLength} </p>
            <input type='text' onChange={props.changed} value={props.value}/>
        </div>
    );
}

export default input