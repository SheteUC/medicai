import React, { Component } from 'react';
import NavBar from '@/comp/NavBar'

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
  }

  handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    this.setState({ [name]: inputValue });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      name,
      ethnicity,
      gender,
      age,
      additionalComments,
      conditions,
      patientcond,
    } = this.state;
    console.log('Name:', name);
    console.log('Ethnicity:', ethnicity);
    console.log('Gender:', gender);
    console.log('Age:', age);
    console.log('Pre-existing Conditions:', conditions);
    console.log('Additional Comments:', additionalComments);
    console.log('patientcond', patientcond);
  };

  render() {
    return (
      
      <div>
        <NavBar></NavBar>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '180vh',
            width: '100%',
          }}
        >
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
            
