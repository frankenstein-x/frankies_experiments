import React, { useState } from 'react';
import { useAuth } from "react-oidc-context";
import '../styles/UploadStyles.css';

const UploadForm = () => {
  const auth = useAuth();
  const [currentStep, setCurrentStep] = useState('upload');
  const [formData, setFormData] = useState({
    file: null,
    healthFocus: [],
    ethnicity: []
  });

  // Use Cognito user data
  const userEmail = auth.user?.profile.email;
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleMultiSelect = (event) => {
    const { id } = event.target;
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    setFormData({ ...formData, [id]: selectedOptions });
  };

  const showFocusSection = () => {
    if (!formData.file) {
      alert("Please upload a file.");
      return;
    }
    setCurrentStep('focus');
  };

  const submitForm = async () => {
    try {
      // Combine Cognito user data with form data
      const finalData = {
        ...formData,
        email: userEmail,
        // Add any other Cognito user attributes you need
      };
      
      console.log('Form submitted:', finalData);
      alert("Thank you! Your analysis is being processed.");
      
      // TODO: Send to your backend
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Analyse Your Blood Test in Minutes</h1>
      <p>Welcome {userEmail}! Upload your results and get a detailed, easy-to-understand report.</p>

      {/* Upload Section */}
      <div className={`upload-section ${currentStep === 'upload' ? 'active' : ''}`}>
        <h2>Step 1: Upload Your Blood Test Results</h2>
        <p>Select a file (PDF, CSV, or Excel) to upload:</p>
        <input 
          type="file" 
          id="file-upload" 
          accept=".pdf,.csv,.xlsx"
          onChange={handleFileUpload}
        />
        <button className="btn" onClick={showFocusSection}>Upload and Continue</button>
      </div>

      {/* Health Focus Section */}
      <div className={`focus-section ${currentStep === 'focus' ? 'active' : ''}`}>
        <h2>Step 2: What's Your Health Focus?</h2>
        <p>This helps us tailor the analysis to your specific goals</p>

        <label htmlFor="ethnicity">Ethnicity (Optional)</label>
        <select 
          id="ethnicity" 
          multiple 
          value={formData.ethnicity}
          onChange={handleMultiSelect}
        >
          <option value="asian">Asian</option>
          <option value="black">Black or African</option>
          <option value="hispanic">Hispanic or Latino</option>
          <option value="white">White</option>
          <option value="indigenous">Indigenous</option>
          <option value="middle-eastern">Middle Eastern</option>
          <option value="native-american">Native American</option>
          <option value="pacific-islander">Pacific Islander</option>
          <option value="south-asian">South Asian</option>
          <option value="east-asian">East Asian</option>
          <option value="southeast-asian">Southeast Asian</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="focus">Health Focus</label>
        <select 
          id="healthFocus" 
          multiple
          value={formData.healthFocus}
          onChange={handleMultiSelect}
        >
          <option value="general-health">General Health</option>
          <option value="pregnancy">Pregnancy</option>
          <option value="acne">Acne</option>
          <option value="skin-health">Skin Health</option>
          <option value="metabolic-health">Metabolic Health</option>
          <option value="weight-management">Weight Management</option>
          <option value="bone-health">Bone Health</option>
          <option value="longevity">Longevity</option>
          <option value="performance">Performance</option>
          <option value="mental-health">Mental Health</option>
          <option value="hormonal-balance">Hormonal Balance</option>
          <option value="energy-levels">Energy Levels</option>
        </select>
        <button className="btn" onClick={submitForm}>Submit and Get Analysis</button>
      </div>
    </div>
  );
};

export default UploadForm;
