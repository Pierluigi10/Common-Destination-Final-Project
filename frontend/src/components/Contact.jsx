import React, { useRef, useState } from "react";
// import emailjs from "emailjs-com";
// import emailjs from "@emailjs/browser";
import { useTheme } from "../ThemeContext";
import emailjs, { init } from "@emailjs/browser";
import InputData from "./contact/InputData";

init(process.env.REACT_APP_USER_ID);

function Contanct(props) {
  const { burgerMenuToggle } = useTheme();
  const formRef = useRef();
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        formRef.current,
        process.env.REACT_APP_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
          setDone(true);
          setName("");
          setSubject("");
          setEmail("");
          setMessage("");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className={props.className}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <fieldset style={{ opacity: burgerMenuToggle ? "100%" : "90%" }}>
          <legend style={{ opacity: burgerMenuToggle ? "100%" : "80%" }}>
            Get in touch!
          </legend>
          <div className="inputArea">
            <InputData
              placeholder="Name"
              name="user_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputData
              placeholder="Subject"
              name="user_subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <InputData
              placeholder="Email"
              name="user_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Message"
              name="message"
              rows="8"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required={true}
            ></textarea>
          </div>
          <button>Send</button>
          {done && "Thank you!"}
        </fieldset>
      </form>
    </div>
  );
}

export default Contanct;
