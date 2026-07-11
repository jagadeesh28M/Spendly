import { GoogleGenerativeAI } from "@google/generative-ai";

function getApiKey() {
  const raw =
    process.env.GEMINI_API_KEY ?? process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";
  return raw.trim().replace(/^["']|["']$/g, "");
}

const getFinancialAdvice = async (
  totalBudget: string | number,
  totalIncome: string | number,
  totalSpent: string | number
) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Gemini API key is not configured");
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const prompt = `
      I need personalized financial advice based on the following details:
      - Total Income: ${totalIncome}
      - Total Budget: ${totalBudget}
      - Total Spent: ${totalSpent}

    provide me financial advice in 4 sentences to help me manage my finances more effectively in India.

    `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.log(error);
    return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
  }
};

export default getFinancialAdvice;
