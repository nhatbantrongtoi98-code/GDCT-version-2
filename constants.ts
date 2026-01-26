
import { AppData } from './types';

export const INITIAL_DATA: AppData = {
  appName: 'Sổ tay Giáo dục Chính trị Điện tử',
  appLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Coat_of_arms_of_the_People%27s_Army_of_Vietnam.svg',
  loginLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Coat_of_arms_of_the_People%27s_Army_of_Vietnam.svg',
  globalBackground: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80',
  loginImageUrl: 'https://image.vietnam.vn/wp-content/uploads/2024/01/Xay-dung-Dang-Cong-san-Viet-Nam-trong-sach-vung-manh.jpg',
  loginMessage: 'Khu vực dành cho cán bộ, chiến sĩ LLVT Thủ đô',
  intro: {
    id: 'intro',
    title: 'Mục đích Ứng dụng',
    body: 'Ứng dụng được xây dựng nhằm cung cấp công cụ hiện đại giúp cán bộ, chiến sĩ ôn tập các nội dung giáo dục chính trị, tìm hiểu lịch sử truyền thống và nâng cao đời sống văn hóa tinh thần tại đơn vị.',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Coat_of_arms_of_the_People%27s_Army_of_Vietnam.svg'
  },
  historyVN: {
    id: 'history-vn',
    title: 'Tóm tắt Lịch sử Việt Nam',
    body: 'Lịch sử Việt Nam là lịch sử dựng nước và giữ nước oai hùng qua hàng ngàn năm...',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg'
  },
  tradition: {
    capitalForces: { 
      id: 'capital', 
      name: 'LLVT Thủ đô Hà Nội', 
      history: 'Lực lượng vũ trang Thủ đô có bề dày truyền thống "Quyết tử để Tổ quốc quyết sinh"...',
      avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Coat_of_arms_of_the_People%27s_Army_of_Vietnam.svg'
    },
    div301: { 
      id: 'div301', 
      name: 'Sư đoàn Bộ binh 301', 
      history: 'Sư đoàn 301 là đơn vị chủ lực của LLVT Thủ đô...',
      avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Coat_of_arms_of_the_People%27s_Army_of_Vietnam.svg'
    },
    reg59: { 
      id: 'reg59', 
      name: 'Trung đoàn Bộ binh 59', 
      history: 'Trung đoàn 59 có truyền thống anh hùng trong chiến đấu...',
      avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Coat_of_arms_of_the_People%27s_Army_of_Vietnam.svg'
    },
    reg692: { 
      id: 'reg692', 
      name: 'Trung đoàn Bộ binh 692', 
      history: 'Trung đoàn 692 (Trung đoàn Thủ đô)...',
      avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Coat_of_arms_of_the_People%27s_Army_of_Vietnam.svg'
    },
    reg757: { 
      id: 'reg757', 
      name: 'Trung đoàn Bộ binh 757', 
      history: 'Đơn vị dự bị động viên...',
      avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Coat_of_arms_of_the_People%27s_Army_of_Vietnam.svg'
    }
  },
  lectures: {
    newRecruits: [
      { id: 'csm-1', category: 'CSM', title: 'Bài 1: Truyền thống Quân đội Nhân dân Việt Nam', content: '' },
      { id: 'csm-2', category: 'CSM', title: 'Bài 2: Nghĩa vụ, trách nhiệm của người chiến sĩ', content: '' },
      { id: 'csm-3', category: 'CSM', title: 'Bài 3: Những nội dung cơ bản về điều lệnh quân đội', content: '' },
      { id: 'csm-4', category: 'CSM', title: 'Bài 4: Chế độ sinh hoạt, học tập, công tác trong ngày', content: '' },
      { id: 'csm-5', category: 'CSM', title: 'Bài 5: Phòng chống diễn biến hòa bình, bạo loạn lật đổ', content: '' },
      { id: 'csm-6', category: 'CSM', title: 'Bài 6: Xây dựng chính quy, rèn luyện kỷ luật', content: '' },
    ],
    hsqcsYear1: [
      { id: 'y1-1', category: 'HSQ-CS-1', title: 'Bài 1: Bản chất Cách mạng của QĐND Việt Nam', content: '' },
      { id: 'y1-2', category: 'HSQ-CS-1', title: 'Bài 2: Tình hình nhiệm vụ của đơn vị', content: '' },
      { id: 'y1-3', category: 'HSQ-CS-1', title: 'Bài 3: Luật Nghĩa vụ quân sự và trách nhiệm thanh niên', content: '' },
      { id: 'y1-4', category: 'HSQ-CS-1', title: 'Bài 4: Đạo đức, lối sống của người quân nhân', content: '' },
      { id: 'y1-5', category: 'HSQ-CS-1', title: 'Bài 5: Công tác dân vận của đơn vị cơ sở', content: '' },
      { id: 'y1-6', category: 'HSQ-CS-1', title: 'Bài 6: Huấn luyện sẵn sàng chiến đấu', content: '' },
    ],
    hsqcsYear2: [
      { id: 'y2-1', category: 'HSQ-CS-2', title: 'Bài 1: Xây dựng quân đội về chính trị trong tình hình mới', content: '' },
      { id: 'y2-2', category: 'HSQ-CS-2', title: 'Bài 2: Nâng cao bản lĩnh chính trị, ý chí quyết thắng', content: '' },
      { id: 'y2-3', category: 'HSQ-CS-2', title: 'Bài 3: Quản lý bộ đội và giải quyết các mối quan hệ', content: '' },
      { id: 'y2-4', category: 'HSQ-CS-2', title: 'Bài 4: Kỹ năng công tác Đảng, công tác chính trị', content: '' },
      { id: 'y2-5', category: 'HSQ-CS-2', title: 'Bài 5: Nhận diện và đấu tranh các quan điểm sai trái', content: '' },
      { id: 'y2-6', category: 'HSQ-CS-2', title: 'Bài 6: Tổng kết và đánh giá kết quả huấn luyện', content: '' },
    ]
  },
  entertainment: {
    songs: [
      { title: '1. Tiến quân ca' },
      { title: '2. Quân đội ta quân đội anh hùng' },
      { title: '3. Vì Nhân dân quên mình' },
      { title: '4. Giải phóng Điện Biên' },
      { title: '5. Tiến bước dưới quân kỳ' },
      { title: '6. Bác đang cùng chúng cháu hành quân' },
      { title: '7. Thanh niên làm theo lời Bác' },
      { title: '8. Hát mãi khúc quân hành' },
      { title: '9. Như có Bác Hồ trong ngày vui đại thắng' },
      { title: '10. Người chiến sĩ ấy' },
      { title: '11. Trái tim chiến sĩ' },
      { title: '12. Cuộc đời vẫn đẹp sao' },
      { title: '13. Ước mơ chiến sĩ' },
      { title: '14. Chào em cô gái Lam Hồng' },
      { title: '15. Hành quân xa' }
    ],
    dances: [
      { title: 'Vũ điệu Hành quân' },
      { title: 'Vũ điệu Quân dân' },
      { title: 'Vũ điệu Lính trẻ' },
      { title: 'Vũ điệu Hòa bình' },
      { title: 'Vũ điệu Niềm tin' }
    ]
  },
  gameSection: {
    title: 'Chiến sĩ Thông thái',
    content: 'Chào mừng đồng chí đến với khu vực trò chơi. Hãy lựa chọn nội dung ôn tập bên dưới.'
  },
  backgroundPlaylist: [
    { title: "Bác đang cùng chúng cháu hành quân", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" }
  ]
};
