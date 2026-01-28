import { AppData } from '../types';

export const INITIAL_DATA: AppData = {
  appName: "Hệ thống Giáo dục Chính trị",
  appLogo: "🎖️",
  globalBackground: "https://images.unsplash.com/photo-1590233735520-74673641047d?q=80&w=2070&auto=format&fit=crop",
  backgroundPlaylist: [
    { title: "Tiến quân ca", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" }
  ],
  intro: {
    title: "Chào mừng các chiến sĩ",
    body: "Hệ thống học tập và giải trí dành riêng cho đơn vị. Chúc các đồng chí hoàn thành tốt nhiệm vụ học tập!",
    imageUrl: "https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?q=80&w=2068&auto=format&fit=crop"
  },
  historyVN: {
    title: "80 năm vẻ vang QĐND Việt Nam",
    body: "Quân đội nhân dân Việt Nam được thành lập ngày 22/12/1944 tại khu rừng Trần Hưng Đạo...",
    imageUrl: "https://images.unsplash.com/photo-1547499681-28dece7dba00?q=80&w=1978&auto=format&fit=crop"
  },
  tradition: {
    "don-vi": {
      name: "Truyền thống Đơn vị",
      history: "Đơn vị chúng ta có bề dày lịch sử anh hùng trong kháng chiến và hòa bình...",
      imageUrl: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?q=80&w=2070&auto=format&fit=crop"
    }
  },
  lectures: {
    newRecruits: [
      { id: "1", title: "Bài 1: 10 lời thề danh dự", posterUrl: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?q=80&w=2070&auto=format&fit=crop" }
    ],
    hsqcsYear1: [],
    hsqcsYear2: []
  },
  entertainment: {
    songs: [
      { title: "Hát mãi khúc quân hành", url: "" }
    ],
    dances: [
      { title: "Vũ điệu hành quân", url: "" }
    ]
  }
};
