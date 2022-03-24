import React from "react";
import { useState } from "react";
import { useTheme } from "../../ThemeContext";
import icons from "../../functions/icons.js";

function Login() {
  const { setValidationMenuToggle, setCurrentUser, backendUrl } = useTheme();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [invalidLogin, setInvalidLogin] = useState("");
  const [passwordsInputType, setPasswordsInputType] = useState("password");
  const handleUsername = (e) => {
    const _username = e.target.value;
    setUsername(_username);
  };

  const handlePassword = (e) => {
    const _password = e.target.value;
    setPassword(_password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };
    // console.log(requestOptions);
    const response = await fetch(`${backendUrl}/users/login`, requestOptions);
    if (!response.ok) {
      // setUsername("");
      setPassword("");
      setInvalidLogin("Oops... Check your credentials!");
    } else {
      const _currentUser = await response.json();
      // console.log(_currentUser);
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
      setUsername("");
      setPassword("");
      setValidationMenuToggle(false);
    }
  };

  const handleShowPasswordButton = () => {
    setPasswordsInputType(
      passwordsInputType === "password" ? "text" : "password"
    );
  };

  return (
    <div className="Login">
      <form>
        <fieldset>
          <legend>Login</legend>
          <div className="row">
            <input
              type="text"
              id="login"
              value={username}
              placeholder="username"
              onChange={handleUsername}
            />
          </div>
          <div className="row">
            <input
              type={passwordsInputType}
              id="password"
              value={password}
              autoComplete="on"
              placeholder="password"
              onChange={handlePassword}
            />
            <span className="eyesIcon" onClick={handleShowPasswordButton}>
              {passwordsInputType === "password" ? (
                <icons.HiEye color="#e0d8d8" className="reactIcons" />
              ) : (
                <icons.HiEyeOff color="#e0d8d8" className="reactIcons" />
              )}
            </span>
          </div>
          <div className="note">
            <p>{invalidLogin}</p>
          </div>
          <div className="buttonRow">
            <button onClick={handleLogin}>Login</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
