import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import StyledStarsCanvas from "./Star.jsx";
import EarthCanvas from "./Earth.jsx";
import "./Contact.css";
import "./Button.css";
import "remixicon/fonts/remixicon.css";

const Contact = () => {
  const form = useRef();
  const [hoverState, setHoverState] = useState("hover-out");
  const [sending, setSending] = useState(false);
  const [showEarth, setShowEarth] = useState(true); // 🌍 control visibility

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 960) {
        setShowEarth(false); // hide for mobile & tablet
      } else {
        setShowEarth(true); // show for desktop
      }
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSending(true);
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY);
      alert("✅ Message Sent Successfully!");
      form.current.reset();
    } catch (err) {
      alert("❌ Error sending message. Try again later.");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact-container" id="contact">
      <StyledStarsCanvas />
      <div className="contact-wrapper">
        {/* Left Section */}
        <div className="contact-left">
          <h1 className="contact-title">Contact</h1>
          <p className="contact-desc">
            Feel free to reach out to me for any questions or opportunities!
          </p>

          <form ref={form} onSubmit={handleSubmit} className="contact-form">
            <h2>Let's connect 🚀</h2>

            <input
              type="text"
              className="contact-input"
              placeholder="Your Name"
              name="name"
              required
            />

            <input
              type="email"
              className="contact-input"
              placeholder="Your Email"
              name="email"
              required
            />

            <textarea
              className="contact-textarea"
              placeholder="Message"
              name="message"
              rows="4"
              required
            ></textarea>

            <button
              type="submit"
              className={`${hoverState} ${sending ? "disabled-btn" : ""}`}
              onMouseEnter={() => setHoverState("hover-in")}
              onMouseLeave={() => setHoverState("hover-out")}
              disabled={sending}
            >
              {sending ? (
                <>
                  <span className="button__text">Sending...</span>
                </>
              ) : (
                <>
                  <span className="button__text">Send Message</span>
                  <div className="button__filler"></div>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Section (hidden on mobile & tablet) */}
        {showEarth && (
          <div className="contact-right">
            <EarthCanvas />
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
