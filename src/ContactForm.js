import React, { Component, createRef, useEffect, useState } from "react";

/* Wrapper component using Hooks */
function ContactPage() {
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    if (!showMsg) return;
    const t = setTimeout(() => setShowMsg(false), 3000);
    return () => clearTimeout(t);
  }, [showMsg]);

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f1f5f9",
        padding: "20px"
      }}
    >
      <div style={{ width: "100%", maxWidth: "520px" }}>
        {showMsg && (
          <div
            style={{
              background: "#dcfce7",
              border: "1px solid #22c55e",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "15px",
              color: "#14532d",
              textAlign: "center"
            }}
          >
            ✅ Message sent successfully! We will contact you soon.
          </div>
        )}

        <ContactForm onSuccess={() => setShowMsg(true)} />
      </div>
    </div>
  );
}

class ContactForm extends Component {
  constructor(props) {
    super(props);

    this.nameRef = createRef();

    this.state = {
      name: "",
      email: "",
      message: "",
      errors: {},
      touched: {}
    };
  }

  componentDidMount() {
    this.nameRef.current.focus();
  }

  validateField = (name, value) => {
    let error = "";

    if (name === "name") {
      if (!value) error = "Name is required";
      else if (value.trim().length < 2) error = "Name must be at least 2 characters";
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) error = "Email is required";
      else if (!emailRegex.test(value)) error = "Enter valid email";
    }

    if (name === "message") {
      if (!value) error = "Message is required";
    }

    return error;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = this.state;

    const errors = {
      name: this.validateField("name", name),
      email: this.validateField("email", email),
      message: this.validateField("message", message)
    };

    this.setState({
      errors,
      touched: { name: true, email: true, message: true }
    });

    const hasError = Object.values(errors).some((err) => err);

    if (!hasError) {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      })
        .then((res) => res.json())
        .then(() => {
          if (this.props.onSuccess) this.props.onSuccess();

          this.setState({
            name: "",
            email: "",
            message: "",
            errors: {},
            touched: {}
          });
        });
    }
  };

  render() {
    const { name, email, message, errors } = this.state;

    return (
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>📩 Contact Us</h2>
        <p style={{ textAlign: "center", color: "#64748b", marginBottom: "20px" }}>
          Have a question about our travel packages? Send us a message.
        </p>

        <form onSubmit={this.handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <input
              ref={this.nameRef}
              type="text"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => this.setState({ name: e.target.value })}
              style={inputStyle}
            />
            <div style={errorStyle}>{errors.name}</div>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => this.setState({ email: e.target.value })}
              style={inputStyle}
            />
            <div style={errorStyle}>{errors.email}</div>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <textarea
              name="message"
              placeholder="Write your message..."
              rows="4"
              value={message}
              onChange={(e) => this.setState({ message: e.target.value })}
              style={textareaStyle}
            />
            <div style={errorStyle}>{errors.message}</div>
          </div>

          <button style={buttonStyle} type="submit">
            Send Message
          </button>
        </form>
      </div>
    );
  }
}

const inputStyle = {
  width: "90%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "14px"
};

const textareaStyle = {
  width: "90%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
  resize: "vertical"
};

const buttonStyle = {
  width: "96%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "#0f172a",
  color: "white",
  fontSize: "16px",
  cursor: "pointer"
};

const errorStyle = {
  color: "#ef4444",
  fontSize: "13px",
  marginTop: "5px"
};

export default ContactPage;
