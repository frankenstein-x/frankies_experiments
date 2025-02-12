const awsConfig = {
  region: 'ap-southeast-2',
  userPoolId: 'YOUR_USER_POOL_ID', // Replace with your User Pool ID
  userPoolWebClientId: 'YOUR_CLIENT_ID', // Replace with your Client ID
  authenticationFlowType: 'USER_SRP_AUTH',
  oauth: {
    domain: 'YOUR_COGNITO_DOMAIN.auth.YOUR_REGION.amazoncognito.com',
    scope: ['email', 'openid', 'profile'],
    redirectSignIn: 'http://localhost:3000/dashboard',
    redirectSignOut: 'http://localhost:3000/',
    responseType: 'code'
  }
};

export default awsConfig;
