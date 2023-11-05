import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '@/comp/NavBar'
import axios from 'axios';
import UserList from './userlist';

class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ethnicity: '',
      gender: '',
      age: '',
      hasDiabetes: false,
      hasHypertension: false,
      hasHeartDisease: false,
      hasAsthma: false,
      hasCancer: false,
      hasStroke: false,
      additionalComments: '',
      patientcond: '',
    };
    this.flags = {
      submitted: false,
      hide: false,
    };
  }

  handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    this.setState({ [name]: inputValue });
  };

  handleSubmit = async (event) => {
    console.log(`Submitting: ${this.flags.submitted}`);
    event.preventDefault();
    const {
      name,
      ethnicity,
      gender,
      age,
      hasDiabetes,
      hasHypertension,
      hasHeartDisease,
      hasAsthma,
      hasCancer,
      hasStroke,
      additionalComments,
      patientcond,
    } = this.state;
  
    // Convert boolean values to strings
    const diabetesString = hasDiabetes ? 'diabetes' : null;
    const hypertensionString = hasHypertension ? 'hypertension' : null;
    const heartDiseaseString = hasHeartDisease ? 'heart disease' : null;
    const asthmaString = hasAsthma ? 'asthma' : null;
    const cancerString = hasCancer ? 'cancer' : null;
    const strokeString = hasStroke ? 'stroke' :  null;
  
    // Create the demographics list
    const demographics = [
      name,
      ethnicity,
      gender,
      age,
      diabetesString,
      hypertensionString,
      heartDiseaseString,
      asthmaString,
      cancerString,
      strokeString,
      patientcond,
    ];
  
    // Create the JSON object
    let jsonData = {
      "query": additionalComments,
      "demographics": demographics,
    };
    for (let i = demographics.length - 1; i >= 0; i--) {
      if (demographics[i] === null) {
        demographics.splice(i, 1);
      }
    }
    console.log(jsonData);
    // Send a POST request
    try {
      const data = await axios.post("http://localhost:5000/submit", {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: jsonData,
        }
      );
      // hide form
      this.flags.hide = true;

      // Hide the form by adding hidden style to myForm
      document.getElementById('myForm').hidden = true;  

      // Show the loading animation
      <LoadingOutlined />

      if (data.status === 200) {
        // Render the results page
        this.flags.submitted = true;
        console.log(`Submitted: ${this.flags.submitted}`);

      } else {
        console.error('Failed to submit the data');
      }
    } catch (error) {
      console.error('Error while sending the POST request:', error);
    }
  };
  
  // handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const {
  //     name,
  //     ethnicity,
  //     gender,
  //     age,
  //     hasDiabetes,
  //     hasHypertension,
  //     hasHeartDisease,
  //     hasAsthma,
  //     hasCancer,
  //     hasStroke,
  //     additionalComments,
  //     patientcond,
  //   } = this.state;

  
  //   console.log(this.state);
  //   // Prepare jsonData
  //   const jsonData = {
  //     query: additionalComments,
  //     demographics: demographics,
  //   };

  //   for (let i = demographics.length - 1; i >= 0; i--) {
  //         if (demographics[i] === null) {
  //           demographics.splice(i, 1);
  //         }
  //       }
  
  //   // Send a POST request
  //   try {
  //     // const response = await axios.post("http://localhost:5000/submit", jsonData, {
  //     //   headers: {
  //     //     'Content-Type': 'application/json',
  //     //     'Access-Control-Allow-Origin': '*',
  //     //   }
  //     // });
  //     const response = await axios.post("http://localhost:5000/submit", jsonData, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //   });
  
  //     console.log(response);
  //     if (response.status === 200) {
  //       // Use React Router's history to navigate
  //       this.props.history.push('/results');
  //     } else {
  //       console.error('Failed to submit the data');
  //       // Consider adding user notification of failure here
  //     }
  //   } catch (error) {
  //     console.error('Error while sending the POST request:', error);
  //     // Consider adding user notification of error here
  //   }
  // };
  
  render() {
    return (
      
      <div>
        <NavBar></NavBar>
        
        <div
          id="myForm"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '155vh',
            width: '100%',
          }}
        >
          {/* {
            if (submitted) {
              // Hide loading animation
              <LoadingOutlined />

              <UserList /> {}
            }
          } */}
          <form
            className="max-w-md p-4 bg-white rounded-lg shadow-lg"
            onSubmit={this.handleSubmit}
            style={{ width: 600 }}
          >
            <h1 style={{ textAlign: 'center', color: 'black' }}>
              Patient Search Form
            </h1>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ethnicity" className="block text-sm font-medium text-gray-700">
                Ethnicity:
              </label>
              <input
                type="text"
                id="ethnicity"
                name="ethnicity"
                value={this.state.ethnicity}
                onChange={this.handleInputChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender:
              </label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={this.state.gender}
                onChange={this.handleInputChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age:
              </label>
              <input
                type="text"
                id="age"
                name="age"
                value={this.state.age}
                onChange={this.handleInputChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Pre-existing Conditions:
              </label>
              <div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      name="hasDiabetes"
                      checked={this.state.hasDiabetes}
                      onChange={this.handleInputChange}
                    />
                    &nbsp;Diabetes
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      name="hasHypertension"
                      checked={this.state.hasHypertension}
                      onChange={this.handleInputChange}
                    />
                    &nbsp;Hypertension
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      name="hasHeartDisease"
                      checked={this.state.hasHeartDisease}
                      onChange={this.handleInputChange}
                    />
                    &nbsp;Heart Disease
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      name="hasAsthma"
                      checked={this.state.hasAsthma}
                      onChange={this.handleInputChange}
                    />
                    &nbsp;Asthma
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      name="hasCancer"
                      checked={this.state.hasCancer}
                      onChange={this.handleInputChange}
                    />
                    &nbsp;Cancer
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      name="hasStroke"
                      checked={this.state.hasStroke}
                      onChange={this.handleInputChange}
                    />
                    &nbsp;Stroke
                  </label>
                </div>
                {/* Add more condition checkboxes as needed */}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="additionalComments" className="block text-sm font-medium text-gray-700">
                Additional Comments:
              </label>
              <textarea
                id="additionalComments"
                name="additionalComments"
                value={this.state.additionalComments}
                onChange={this.handleInputChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-indigo-500"
                style={{ resize: 'none', height: '200px' }}
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="patientcond" className="block text-sm font-medium text-gray-700">
                Patient Condition:
              </label>
              <textarea
                id="patientcond"
                name="patientcond"
                value={this.state.patientcond}
                onChange={this.handleInputChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-indigo-500"
                style={{ resize: 'none', height: '200px' }}
              ></textarea>
            </div>
            
              <button
                id="myButton"
                type="submit"
                className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:ring focus:ring-indigo-300"
                style={{ backgroundColor: '#13445d' }}
              >
                Submit
              </button>
            
          </form>
          
        </div>
        
      </div>
    
    );
  }
}
export default MyForm;
