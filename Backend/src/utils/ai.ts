import "dotenv/config";

const getAIResponse = async (message: string, model: string) => {
  // Use OpenRouter for all models
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": process.env.YOUR_SITE_URL || "http://localhost:5173",
      "X-Title": process.env.YOUR_SITE_NAME || "Riffinity",
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
      "https://openrouter.ai/api/v1/chat/completions",
      options
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API Error:", errorData);
      throw new Error(
        `OpenRouter API Error: ${errorData.error?.message || response.statusText}`
      );
    }

    const data = await response.json();
    console.log("OpenRouter Response:", data);

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Invalid response from OpenRouter API");
    }

    return data.choices[0].message.content;
  } catch (err) {
    console.error("Error in getAIResponse for OpenRouter:", err);
    throw err;
  }
};

export default getAIResponse;
