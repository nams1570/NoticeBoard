const query_string = require ('querystring');
require('dotenv').config()

const google_auth_token_endpoint ='https://accounts.google.com/o/oauth2/v2/auth'; //server we are going to have authenticate us
const query_params = {
  client_id: process.env.CLIENT_ID,
  redirect_uri: process.env.REDIRECT_URI,
};
// this objects contains information that will be passed as query params to the auth // token endpoint
  const auth_token_params = {
    ...query_params,
    response_type: 'code', //means server issues auth token
  };
// the scopes (portion of user's data) we want to access
const scopes = ['profile', 'email', 'openid'];
  const request_get_auth_code_url = `${google_auth_token_endpoint}?${query_string.stringify(auth_token_params)}&scope=${scopes.join (' ')}`;
  console.log(request_get_auth_code_url)
module.exports ={request_get_auth_code_url}