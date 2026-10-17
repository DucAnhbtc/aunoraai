export type Course = {
  id: number;
  title: string;
  level: string;
  price: number;
  is_free: boolean;
  color: "green" | "blue" | "purple" | "orange" | "red";
  duration: string;
  forWho: string;
  lessonCount: number;
  content: string[];
  features: string[];
};

export const courses: Course[] = [
  {
    id: 1,
    title: "English Starter",
    level: "A1 – Mới bắt đầu",
    price: 0,
    is_free: true,
    color: "green",
    duration: "2 tháng",
    lessonCount: 35,
    forWho: "Người mới bắt đầu học tiếng Anh",
    content: [
      "Bảng chữ cái và phát âm cơ bản",
      "Từ vựng thông dụng",
      "Chào hỏi và giới thiệu bản thân",
      "Số đếm, ngày tháng và thời gian",
      "Gia đình, bạn bè và trường học",
      "Màu sắc, đồ vật và quần áo",
      "Đồ ăn, thức uống và mua sắm",
      "Sở thích và hoạt động hằng ngày",
      "Địa điểm, phương tiện và hỏi đường",
      "Ngữ pháp cơ bản, nghe – nói thực tế",
    ],
    features: [
      "35 bài hoàn toàn miễn phí",
      "Quiz + luyện nghe – nói",
      "Theo dõi tiến độ",
      "AI Tutor hỗ trợ",
      "Không cần thanh toán",
    ],
  },
  {
    id: 2,
    title: "Everyday English",
    level: "A1 – A2",
    price: 99000,
    is_free: false,
    color: "blue",
    duration: "2 tháng",
    lessonCount: 50,
    forWho: "Người muốn giao tiếp trong cuộc sống",
    content: [
      "Giao tiếp ở trường và nơi làm việc",
      "Gọi món, mua sắm, hỏi giá",
      "Hỏi đường, du lịch, khách sạn",
      "Thời tiết, sức khỏe, cảm xúc",
      "Gọi điện, nhắn tin, kết bạn",
      "Hội thoại tình huống thực tế",
    ],
    features: [
      "50 bài giao tiếp đời sống",
      "Tình huống thực tế",
      "Quiz + Speaking",
      "Bài kiểm tra mỗi 5 bài",
      "Theo dõi tiến độ",
    ],
  },
  {
    id: 3,
    title: "Grammar Master",
    level: "A2 – B1",
    price: 149000,
    is_free: false,
    color: "purple",
    duration: "2 tháng",
    lessonCount: 50,
    forWho: "Người muốn cải thiện ngữ pháp",
    content: [
      "12 thì tiếng Anh",
      "Danh từ, động từ, tính từ, trạng từ",
      "Đại từ, giới từ, liên từ, mạo từ",
      "Câu hỏi và câu phủ định",
      "Câu bị động, câu điều kiện",
      "Câu trực tiếp – gián tiếp, mệnh đề quan hệ",
      "Câu so sánh, câu đơn – ghép – phức",
    ],
    features: [
      "50 bài ngữ pháp có hệ thống",
      "Bài tập vận dụng",
      "Giải thích rõ ràng",
      "Quiz + kiểm tra định kỳ",
      "Theo dõi tiến độ",
    ],
  },
  {
    id: 4,
    title: "English Communication",
    level: "B1 – B2",
    price: 199000,
    is_free: false,
    color: "orange",
    duration: "2 tháng",
    lessonCount: 50,
    forWho: "Người muốn nâng cao giao tiếp",
    content: [
      "Luyện nghe và luyện nói",
      "Phát âm và ngữ điệu",
      "Hội thoại với AI",
      "Giao tiếp theo tình huống",
      "Phỏng vấn và thuyết trình",
      "Trình bày ý kiến và tranh luận",
      "Sửa lỗi phát âm",
    ],
    features: [
      "50 bài giao tiếp nâng cao",
      "Speaking với AI",
      "Phỏng vấn & thuyết trình",
      "Quiz + kiểm tra",
      "Theo dõi tiến độ",
    ],
  },
  {
    id: 5,
    title: "Fluent English Pro",
    level: "B2 – C1",
    price: 299000,
    is_free: false,
    color: "red",
    duration: "2 tháng",
    lessonCount: 50,
    forWho: "Người muốn tiếng Anh thành thạo hơn",
    content: [
      "Từ vựng nâng cao và học thuật",
      "Đọc hiểu văn bản dài",
      "Viết đoạn văn và bài luận",
      "Nghe tốc độ tự nhiên",
      "Tranh luận và quan điểm",
      "Giao tiếp chuyên nghiệp",
      "Luyện IELTS theo kỹ năng",
    ],
    features: [
      "50 bài trình độ cao",
      "IELTS cơ bản → nâng cao",
      "Đọc – viết – nghe – nói",
      "Quiz + kiểm tra cuối khóa",
      "Theo dõi tiến độ",
    ],
  },
];

export const colorMap: Record<
  string,
  { badge: string; button: string; border: string }
> = {
  green: {
    badge: "bg-green-100 text-green-700",
    button: "bg-green-500 hover:bg-green-600 text-white",
    border: "border-green-200",
  },
  blue: {
    badge: "bg-blue-100 text-blue-700",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
    border: "border-blue-200",
  },
  purple: {
    badge: "bg-purple-100 text-purple-700",
    button: "bg-purple-600 hover:bg-purple-700 text-white",
    border: "border-purple-200",
  },
  orange: {
    badge: "bg-orange-100 text-orange-700",
    button: "bg-orange-500 hover:bg-orange-600 text-white",
    border: "border-orange-200",
  },
  red: {
    badge: "bg-red-100 text-red-700",
    button: "bg-red-600 hover:bg-red-700 text-white",
    border: "border-red-200",
  },
};
