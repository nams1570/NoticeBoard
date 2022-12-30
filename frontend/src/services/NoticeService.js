import axios from "axios"

export default {
  async getAllNotices() {
    let res = await axios.get("http://localhost:8081/");
    console.log(res.data);
    return res.data;
  },
  async getNotice(nname) {
    let res = await axios.get("http://localhost:8081/get/" + nname);
    return res.data;
  },
  async postNotice(notice){
    let res = await axios.post("http://localhost:8081/new_notice",notice);
    return res
  }
}