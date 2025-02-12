import React from "react";
import { useAuth } from "react-oidc-context";
import UploadForm from './components/UploadForm';
import './styles/UploadStyles.css';

function App() {
  const auth = useAuth();

  const handleSignOut = async () => {
    try {
      await auth.removeUser();
      // Clear any local storage or state if needed
      localStorage.clear();
      // Redirect to home
      window.location.href = "http://localhost:3000";
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <header>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Lab Test Analysis</span>
            <button 
              onClick={handleSignOut}
              className="btn"
              style={{ width: 'auto', margin: 0, padding: '8px 16px' }}
            >
              Sign out
            </button>
          </div>
        </header>
        <UploadForm />
        {/* ... rest of your code ... */}
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Lab Analysis Portal</h1>
      <p>Understand your lab results with detailed insights and recommendations</p>
      <button className="btn" onClick={() => auth.signinRedirect()}>Sign in with your email</button>
    </div>
  );
}

export default App;
