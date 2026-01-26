
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askWiseSoldier(question: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Bạn là một trợ lý ảo thông thái dành cho chiến sĩ quân đội Việt Nam. Hãy trả lời câu hỏi sau một cách trang trọng, chính xác và dễ hiểu: ${question}`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text || "Xin lỗi, tôi chưa tìm được câu trả lời phù hợp.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Có lỗi xảy ra khi kết nối với trí tuệ nhân tạo.";
  }
}

export async function generateQuiz(topic: string = "lịch sử quân đội và giáo dục chính trị") {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Tạo 5 câu hỏi trắc nghiệm ôn tập về chủ đề: ${topic}. 
      Yêu cầu nội dung sát với chương trình giáo dục chính trị cho chiến sĩ quân đội Việt Nam. 
      Cung cấp thêm giải thích ngắn gọn cho đáp án đúng.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctIndex: { type: Type.NUMBER },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "correctIndex"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    return [];
  }
}
