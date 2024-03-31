const { VertexAI } = require('@google-cloud/vertexai');

const vertexAI = new VertexAI({ project: 'iron-crane-418815', location: 'us-central1' });
const generativeModel = vertexAI.getGenerativeModel({ model: 'gemini-pro' });

let chatHistory = []; // Initialize an empty array to store chat history

async function startChatWithHistory() {
  const chat = generativeModel.startChat({
    history: chatHistory, // Pass the chat history to the model
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  let str = ""

  const msg = "What's your favorite season of the year?";
  const result = await chat.sendMessageStream(msg);
  for await (const item of result.stream) {
    str = str + (item.candidates[0].content.parts[0].text);
  }

  // Update chat history with the latest message
  chatHistory.push({ role: "user", parts: msg });
  chatHistory.push({ role: "model", parts: str });

  // Optionally, you can limit the chat history size to avoid consuming too much memory
  // For example, you can keep only the last 10 messages
  if (chatHistory.length > 10) {
    chatHistory = chatHistory.slice(-10);
  }
}

await startChatWithHistory();

console.log(chatHistory);




