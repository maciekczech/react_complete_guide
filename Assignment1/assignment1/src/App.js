import React, {useState} from 'react'
import './App.css';
import UserInput from './UserInput/UserInput'
import UserOutput from './UserOutput/UserOutput'
/* */
const App = () => {

  const [userOutputState, setUserOutputState] = useState({
    userName: "Donald",
    userSurname: "Cerrone",
  });

  const changeNameOfUserOutputState = newName =>{
    setUserOutputState({
      userName: "Donald",
      userSurname: userOutputState.userSurname
    });
  }

  const changeNameOfUserOutputStateHandler = event =>{
    setUserOutputState({
      userName: event.target.value,
      userSurname: userOutputState.userSurname
    });
  }

  return (
    <div className="App">
      <UserInput currentName={userOutputState.userName} change={changeNameOfUserOutputStateHandler} />
      <UserOutput userName={userOutputState.userName} userSurname={userOutputState.userSurname}/>
    </div>
  );
}

export default App;
