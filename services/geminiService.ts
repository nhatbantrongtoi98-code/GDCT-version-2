import { GoogleGenerativeAI, SchemaType } from "@google/genai";

const getApiKey = () => import.meta.env.VITE_GEMINI_API_KEY || "";

// Hàm khởi tạo Model dùng chung để tránh lặp code và lỗi Reference
const getGeminiModel = (config?: any) => {
  const apiKey = getApiKey();
  if (!apiKey) return null;
  
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash", ...config });
};

export async function askWiseSoldier(question: string) {
  try {
    const model = getGeminiModel();
    if (!model) return "Chưa cấu hình API Key.";

    const result = await model.generateContent(
      `Bạn là một trợ lý ảo thông thái dành cho chiến sĩ quân đội Việt Nam. Hãy trả lời câu hỏi sau một cách trang trọng, chính xác và dễ hiểu: ${question}`
    );
    const response = await result.response;
    return response.text() || "Không có phản hồi.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Lỗi kết nối AI.";
  }
}

export async function generateQuiz(topic: string = "lịch sử quân đội") {
  try {
    const model = getGeminiModel({
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              question: { type: SchemaType.STRING },
              options: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
              correctIndex: { type: SchemaType.NUMBER },
              explanation: { type: SchemaType.STRING }
            },
            required: ["question", "options", "correctIndex"]
          }
        }
      }
    });

    if (!model) return [];

    const prompt = `Tạo 5 câu hỏi trắc nghiệm tiếng Việt về: ${topic}. Nội dung chuẩn xác quân đội.`;
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Quiz Error:", error);
    return [];
  }
}
