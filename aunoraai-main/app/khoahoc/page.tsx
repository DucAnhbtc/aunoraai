import Link from "next/link";
import { courses, colorMap } from "@/data/courses";

export default function KhoaHoc() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="max-w-6xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-4">
          Khóa học tiếng Anh
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          5 lộ trình từ mất gốc đến thành thạo. Mỗi khóa kéo dài 2 tháng. Xem
          chi tiết để chọn mức phù hợp với trình độ và mục tiêu của bạn.
        </p>

        <div className="overflow-x-auto mb-14">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden bg-white">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-700">STT</th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Tên khóa học
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Trình độ
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Thời lượng
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">Giá</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c, i) => (
                <tr key={c.id} className="border-t border-gray-100">
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3 font-medium">{c.title}</td>
                  <td className="px-4 py-3 text-gray-600">{c.level}</td>
                  <td className="px-4 py-3 text-gray-600">{c.duration}</td>
                  <td className="px-4 py-3">
                    {c.is_free ? (
                      <span className="text-green-600 font-semibold">FREE</span>
                    ) : (
                      <span className="font-semibold">
                        {c.price.toLocaleString("vi-VN")}đ
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-10">
          {courses.map((course) => {
            const colors = colorMap[course.color];
            return (
              <div
                key={course.id}
                className={`bg-white rounded-2xl shadow-md border ${colors.border} overflow-hidden`}
              >
                <div className="p-6 md:p-8 border-b border-gray-100 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`text-sm font-medium px-3 py-1 rounded-full ${colors.badge}`}
                      >
                        {course.is_free ? "FREE" : course.level}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {course.title}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Dành cho: {course.forWho}
                    </p>
                  </div>
                  <div className="text-right">
                    {course.is_free ? (
                      <p className="text-3xl font-bold text-green-600">0đ</p>
                    ) : (
                      <p className="text-3xl font-bold text-gray-900">
                        {course.price.toLocaleString("vi-VN")}đ
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      Thời lượng: {course.duration}
                    </p>
                  </div>
                </div>

                <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Nội dung khóa học
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {course.content.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-500 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Tính năng
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-600 mb-6">
                        {course.features.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={`/khoahoc/${course.id}`}
                      className={`block w-full text-center py-3.5 rounded-xl font-medium transition ${colors.button}`}
                    >
                      {course.is_free ? "Xem bài học" : "Xem chi tiết khóa"}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            Tính năng chung cho mọi khóa học
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: "📚", title: "Lessons", desc: "Bài học chia theo chủ đề" },
              { icon: "🎮", title: "Quiz", desc: "Câu hỏi tương tác như Duolingo" },
              { icon: "🤖", title: "AI Tutor", desc: "Chatbot giải đáp thắc mắc" },
              { icon: "🎧", title: "Listening", desc: "Bài tập luyện nghe" },
              { icon: "🎤", title: "Speaking", desc: "Luyện nói với AI" },
              { icon: "⭐", title: "XP", desc: "Điểm kinh nghiệm mỗi bài" },
              { icon: "🔥", title: "Streak", desc: "Chuỗi ngày học liên tục" },
              { icon: "🏆", title: "Achievement", desc: "Huy hiệu thành tích" },
            ].map((f, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4">
                <div className="text-3xl mb-2">{f.icon}</div>
                <h3 className="font-semibold text-gray-900">{f.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
