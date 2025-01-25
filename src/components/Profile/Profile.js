import styled from "styled-components";
import "./Profile.css";
import ProfilePicture from "../../assets/images/Terence resume photo.jpg";
import React, { useState } from "react";
import axios from "axios";
import { Toast, ToastContainer } from "react-bootstrap";
import { emailUrl } from "../../config/config";
import { FaDocker, FaGithub, FaReact, FaJava } from "react-icons/fa";
import { SiSpringboot } from "react-icons/si";
import { DiNginx } from "react-icons/di";
import { BiLogoPostgresql } from "react-icons/bi";

const breakpoints = {
  mobile: "768px",
  tablet: "1024px",
  desktop: "1200px",
};

export default function Profile() {
  return (
    <>
      <div className="hero">
        <Hero />
      </div>
      <div className="about">
        <About />
      </div>
      <div className="contact" id="contact">
        <Contact />
      </div>
    </>
  );
}

const HeroContainer = styled.div`
  background-color: #dcdcdc;
  padding: 1em 6em;
  margin: 3em 15vw;
  border-radius: 1em;
  border: 1px solid #99641515;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
    margin: 0.5em;
  }
`;

const HeroBanner = () => {
  return (
    <>
      <div className="powered-by">
        <p>Site powered by: </p>
      </div>
      <div className="bg-gray-900 text-white text-center py-16">
        <div className="flex flex-wrap justify-center gap-8 skills">
          <div className="flex flex-col items-center skills-icon">
            <FaDocker
              size={48}
              className="text-blue-500 hover:scale-110 transition-transform"
            />
            <p className="mt-2 text-sm">Docker</p>
          </div>
          <div className="flex flex-col items-center skills-icon">
            <FaGithub
              size={48}
              className="text-gray-400 hover:scale-110 transition-transform "
            />
            <p className="mt-2 text-sm">GitHub Actions</p>
          </div>
          <div className="flex flex-col items-center skills-icon">
            <FaReact
              size={48}
              className="text-blue-300 hover:scale-110 transition-transform "
            />
            <p className="mt-2 text-sm">React</p>
          </div>
          <div className="flex flex-col items-center skills-icon">
            <SiSpringboot
              size={48}
              className="text-green-400 hover:scale-110 transition-transform "
            />
            <p className="mt-2 text-sm">Spring Boot</p>
          </div>
          <div className="flex flex-col items-center skills-icon">
            <FaJava
              size={48}
              className="text-red-500 hover:scale-110 transition-transform "
            />
            <p className="mt-2 text-sm">Java</p>
          </div>
          <div className="flex flex-col items-center skills-icon">
            <BiLogoPostgresql
              size={48}
              className="text-green-500 hover:scale-110 transition-transform "
            />
            <p className="mt-2 text-sm">Postgresql</p>
          </div>
          <div className="flex flex-col items-center skills-icon">
            <DiNginx
              size={48}
              className="text-green-500 hover:scale-110 transition-transform "
            />
            <p className="mt-2 text-sm">Nginx</p>
          </div>
        </div>
      </div>
    </>
  );
};

function Hero() {
  return (
    <>
      <h1>Hello, I'm Terence</h1>
      <p>I'm a full-stack web developer.</p>
      <a href="#contact" class="cta-button">
        Contact Me
      </a>
      <HeroBanner></HeroBanner>
    </>
  );
}

function About() {
  return (
    <>
      <div className="aboutContainer">
        <div className="profilePicture">
          <img src={ProfilePicture}></img>
        </div>
        <div className="profileText">
          <h1 className="profile-title">About me </h1>
          <p>
            I'm a software developer in Singapore, working in an international
            bank. I have experience building and maintaining brownfield and
            greenfield enterprise systems and have deep expertise in Java and
            Spring Boot.
          </p>
          <p>
            Fully committed to life-long learning and expanding my skillsets, I
            have a deep passion all things web development. The unique
            combination of creativity, logic, technology and never running out
            of new things to discover, drives my excitement and passion for web
            development. When I'm not at my computer I like to spend my time
            reading, keeping fit with Jiu Jitsu!
          </p>
        </div>
      </div>
    </>
  );
}

function Contact() {
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }

    if (!formData.message) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form data submitted:", formData);
      // You can perform further actions like sending the data to an API here

      axios
        .post(`${emailUrl}`, formData)
        .then((response) => {
          setShowToast(true);
        })
        .catch((error) => {
          console.error(error);
          setError(error.response.data);
        });
    }
  };

  return (
    <>
      <h1>Contact</h1>
      <p>
        Have a question or want to work together? Leave your details and I'll
        get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="form-parent">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={8}
          />
          {errors.message && <span className="error">{errors.message}</span>}
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <ToastContainer>
        <Toast
          bg="danger"
          show={error}
          onClose={() => setError(null)}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Failed to send email!</strong>
          </Toast.Header>
          <Toast.Body className={"text-white"}>{error}</Toast.Body>
        </Toast>
      </ToastContainer>
      <ToastContainer>
        <Toast
          bg="primary"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Email sent successfully!</strong>
          </Toast.Header>
          <Toast.Body className={"text-white"}>
            Thank you for your email. I'll get back to you as soon as possible.
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
