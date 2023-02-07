import axios from "axios"
export default{
async getProfileData()
  {
    let res = await axios.get(`http://localhost:8081/auth/login/google`);
    console.log("Result from axios is")
    return res.data
  },
async verifyUsernamePassword(loginInfo)
{
  let res = await axios.post("http://localhost:8081/login",loginInfo)
  return res.data;
}
}