import axios from "axios";

async function getShop(name) {
  const endpoint = process.env.VUE_APP_TABEROGU_URL;
  const uri = `${endpoint}?name=${name}`;
  const encodedURI = encodeURI(uri);
  const res = await axios.get(encodedURI);
  return res.data;
}

export default {
  getShop,
}; 