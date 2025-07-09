const { GoogleGenerativeAI } = require("@google/generative-ai");

const gemini_api_key = process.env.GEMINI_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.8,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};

const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  geminiConfig,
});

const getCompanySummary = async (companyDetails) => {
  try {
    const prompt = `You are a helpful assistant. A user will give you raw details about a company.

        Your task is to:
        - Explain what the company does in **very simple language**
        - Keep the output **under 40 words**
        - Avoid jargon and make it beginner-friendly no bs only wisdome

        Here is the input:

        "${companyDetails}"
        `;

    const result = await geminiModel.generateContent(prompt);

    return result.response.text();
  } catch (err) {
    console.error("AI generation failed:", err.message);
    return null;
  }
};

module.exports = { getCompanySummary };
