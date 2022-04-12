import React, { useState }from 'react';
import database from '../data/data';
import Loader from '../helpers/Loader';
import { register_user, get_artists, register_artist } from '../web3/Web3Service';
import { save_local_storage, read_local_storage } from '../helpers/localStorage';
import "./Login.css";
import {Tabs} from "antd";

const {TabPane} = Tabs;

const Login = () => {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
    tx: "tranasction failed, please try again."
  };

  const test_contract_method = () => {
    get_artists().then((tx) => {
      console.log(tx);
      
    }).catch((error) => {
      console.log(error);
    });
  }

  const register = () => {
      register_user().then((tx) => {
      console.log(tx);
      setLoading(false);
      save_local_storage("authenticated", 1);
      setIsSubmitted(true);

    }).catch((error) => {
      console.log(error);
      setErrorMessages({ name: "pass", message: errors.tx });
      setLoading(false);
    });
  }

  const register_a = (name) => {
      console.log(name);
      console.log(typeof(name));
      register_artist(name).then((tx) => {
      console.log(tx);
      setLoading(false);
      save_local_storage("authenticated", 1);
      setIsSubmitted(true);

    }).catch((error) => {
      console.log(error);
      setErrorMessages({ name: "pass", message: errors.tx });
      setLoading(false);
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
        save_local_storage("authenticated", 1);
        setIsSubmitted(true);
        
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  const handleSubmitRegister = async (event) => {
    setLoading(true);
    
    //Prevent page reload
    event.preventDefault();

    //var { uname, pass } = document.forms[0];

    /*check if username exists already
    
    */
    register();
  };

  const handleSubmitRegisterArtist = async (event) => {
    setLoading(true);
    
    //Prevent page reload
    event.preventDefault();
    var {artist_name, pass} = document.forms[1];

    //var { uname, pass } = document.forms[0];

    /*check if username exists already
    
    */
    register_a(artist_name.value);
  };


  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderFormLogin = (
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
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
      }
    </div>
  );

  const renderFormRegister = (
    <div className="form">
      {loading ? <Loader/> :
      <form onSubmit={handleSubmitRegister}>
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
          <input type="submit"/>
        </div>
      </form>
      }
    </div>
  );

  const renderFormRegisterArtist = (
    <div className="form">
      {loading ? <Loader/> :
      <form id="form_artist" onSubmit={handleSubmitRegisterArtist}>
        <div className="input-container">
          <label>Name of Artist </label>
          <input type="text" name="artist_name" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit"/>
        </div>
      </form>
      }
    </div>
  );

  
    return (
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Login" key="1">
          <div className="app">
            <div className="title">Login</div>
            <button onClick={() => test_contract_method()}>Test transaction</button>
            <div className="login-form">
              {loading ? <Loader/> : (isSubmitted ? window.location.href="/home" : renderFormLogin)}
            </div>
            <div style={{color:"white"}}>New here? Register with a new account.</div>
          </div>
        </TabPane>
        <TabPane tab="Register" key="2">
          <div className="app">
            <div className="title">Register</div>
            <div className="login-form">
              {loading ? <Loader/> : (isSubmitted ? window.location.href="/home" : renderFormRegister)}
            </div>
          </div>
        </TabPane>
        <TabPane tab="Register Artist" key="3">
          <div className="app">
            <div className="title">Register Artist</div>
            <div className="login-form">
              {loading ? <Loader/> : (isSubmitted ? window.location.href="/home" : renderFormRegisterArtist)}
            </div>
          </div>
        </TabPane>
      </Tabs>
      );
}

    


export default Login;
