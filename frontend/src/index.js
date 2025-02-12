import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from "react-oidc-context";
import App from "./App";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_g2BVtuZLV",
  client_id: "4mend4r5hh6teljhqh3380dmlh",
  redirect_uri: "http://localhost:3000",
  post_logout_redirect_uri: "http://localhost:3000",  // Add this
  response_type: "code",
  scope: "email openid phone",
  loadUserInfo: true,
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
  onSignoutCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
};

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
