import React from "react";
import { useTheme } from "../../ThemeContext";
import Login from "./Login";
import Signup from "./Signup";
import icons from "../../functions/icons.js";

function Validation() {
  const {
    setValidationMenuToggle,
    signupToggle,
    setSignupToggle,
    loginToggle,
    setLoginToggle,
    mediaQueries,
  } = useTheme();

  return (
    <div
      className="Validation"
      style={{
        width: mediaQueries.smallView ? "100vw" : "40vw",
        minHeight: mediaQueries.smallView ? "100vh" : "70vh",
        borderRadius: mediaQueries.smallView ? "0" : "50px",
      }}
    >
      <icons.MdOutlineClose
        className="menuIconClosed"
        onClick={() => {
          setValidationMenuToggle(false);
        }}
      />

      {signupToggle && <Signup />}
      {loginToggle && <Login />}

      <ul>
        {loginToggle ? (
          <li>
            <p>Don't have an account yet?</p>
            <button
              onClick={() => {
                setLoginToggle(false);
                setSignupToggle(true);
              }}
            >
              Sign up!
            </button>
          </li>
        ) : (
          <li>
            <p>If you already have an account</p><button
              onClick={() => {
                setLoginToggle(true);
                setSignupToggle(false);
              }}
            >
              Log In!
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Validation;
