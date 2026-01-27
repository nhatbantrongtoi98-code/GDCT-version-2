import { GoogleGenerativeAI, SchemaType } from "@google/genai";

// Khởi tạo SDK chuẩn
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function askWiseSoldier(question: string) {
  try {
    // Phải lấy model qua hàm getGenerativeModel
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(
      `Bạn là một trợ lý ảo thông thái dành cho chiến sĩ quân đội Việt Nam. Hãy trả lời câu hỏi sau một cách trang trọng, chính xác và dễ hiểu: ${question}`
    );
    
    const response = await result.response;
    return response.text() || "Xin lỗi, tôi chưa tìm được câu trả lời phù hợp.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Có lỗi xảy ra khi kết nối với trí tuệ nhân tạo.";
  }
}

export async function generateQuiz(topic: string = "lịch sử quân đội và giáo dục chính trị") {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
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

    const prompt = `Tạo 5 câu hỏi trắc nghiệm ôn tập về chủ đề: ${topic}. 
      Yêu cầu nội dung sát với chương trình giáo dục chính trị cho chiến sĩ quân đội Việt Nam. 
      Cung cấp thêm giải thích ngắn gọn cho đáp án đúng.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    return [];
  }
}
