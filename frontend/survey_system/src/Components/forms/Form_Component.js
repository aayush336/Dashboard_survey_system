import React, { useState } from 'react';
import { animate, motion } from 'framer-motion';

import "./Form_component.css";

const Form_Component = ({ onSubmitForm }) => {
  const questions = [
    { id: 1, question: "What is your Full name?", key: "fullName" },
    { id: 2, question: "What is your Date of Birth?", type: "date", key: "dateOfBirth" },
    { id: 3, question: "What is your gender?", type: "radio", options: ["Male", "Female", "Others"], key: "gender" },
    { id: 4, question: "What is your highest qualification?", type: "select", options: ["10th", "12th", "Diploma", "Graduate", "PostGraduate", "Others"], key: "course" },
    { id: 5, question: "What is the fees of Current Course?", type: "number", key: "fees" },
    { id: 6, question: "What are your dream companies?", type: "multi-select", options: ["TCS", "Infosys", "Wipro", "HCL Technologies", "Tech Mahindra", "Cognizant", "Accenture", "IBM India", "Capgemini India", "Oracle India", "Microsoft India", "Google India", "Amazon India", "Adobe India", "Cisco India", "Intel India", "SAP Labs India", "Deloitte India", "Ernst & Young (EY) India", "PwC India", "KPMG India", "Larsen & Toubro Infotech (LTI)", "Mindtree", "Mphasis", "Hexaware Technologies", "Zoho Corporation", "Freshworks", "ThoughtWorks", "Mu Sigma", "InMobi", "Flipkart", "Paytm", "Ola Cabs", "Swiggy", "Byju's", "OYO Rooms", "MakeMyTrip", "Zomato", "Practo", "PolicyBazaar", "BigBasket", "Quikr", "Grofers", "Razorpay", "Dream11", "Lenskart", "Unacademy", "CarDekho", "UrbanClap (now Urban Company)", "Meesho"], key: "companies" },
    { id: 7, question: "Write Something about yourself.", type: "string", key: "about" },
    { id: 8, question: "What is your expected salary?", type: "number", key: "salary" }
  ];

  const [formData, setFormData] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [errorFields, setErrorFields] = useState({});

  const MAX_SELECTED_COMPANIES = 5;

  const animationVariant = {
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: -800,
    },
    transition: {
      duration: 5,
      delay: 0.2,
      ease: 'easeInOut',
    },
  };

  const handleClick = () => {
    setIsAnimating(true);
  };

  const validateForm = () => {
    const errors = {};

    // Check each question for validation
    questions.forEach((question) => {
      const { id, question: questionText, key, type } = question;
      const answer = formData[key];

      // Perform specific validation based on the question type
      switch (type) {
        case "select":
        case "multi-select":
          if (!answer || answer.length === 0) {
            errors[key] = `${questionText} cannot be empty`;
          }
          break;
        default:
          if (!answer || answer.trim() === "") {
            errors[key] = `${questionText} cannot be empty`;
          }
      }
    });

    setErrorFields(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form before submitting
    const isValid = validateForm();

    if (isValid) {
      onSubmitForm(formData); // Call the function in the parent component
      setIsAnimating(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isCompanySelected = (company) => {
    return formData.companies && formData.companies.includes(company);
  };

  const handleCompanySelect = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const prevValues = prevData[name] || [];
      let updatedValues;
      if (prevValues.includes(value)) {
        updatedValues = prevValues.filter((v) => v !== value);
      } else {
        if (prevValues.length < MAX_SELECTED_COMPANIES) {
          updatedValues = [...prevValues, value];
        } else {
          console.log(`You can select up to ${MAX_SELECTED_COMPANIES} companies.`);
          updatedValues = prevValues;
        }
      }
      return { ...prevData, [name]: updatedValues };
    });
  };

  const renderQuestion = (question) => {
    const { id, key, type, question: questionText } = question;
    const error = errorFields[key];

    switch (type) {
      case "radio":
        return (
          <div key={id} className="mb-3">
            <label>{questionText}</label>
            {question.options.map((option) => (
              <div key={option} className="form-check">
                <input
                  type="radio"
                  name={key}
                  className="form-check-input"
                  value={option}
                  checked={formData[key] === option}
                  onChange={handleChange}
                />
                <label className="form-check-label">{option}</label>
              </div>
            ))}
            {error && <div className="error-message">{error}</div>}
          </div>
        );
      case "select":
        return (
          <div key={id} className="mb-3">
            <label>{questionText}</label>
            <select
              name={key}
              className="form-select"
              value={formData[key] || ""}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              {question.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {error && <div className="error-message">{error}</div>}
          </div>
        );
      case "multi-select":
        return (
          <div key={id} className="mb-3">
            <label>{questionText}</label>
            <select
              name={key}
              className="form-select"
              multiple
              value={formData[key] || []}
              onChange={handleCompanySelect}
            >
              {question.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {error && <div className="error-message">{error}</div>}
          </div>
        );
      default:
        return (
          <div key={id} className="mb-3">
            <label>{questionText}</label>
            <input
              type={type || "text"}
              name={key}
              className="form-control"
              value={formData[key] || ""}
              onChange={handleChange}
            />
            {error && <div className="error-message">{error}</div>}
          </div>
        );
    }
  };

  return (
    <div className="container mt-5">
      <div className="complete_box">
        <div className="box1">
          <h2>Survey Form</h2>
          <form onSubmit={handleSubmit}>
            {questions.map((question) => renderQuestion(question))}
            <button type="submit" className="btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div className="box2">
          <motion.div
            variants={animationVariant}
            initial={isAnimating ? "animate" : "initial"}
            animate={isAnimating ? "animate" : "initial"}
            whileTap={{ scale: 1.2 }}
            onClick={handleClick}
          >
            <div className="rocket_image"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Form_Component;
