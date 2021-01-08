
const charComponent = props => {
    const styles = {
        display: 'inline-block',
        padding: '16px',
        textAlign: 'center',
        margin: '5px',
        border: '1px solid black'
    }

    return (
        <div style={styles} onClick={props.click} className='CharWrapper'>  
            <p value={props.content} >{props.content}</p> 
        </div>
    )
}

export default charComponent;