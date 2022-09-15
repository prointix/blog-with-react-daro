import { Link } from "react-router-dom";

import "../assets/styles/SignIn.css"

function Register() {
  return (
    <div className="sign-in">
    <div className="logo">WeChii</div>
      <div className="header">
        
      <div className="text-container">
      <p><span id="header">Sign in to </span><br /> Lorem Ipsum is simply</p> 
      <span>
        Lorem Ipsum is simply dummy text of the printing and <br /> typesetting 
        industry. Lorem Ipsum has been the industry's <br /> standard dummy text ever
        since the 1500s,
      </span>
    </div>
    <div className="seperator"></div>
    <div className="login-container">
      <div className="login-elements">
      <div className="login-header-text">
        <p>Welcome to <span>WeChii</span></p>
        <span>Have an Account? <a href="#">
          <Link to={"/signin"}>
          <p>Sign in</p>
          </Link>
          </a></span>
      </div>
      <div className="login-signin">
        Sign Up
      </div>
      <div className="login-input">
        <label htmlFor="" className="input">
        Enter your username or email address 
        </label>
        <br />
        <input type="text" placeholder="  Username or email address" />
        <br />
        <div className="user-name-tel">
        <div className="on-top">
        <label htmlFor="" className="input">
        User name
        </label>
        <br />
        <br />
        <input type="text" placeholder="  Username" />
        <br /><br />
        </div>
        <div className="on-top">
        <label htmlFor="" className="input">
        Contact Number
        </label>
        <br />
        <br />
        <input type="text" placeholder="  Phone number" />
        <br /><br />
        </div>
        </div>
        <label htmlFor="" className="input" >
          Enter your password
        </label>
        <br />
        <input type="password" placeholder="   password" />
        <br /><br />
        <button className="submit-btn">
          Sign up
        </button>
      </div>
    </div>
    </div>
      </div>
  </div>
  );
}

export default Register;
