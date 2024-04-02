const { VertexAI } = require('@google-cloud/vertexai');

const vertexAI = new VertexAI({ project: 'diagnosai', location: 'us-east1' });
const generativeModel = vertexAI.getGenerativeModel({ model: 'gemini-1.0-pro' });

async function createStreamChat(chatInput1) {
  const chat = generativeModel.startChat({});
  chatInput1 = 'How can I learn more about gemini?';

  console.log(`User: ${chatInput1}`);

  const result1 = await chat.sendMessageStream(chatInput1);
  let str = "";
  for await (const item of result1.stream) {
    console.log(item.candidates[0].content.parts[0].text);
    str = str + (item.candidates[0].content.parts[0].text);
  }
  //return str;
}

createStreamChat();





