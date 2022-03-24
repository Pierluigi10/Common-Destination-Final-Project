import React from "react";
import { useState } from "react";
import { useTheme } from "../../ThemeContext";
// import { ImEyeBlocked, ImEye } from "react-icons/im";
import icons from "../../functions/icons.js";

function Signup() {
  const { setValidationMenuToggle, setCurrentUser, backendUrl } = useTheme();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [email, setEmail] = useState("");
  const [passwordsInputType1, setPasswordsInputType1] = useState("password");
  const [passwordsInputType2, setPasswordsInputType2] = useState("password");

  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [repeatPasswordIsValid, setRepeatPasswordIsValid] = useState(false);
  const [signupToggle, setSignupToggle] = useState(true);

  const [emailIsValid, setEmailIsValid] = useState(false);

  // SIGNUP FORM FIELD HANDLERS
  const handleUsername = (e) => {
    let _username = e.target.value;
    if (_username !== "" && _username.length <= 10 && _username.length >= 3) {
      setUsernameIsValid(true);
    } else {
      setUsernameIsValid(false);
    }
    setUsername(_username);
  };

  const handlePassword = (e) => {
    let _password = e.target.value;
    if (_password.length >= 5 && /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(_password)) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
    setPassword(_password);
  };

  const handleShowPassword = () => {
    setPasswordsInputType1(
      passwordsInputType1 === "password" ? "text" : "password"
    );
  };

  const handleRepeatPassword = (e) => {
    let _repeatPassword = e.target.value;
    if (_repeatPassword === password) {
      setRepeatPasswordIsValid(true);
    } else {
      setRepeatPasswordIsValid(false);
    }
    setRepeatPassword(_repeatPassword);
  };

  const handleShowRepeatPassword = () => {
    setPasswordsInputType2(
      passwordsInputType2 === "password" ? "text" : "password"
    );
  };

  const handleEmail = (e) => {
    let _email = e.target.value;
    if (_email !== "" && /(.+)@(.+){2,}\.(.+){2,}/.test(_email)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
    setEmail(_email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password1: password,
        password2: repeatPassword,
        email: email,
      }),
    };
    // console.log("request" + requestOptions);
    const response = await fetch(`${backendUrl}/users/signup`, requestOptions);
    // console.log("repsonse" + response);
    if (response.ok) {
      const _currentUser = await response.json();
      // console.log(_currentUser);
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));

      setUsername("");
      setPassword("");
      setRepeatPassword("");
      setEmail("");
      setValidationMenuToggle(false);
    } else {
      setSignupToggle(false);
    }
  };
  return (
    <div className="Signup">
      <form>
        <fieldset>
          <legend>Signup</legend>
          <div className={`row ${usernameIsValid ? "valid" : "invalid"}`}>
            {/* <label htmlFor="username">Username</label> */}
            <input
              type="text"
              id="username"
              value={username}
              placeholder="username"
              onChange={handleUsername}
            />
          </div>
          <div className={`note ${usernameIsValid ? "valid" : "invalid"}`}>
            {/* <p>min 3 and max 10 characters </p>
            {!usernameIsValid && !signupToggle && <p>please check your email</p>} */}

            {!usernameIsValid && !signupToggle ? (
              <p>please check your username</p>
            ) : (
              <p>min 3 and max 10 characters </p>
            )}
          </div>
          <div className={`row ${passwordIsValid ? "valid" : "invalid"}`}>
            {/* <label htmlFor="password">Password</label> */}
            <input
              type={passwordsInputType1}
              id="password"
              value={password}
              autoComplete="on"
              placeholder="password"
              onChange={handlePassword}
            />
            <span className="eyesIcon" onClick={handleShowPassword}>
              {passwordsInputType1 === "password" ? (
                <icons.HiEye color="#e0d8d8" className="reactIcons" />
              ) : (
                <icons.HiEyeOff color="#e0d8d8" className="reactIcons" />
              )}
            </span>
          </div>
          <div className={`note ${passwordIsValid ? "valid" : "invalid"}`}>
            {/* <p>min 5 characters and numbers</p>
            {!passwordIsValid && !signupToggle && (
              <p>make sure your password contains 5 characters and a number</p>
            )} */}

            {!passwordIsValid && !signupToggle ? (
              <p>make sure your password contains 5 characters and a number</p>
            ) : (
              <p>min 5 characters and numbers</p>
            )}
          </div>

          <div className={`row ${repeatPasswordIsValid ? "valid" : "invalid"}`}>
            {/* <label htmlFor="repeatPassword">Repeat password</label> */}
            <input
              type={passwordsInputType2}
              id="repeatPassword"
              value={repeatPassword}
              autoComplete="on"
              placeholder="repeat password"
              onChange={handleRepeatPassword}
            />
            <span className="eyesIcon" onClick={handleShowRepeatPassword}>
              {passwordsInputType2 === "password" ? (
                <icons.HiEye color="#e0d8d8" className="reactIcons" />
              ) : (
                <icons.HiEyeOff color="#e0d8d8" className="reactIcons" />
              )}
            </span>
          </div>
          <div
            className={`note ${repeatPasswordIsValid ? "valid" : "invalid"}`}
          >
            {!repeatPasswordIsValid && !signupToggle && (
              <p>the two passwords are different</p>
            )}
          </div>
          <div className={`row ${emailIsValid ? "valid" : "invalid"}`}>
            {/* <label htmlFor="email">E-Mail</label> */}
            <input
              type="text"
              id="email"
              value={email}
              placeholder="email"
              onChange={handleEmail}
            />
          </div>
          <div className={`note ${emailIsValid ? "valid" : "invalid"}`}>
            {/* <p>e.g. xxxx@xxxx.xx </p>
            {!emailIsValid && !signupToggle && <p>please check your email</p>} */}

            {!emailIsValid && !signupToggle ? (
              <p>please check your email</p>
            ) : (
              <p>e.g. xxxx@xxxx.xx </p>
            )}
          </div>
          <div className="buttonRow">
            <button onClick={handleSubmit}>Sign Up!</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default Signup;
