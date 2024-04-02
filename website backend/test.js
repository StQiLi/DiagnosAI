const { VertexAI } = require('@google-cloud/vertexai');

const vertexAI = new VertexAI({ project: 'iron-crane-418815', location: 'us-central1' });
const generativeModel = vertexAI.getGenerativeModel({ model: 'gemini-pro' });

let chatHistory = []; // Initialize an empty array to store chat history

async function createStreamChat(chatInput1) {
  const chat = generativeModel.startChat({});
  //const chatInput1 = 'How can I learn more about that?';

  //console.log(`User: ${chatInput1}`);

  const result1 = await chat.sendMessageStream(chatInput1);
  let str = "";
  for await (const item of result1.stream) {
    console.log(item.candidates[0].content.parts[0].text);
    str = str + (item.candidates[0].content.parts[0].text);
  }
  return str;
}

await startChatWithHistory();

console.log(chatHistory);




