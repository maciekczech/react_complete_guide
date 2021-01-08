import React, {Component} from 'react'
import './App.css'
import Input from './Input/Input'
import ValidationComponent from './ValidationComponent/ValidationComponent'
import CharComponent from './CharComponent/CharComponent'

class App extends Component{

  state = {
    message: "blank",
    length: "blank".length,
  }

  inputChangeHandler = (event) => {
    const messageLength = event.target.value.length;
    const message = event.target.value
    this.setState({
      message: message,
      length: messageLength 
    });
  }



  deleteCharHandler = (charIndex) => {
    const tempMessage = Object.assign([], this.state.message);
    tempMessage.splice(charIndex, 1);
    this.setState({
      message: tempMessage.join(''),
      length: tempMessage.length
  });
  }

render(){

  let output = {};
  const tempMessage = Object.assign([], this.state.message);
  output = (
      <div className="CharWrapper">
        {
        tempMessage.map((element, charIndex) => {
          return(
          <CharComponent
            key={charIndex}
            content={element}
            click={() => this.deleteCharHandler(charIndex)}
          />);
        })}
      </div>
      );

  

  return(
    <div className="App">
    <Input textLength={this.state.length} changed={this.inputChangeHandler} value={this.state.message}></Input>
    <ValidationComponent length={this.state.length}></ValidationComponent>
    {output}
  </div>
  )
  }
}

export default App;
