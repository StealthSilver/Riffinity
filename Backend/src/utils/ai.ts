import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const getAIResponse = async (message: string, model: string) => {
  if (model.startsWith("gpt") || model.startsWith("o")) {
    // OpenAI models
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      }),
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        options
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenAI API Error:", errorData);
        throw new Error(
          `OpenAI API Error: ${errorData.error?.message || response.statusText}`
        );
      }

      const data = await response.json();
      console.log(data);

      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error("Invalid response from OpenAI API");
      }

      return data.choices[0].message.content;
    } catch (err) {
      console.error("Error in getAIResponse for OpenAI:", err);
      throw err;
    }
  } else if (model.startsWith("gemini")) {
    // Gemini models
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const aiModel = genAI.getGenerativeModel({ model: model });

    try {
      const result = await aiModel.generateContent(message);
      const response = await result.response;
      const text = response.text();
      return text;
    } catch (err) {
      console.error("Error in getAIResponse for Gemini:", err);
      throw err;
    }
  } else {
    throw new Error(`Unsupported model: ${model}`);
  }
};

export default getAIResponse;
