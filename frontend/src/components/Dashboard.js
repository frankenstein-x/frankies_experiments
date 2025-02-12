// frontend/src/components/Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [labResults, setLabResults] = useState([]);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Your Lab Results</h2>
        <button
          onClick={() => navigate('/upload')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Upload New Results
        </button>
      </div>

      {labResults.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h3 className="text-xl font-medium text-gray-900 mb-4">No Lab Results Yet</h3>
          <p className="text-gray-500 mb-6">
            Upload your first lab results to get detailed analysis and insights.
          </p>
          <button
            onClick={() => navigate('/upload')}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Upload Your First Results
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {labResults.map((result, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900">{result.date}</h3>
                <p className="text-gray-500">{result.labType}</p>
              </div>
              <div className="space-y-2">
                {/* Preview of key metrics */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Markers Analyzed:</span>
                  <span className="font-medium">{result.markerCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">Analyzed</span>
                </div>
              </div>
              <button
                onClick={() => navigate(`/analysis/${result.id}`)}
                className="mt-4 w-full bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
              >
                View Analysis
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
