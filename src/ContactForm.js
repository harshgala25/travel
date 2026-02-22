import React, { Component, createRef, useEffect, useState } from "react";

/* Wrapper uses HOOKS (useState + useEffect) to show success message */
function ContactPage() {
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    if (!showMsg) return;

    const t = setTimeout(() => setShowMsg(false), 3000);
    return () => clearTimeout(t);
  }, [showMsg]);

  return (
    <div style={{ padding: "40px 20px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "520px" }}>
        {showMsg && (
          <div
            style={{
              marginBottom: "14px",
              padding: "12px 14px",
              borderRadius: "12px",
              background: "#dcfce7",
              border: "1px solid #22c55e",
              color: "#14532d",
              boxShadow: "0 6px 18px rgba(0,0,0,0.12)"
            }}
          >
            ✅ Thanks! We received your message. We’ll contact you soon.
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

  handleBlur = (e) => {
    const { name, value } = e.target;
    const error = this.validateField(name, value);

    this.setState((prev) => ({
      touched: { ...prev.touched, [name]: true },
      errors: { ...prev.errors, [name]: error }
    }));
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    if (this.state.touched[name]) {
      const error = this.validateField(name, value);
      this.setState((prev) => ({
        errors: { ...prev.errors, [name]: error }
      }));
    }
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
      alert("Form Submitted Successfully!");

      if (this.props.onSuccess) this.props.onSuccess();

      this.setState({
        name: "",
        email: "",
        message: "",
        errors: {},
        touched: {}
      });
    }
  };

  render() {
    const { name, email, message, errors } = this.state;

    return (
      <div
        style={{
          padding: "26px 24px",
          borderRadius: "16px",
          background: "white",
          boxShadow: "0 10px 28px rgba(0,0,0,0.18)"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 28 }}>📩</div>
          <h2 style={{ margin: "8px 0 4px" }}>Contact Us</h2>
          <div style={{ color: "#64748b", fontSize: 14 }}>
            Fill the form and we’ll reach you
          </div>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <input
              ref={this.nameRef}
              type="text"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              style={{
                width: "90%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1"
              }}
            />
            <div style={{ color: "#ef4444", fontSize: 13, marginTop: 6 }}>
              {errors.name}
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              style={{
                width: "90%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1"
              }}
            />
            <div style={{ color: "#ef4444", fontSize: 13, marginTop: 6 }}>
              {errors.email}
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <textarea
              name="message"
              placeholder="Enter Message"
              value={message}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              rows="4"
              style={{
                width: "90%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                resize: "vertical"
              }}
            />
            <div style={{ color: "#ef4444", fontSize: 13, marginTop: 6 }}>
              {errors.message}
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "10px",
              border: "none",
              background: "#0f172a",
              color: "white",
              fontSize: 16,
              cursor: "pointer"
            }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

/* IMPORTANT: export the HOOKS wrapper, not the class */
export default ContactPage;
