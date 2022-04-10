import React, { useState }from 'react';
import database from '../data/data';
import Loader from '../helpers/Loader';
import { regist_user, get_user_id } from '../web3/Web3Service';
import "./Login.css";


const Login = () => {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const test_contract_method = () => {
    get_user_id().then((tx) => {
      console.log(tx);
      
    }).catch((error) => {
      console.log(error);
    });
  }

  const register = () => {
    regist_user().then((tx) => {
      console.log(tx);

    }).catch((error) => {
      console.log(error);
    });
  }

  const handleSubmit = (event) => {
    setLoading(true);
    setTimeout(function () {
       setLoading(false);
    }, 2000);

    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
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

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      {loading ? <Loader/> :
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
        <div className="input-container">
          <label>Artist? </label>
          <input type="checkbox" name="artist" />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
      }
    </div>
  );


  
    return (
        <div className="app">
          <div className="title">Sign In</div>
          <button onClick={() => test_contract_method()}>Test transaction</button>
          <div className="login-form">
            {loading ? <Loader/> : (isSubmitted ? window.location.href="/home" : renderForm)}
          </div>
          
          </div>
           
          
        
      );
    }

    


export default Login;
