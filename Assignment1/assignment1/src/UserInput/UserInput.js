

const userInput = props => {
    const styles = {
        'width': '100%',
        'padding': '12px 20px',
        'margin': '8px 0',
        'boxSizing': 'border-box'
    }


    return(
        <div>
            <input style={styles} type='text' onChange={props.change} value={props.currentName} /> 
        </div>
    );
}

export default userInput