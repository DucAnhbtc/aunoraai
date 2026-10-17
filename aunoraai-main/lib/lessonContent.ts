import type { Lesson } from "@/data/lessons";
import type { Course } from "@/data/courses";

export type LessonContent = {
  goal: string;
  knowledge: string[];
  vocabulary: { word: string; ipa: string; meaning: string; example: string }[];
  samples: { en: string; vi: string }[];
  practice: string[];
  quiz: { question: string; options: string[]; answer: number; explain: string }[];
  speakingPrompt: string;
};

export function getLessonContent(
  lesson: Lesson,
  course: Course
): LessonContent {
  const topic = lesson.title;

  if (lesson.isQuiz) {
    return {
      goal: `Kiểm tra kiến thức liên quan: ${topic}`,
      knowledge: [
        "Bài này là bài kiểm tra, không có lý thuyết mới.",
        "Hãy trả lời các câu hỏi dựa trên những bài bạn đã học.",
        "Xem đáp án và giải thích sau khi chọn.",
      ],
      vocabulary: [],
      samples: [],
      practice: ["Làm hết câu hỏi trắc nghiệm bên dưới.", "Xem lại câu sai."],
      quiz: [
        {
          question: `Chủ đề chính của phần ôn tập này là gì?`,
          options: [topic, "Toán học", "Lịch sử", "Âm nhạc"],
          answer: 0,
          explain: `Đây là bài kiểm tra cho nội dung: ${topic}.`,
        },
        {
          question: "When do we say \"Nice to meet you\"?",
          options: [
            "When meeting someone for the first time",
            "When leaving a party",
            "When ordering food",
            "When asking for the time",
          ],
          answer: 0,
          explain: "\"Nice to meet you\" dùng khi gặp ai đó lần đầu.",
        },
        {
          question: "Choose the correct sentence:",
          options: [
            "She go to school every day.",
            "She goes to school every day.",
            "She going to school every day.",
            "She gone to school every day.",
          ],
          answer: 1,
          explain: "Ngôi thứ 3 số ít (she/he/it) thêm s/es trong hiện tại đơn.",
        },
      ],
      speakingPrompt: `Tóm tắt bằng tiếng Anh những gì bạn còn nhớ về: ${topic}`,
    };
  }

  return {
    goal: `Sau bài này bạn có thể sử dụng tiếng Anh liên quan đến “${topic}” trong tình huống cơ bản.`,
    knowledge: [
      `Bài “${topic}” thuộc khóa ${course.title} (${course.level}).`,
      "Bạn sẽ học từ vựng cốt lõi, câu mẫu và cách dùng trong giao tiếp.",
      "Hãy đọc kỹ ví dụ, làm bài tập rồi luyện nói theo gợi ý.",
      "Thời lượng gợi ý: 15–30 phút tùy tốc độ của bạn.",
    ],
    vocabulary: [
      {
        word: "hello",
        ipa: "/həˈləʊ/",
        meaning: "xin chào",
        example: "Hello! How are you?",
      },
      {
        word: "practice",
        ipa: "/ˈpræktɪs/",
        meaning: "luyện tập",
        example: "I practice English every day.",
      },
      {
        word: "improve",
        ipa: "/ɪmˈpruːv/",
        meaning: "cải thiện",
        example: "This lesson helps you improve speaking.",
      },
      {
        word: "conversation",
        ipa: "/ˌkɒnvəˈseɪʃn/",
        meaning: "cuộc hội thoại",
        example: "Let's start a short conversation.",
      },
    ],
    samples: [
      {
        en: `Today we learn about: ${topic}.`,
        vi: `Hôm nay chúng ta học về: ${topic}.`,
      },
      {
        en: "Could you repeat that, please?",
        vi: "Bạn có thể nói lại được không?",
      },
      {
        en: "I see. That makes sense.",
        vi: "Tôi hiểu rồi. Điều đó hợp lý.",
      },
    ],
    practice: [
      `Viết 5 câu tiếng Anh liên quan đến “${topic}”.`,
      "Đọc to các câu mẫu ít nhất 3 lần.",
      "Ghi âm phần luyện nói và nghe lại.",
      "Làm hết câu trắc nghiệm bên dưới.",
    ],
    quiz: [
      {
        question: `Bài học này tập trung vào chủ đề nào?`,
        options: [topic, "Nấu ăn", "Thể thao Olympic", "Lập trình"],
        answer: 0,
        explain: `Chủ đề bài học là “${topic}”.`,
      },
      {
        question: "What does \"improve\" mean?",
        options: ["cải thiện", "bỏ cuộc", "quên", "ngủ"],
        answer: 0,
        explain: "improve = cải thiện.",
      },
      {
        question: "Choose the polite phrase:",
        options: [
          "Could you help me, please?",
          "Give me that now!",
          "You wrong.",
          "Don't talk.",
        ],
        answer: 0,
        explain: "Câu có could + please lịch sự hơn.",
      },
    ],
    speakingPrompt: `Nói 4–6 câu tiếng Anh về chủ đề “${topic}”. Có thể mở đầu bằng: "Today I want to talk about..."`,
  };
}
