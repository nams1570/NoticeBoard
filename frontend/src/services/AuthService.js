import axios from "axios"
export default{
async getProfileData()
  {
    //console.log(process.env.VUE_APP_REDIRECT_URI)
    let res = await axios.get(`http://localhost:8081/cachedProfile`);
    console.log("Result from axios is")
    return res.data
  }
}