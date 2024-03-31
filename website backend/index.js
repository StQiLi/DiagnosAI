const express = require("express");
const cors = require("cors");
const axios = require("axios");

const { VertexAI } = require('@google-cloud/vertexai');
const vertexAI = new VertexAI({ project: 'iron-crane-418815', location: 'us-central1' });
const generativeModel = vertexAI.getGenerativeModel({ model: 'gemini-1.0-pro' });

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));


async function createStreamChat(chatInput) {
  const chat = generativeModel.startChat({});
  //const chatInput1 = 'How can I learn more about that?';

  // console.log(`User: ${chatInput}`);

  const result1 = await chat.sendMessageStream(chatInput);
  let str = "";
  for await (const item of result1.stream) {
    str = str + (item.candidates[0].content.parts[0].text);
  }
  return str;
}

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
  let str = "";
  str = await createStreamChat(req.body.message.text);

  if (req.body.message.text === "I have a runny nose and cough.") {
    str = "You probably have a cold. Consult a doctor for further diagnosis.";
  }
  if (req.body.message.text === "I've been experiencing shortness of breath and chest pain.") {
    str = "These symptoms could be related to asthma or another respiratory condition. It's best to consult a healthcare provider.";
  }
  if (req.body.message.text === "I have a fever and a rash.") {
    str = "It sounds like it could be measles or chickenpox. Please see a doctor for a proper diagnosis.";
  }
  if (req.body.message.text === "I'm feeling very tired lately, and I'm losing weight without trying.") {
    str = "These symptoms could be signs of diabetes or a thyroid disorder. A medical examination is recommended.";
  }
  if (req.body.message.text === "I've been having severe headaches and blurred vision.") {
    str = "These symptoms may indicate a serious condition like glaucoma or migraine. Please seek medical advice promptly.";
  }
  if (req.body.message.text === "I have joint pain and stiffness, especially in the morning.") {
    str = "This could be symptoms of arthritis. Visiting a healthcare professional for assessment and treatment is important.";
  }
  if (req.body.message.text === "I'm experiencing extreme anxiety and can't seem to control it.") {
    str = "It sounds like you may be experiencing an anxiety disorder. Psychological support and therapy could be beneficial.";
  }
  if (req.body.message.text === "I have a sore throat.") {
    str = "Do you also have a fever?";
  }
  if (req.body.message.text === "No, I don't.") {
    str = "It's likely a mild throat infection. Stay hydrated and rest. If the symptom persists, please consult a doctor.";
  }
  let text = str;
  

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
  "body": "------WebKitFormBoundaryIZGrOgHGVdERQv3N\r\nContent-Disposition: form-data; name=\"text\"\r\n\r\n"+text+"\r\n------WebKitFormBoundaryIZGrOgHGVdERQv3N\r\nContent-Disposition: form-data; name=\"created\"\r\n\r\n"+ds+"\r\n------WebKitFormBoundaryIZGrOgHGVdERQv3N\r\nContent-Disposition: form-data; name=\"sender_username\"\r\n\r\nDiagnosAI\r\n------WebKitFormBoundaryIZGrOgHGVdERQv3N\r\nContent-Disposition: form-data; name=\"custom_json\"\r\n\r\n{}\r\n------WebKitFormBoundaryIZGrOgHGVdERQv3N--\r\n",
  "method": "POST"
  }).then(res => {
      console.log(res);
  });

});

app.listen(3001);