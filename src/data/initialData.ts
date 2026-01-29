import { AppData } from '../types';

export const INITIAL_DATA: AppData = {
  appName: "Sổ tay GDCT điện tử",
  appLogo: "🎖️", // Để mặc định là emoji cho nhẹ
  globalBackground: "", // Để trống để Admin tự tải lên sau
  backgroundPlaylist: [],
  intro: {
    title: "Chào mừng các chiến sĩ",
    body: "Hệ thống đang sẵn sàng. Mời Admin tải nội dung từ máy tính.",
    imageUrl: "" 
  },
  historyVN: { title: "", body: "", imageUrl: "" },
  tradition: {},
  lectures: { newRecruits: [], hsqcsYear1: [], hsqcsYear2: [] },
  entertainment: { songs: [], dances: [] }
};
