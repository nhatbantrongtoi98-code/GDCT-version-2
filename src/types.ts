export interface ContentSection {
  id: string;
  title: string;
  body: string;
  imageUrl?: string;
  avatarUrl?: string;
}

export interface Lecture {
  id: string;
  title: string;
  content: string;
  category: 'CSM' | 'HSQ-CS-1' | 'HSQ-CS-2';
  posterUrl?: string;
}

export interface TraditionUnit {
  id: string;
  name: string;
  history: string;
  imageUrl?: string;
  avatarUrl?: string;
}

export interface BackgroundMusic {
  title: string;
  url: string;
}

// THÊM ĐOẠN NÀY ĐỂ KHẮP PHỤC LỖI BUILD
export interface User {
  username: string;
  role: 'admin' | 'user';
  avatarUrl?: string;
}

export interface UserAccount extends User {
  password?: string;
}

export interface EntertainmentItem {
  title: string;
  url?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export type AppData = {
  appName: string;
  appLogo?: string;
  loginLogoUrl?: string;
  globalBackground?: string;
  loginImageUrl?: string;
  loginMessage?: string;
  intro: ContentSection;
  historyVN: ContentSection;
  tradition: {
    capitalForces: TraditionUnit;
    div301: TraditionUnit;
    reg59: TraditionUnit;
    reg692: TraditionUnit;
    reg757: TraditionUnit;
  };
  lectures: {
    newRecruits: Lecture[];
    hsqcsYear1: Lecture[];
    hsqcsYear2: Lecture[];
  };
  entertainment: {
    songs: EntertainmentItem[];
    dances: EntertainmentItem[];
  };
  gameSection: {
    title: string;
    content: string;
    assetUrl?: string;
  };
  backgroundPlaylist: BackgroundMusic[];
};
