import { Auth } from '@aws-amplify/auth';
import awsConfig from '../config/aws-config';

// Initialize Amplify
Auth.configure(awsConfig);

export const AuthService = {
  // Sign up new user
  signUp: async (email, password, attributes) => {
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          ...attributes
        }
      });
      return user;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },

  // Sign in user
  signIn: async (email, password) => {
    try {
      const user = await Auth.signIn(email, password);
      return user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  // Confirm sign up (email verification)
  confirmSignUp: async (email, code) => {
    try {
      await Auth.confirmSignUp(email, code);
      return true;
    } catch (error) {
      console.error('Error confirming sign up:', error);
      throw error;
    }
  },

  // Sign out
  signOut: async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  // Get current authenticated user
  getCurrentUser: async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Password reset request
  forgotPassword: async (email) => {
    try {
      await Auth.forgotPassword(email);
    } catch (error) {
      console.error('Error initiating password reset:', error);
      throw error;
    }
  },

  // Confirm new password
  forgotPasswordSubmit: async (email, code, newPassword) => {
    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
    } catch (error) {
      console.error('Error confirming password reset:', error);
      throw error;
    }
  }
};

export default AuthService;
