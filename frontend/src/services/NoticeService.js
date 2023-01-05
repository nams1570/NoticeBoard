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
  },
  async delNotice(nname){
    let res = await axios.delete("http://localhost:8081/del/"+nname);
    return res
  },
  async updateDueClass(notice)
  {
    let res = await axios.put("http://localhost:8081/updateTime",notice)
    return res
  }
}