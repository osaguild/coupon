import axios from "axios";

async function get(name) {
  const uri = `https://api.dev.osaguild.com/v1/taberogu/?name=${name}`;
  const encodedURI = encodeURI(uri);
  const res = await axios.get(encodedURI);
  return res.data.url;
}

export default {
  get,
};