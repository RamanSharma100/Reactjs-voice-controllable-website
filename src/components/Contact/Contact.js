import { useState, useEffect } from "react";

const Contact = ({
  newName,
  newEmail,
  newMessage,
  nameRef,
  emailRef,
  messageRef,
  submitRef,
  submitForm,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (newName) {
      setName(newName);
    }
  }, [newName]);

  useEffect(() => {
    if (newEmail) {
      setEmail(newEmail);
    }
  }, [newEmail]);

  useEffect(() => {
    if (newMessage) {
      setMessage(newMessage);
    }
  }, [newMessage]);

  return (
    <div className="container">
      <h4 className="text-center my-4 display-3">Contact</h4>
      <div className="row">
        <div className="col-md-6 mx-auto mt-5">
          <form className="w-100" onSubmit={submitForm}>
            <div className="form-group">
              <input
                type="text"
                className="form-control mb-2"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                ref={nameRef}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control mb-2"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ref={emailRef}
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control mb-2"
                id="message"
                rows="3"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                ref={messageRef}
              ></textarea>
            </div>
            <button
              type="submit"
              ref={submitRef}
              className="btn btn-primary form-control"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
