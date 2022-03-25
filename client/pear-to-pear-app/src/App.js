import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";


function App() {

 
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const database = [
      {
        username: "Lynn",
        password: "111"
      },
      {
        username: "Dave",
        password: "222"
      },

      {
        username: "Jason",
        password: "333"
      },

      {
        username: "Ben",
        password: "444"
      },
      {
        username: "Dario",
        password: "555"
      }
    ];
  
    const errors = {
      uname: "invalid username",
      pass: "invalid password"
    };


    


    const handleSubmit = (event) => {
      event.preventDefault();

      var { uname, pass } = document.forms[0];


      const userData = database.find((user) => user.username === uname.value);

      //check our credentials
      if (userData) {
        if (userData.password !== pass.value) {
          // Invalid password
          setErrorMessages({ name: "pass", message: errors.pass });
        } else {
          setIsSubmitted(true);
        }
      } else {
        // Username not found
        setErrorMessages({ name: "uname", message: errors.uname });
      }
    };


    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );


    const renderForm = (
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="uname" required />
            {renderErrorMessage("uname")}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required />
            {renderErrorMessage("pass")}
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
      </div>
    );


 return (
    <div className="app">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>Successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}


export default App;