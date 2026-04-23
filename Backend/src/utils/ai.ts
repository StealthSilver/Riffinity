import "dotenv/config";

const getFriendlyOpenRouterError = (message: string) => {
  const normalized = message.toLowerCase();

  if (
    normalized.includes("requires more credits") ||
    normalized.includes("can only afford")
  ) {
    return "You are out of free OpenRouter credits. Please get a paid account or choose a free model.";
  }

  return `OpenRouter API Error: ${message}`;
};

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
      const rawMessage = errorData.error?.message || response.statusText;
      throw new Error(getFriendlyOpenRouterError(rawMessage));
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
