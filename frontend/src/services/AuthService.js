const query_string = require ('querystring');
const axios = require("axios")

const google_auth_token_endpoint ='https://accounts.google.com/o/oauth2/v2/auth'; //server we are going to have authenticate us
const query_params = {
    client_id: process.env.CLIENT_ID,
    redirect_uri: `http://localhost:8081${process.env.REDIRECT_URI}`,
  };
// this objects contains information that will be passed as query params to the auth // token endpoint
const auth_token_params = {
    ...query_params,
    response_type: 'code', //means server issues auth token
  };
const scopes = ['profile', 'email', 'openid'];
const request_get_auth_code_url = `${google_auth_token_endpoint}?${query_string.stringify(auth_token_params)}&scope=${scopes.join (' ')}`;

const getProfileData = async()=>
  {
    console.log(request_get_auth_code_url)
    var response = 'e';
    try
    {
        response = await axios.get("http://localhost:8081/auth",{
            headers:
            {
                "Access-Control-Allow-Origin": "*"
            }
        })
    }
    catch(error)
    {
        console.log(error.message)
    }
    return response
  }
module.exports = {getProfileData}