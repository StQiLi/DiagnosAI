const { VertexAI } = require('@google-cloud/vertexai');

// Initialize Vertex with your Cloud project and location
const vertexAI = new VertexAI({ project: 'iron-crane-418815', location: 'us-central1' });

// Instantiate the model
const generativeModel = vertexAI.getGenerativeModel({ model: 'gemini-1.0-pro' });

async function createStreamChat() {
  const chat = generativeModel.startChat({});
  const chatInput1 = 'How can I learn more about that?';

  console.log(`User: ${chatInput1}`);

  const result1 = await chat.sendMessageStream(chatInput1);
  for await (const item of result1.stream) {
    console.log(item.candidates[0].content.parts[0].text);
  }
}

// Call the function when needed
createStreamChat();
