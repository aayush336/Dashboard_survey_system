// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import BackgroundComponent from './Components/bg_effects/Background_component';
import Form_Component from './Components/forms/Form_Component';
import axios from 'axios';

function App() {


  const handleFormSubmit = (formData) => {
    // Do whatever you want with the form data here
    console.log( formData);

    formData.companies = Array.isArray(formData.companies) ? formData.companies : [formData.companies];
    axios.post('http://localhost:8080/api/surveys', formData)
      .then(response => {
        console.log('Survey data sent successfully:', response.data);
        // You can add any additional logic you need after the data is successfully sent.
      })
      .catch(error => {
        console.error('Error sending survey data:', error);
        console.log('Response data:', error.response.data); // Log the response data for more details
      });
      

    // You can also send the data to the server, store it in state, etc.
  };
  
  
  return (
    <div>
      <BackgroundComponent/>
      <Form_Component onSubmitForm={handleFormSubmit} />
      

    </div>
      

  );


};


export default App;











