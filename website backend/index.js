const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
    console.log("hi");
  const { username } = req.body;

  try {
    const r = await axios.put(
        "https://api.chatengine.io/users/",
        { username: username, secret: username, first_name: username }, 
        { headers: { "private-key": "91f77a6a-8af7-41bf-a67e-a33e758338de" } }
    )
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});
app.post("/process_message", async (req, res) => {
  const d = new Date();
  const ds = `${d.getUTCFullYear()}-${d.getUTCMonth() + 1 >= 10 ? d.getUTCMonth() + 1 : '0' + (d.getUTCMonth() + 1)}-${d.getUTCDate() >= 10 ? d.getUTCDate() : '0' + d.getUTCDate()} ${d.getUTCHours() >= 10 ? d.getUTCHours() : '0' + d.getUTCHours()}:${d.getUTCMinutes() >= 10 ? d.getUTCMinutes() : '0' + d.getUTCMinutes()}:${d.getUTCSeconds() >= 10 ? d.getUTCSeconds() : '0' + d.getUTCSeconds()}.${d.getUTCMilliseconds()}+00:00`;
  console.log(ds);
  let text = "jello";
  // console.log(req.message.text);

  fetch("https://api.chatengine.io/chats/240626/messages/", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryIZGrOgHGVdERQv3N",
    "public-key": "c5d63ebc-b1ce-4c18-aa71-d7eeb1203ffb",
    "sec-ch-ua": "\"Chromium\";v=\"123\", \"Not:A-Brand\";v=\"8\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "user-name": "DiagnosAI",
    "user-secret": "DiagnosAI",
    "Referer": "http://localhost:5173/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "------WebKitFormBoundaryIZGrOgHGVdERQv3N\r\nContent-Disposition: form-data; name=\"text\"\r\n\r\npleasework1000\r\n------WebKitFormBoundaryIZGrOgHGVdERQv3N\r\nContent-Disposition: form-data; name=\"created\"\r\n\r\n"+ds+"\r\n------WebKitFormBoundaryIZGrOgHGVdERQv3N\r\nContent-Disposition: form-data; name=\"sender_username\"\r\n\r\nDiagnosAI\r\n------WebKitFormBoundaryIZGrOgHGVdERQv3N\r\nContent-Disposition: form-data; name=\"custom_json\"\r\n\r\n{}\r\n------WebKitFormBoundaryIZGrOgHGVdERQv3N--\r\n",
  "method": "POST"
  }).then(res => {
      console.log(res);
  });

});

app.listen(3001);
