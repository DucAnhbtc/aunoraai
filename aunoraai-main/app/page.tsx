import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span>✨</span> AI đồng hành cùng bạn
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Học tiếng Anh <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              giao tiếp thật dễ dàng
            </span>{" "}
            <br />
            cùng AunoraAI
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Luyện nói thực tế, được AI góp ý ngay lập tức.
            Bắt đầu miễn phí – nâng cấp khi cần.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/khoahoc"
              className="bg-blue-600 text-white px-7 py-3.5 rounded-full font-medium hover:bg-blue-700 transition"
            >
              🚀 Bắt Đầu Học Ngay
            </Link>
            <Link
              href="/khoahoc"
              className="border border-gray-300 bg-white px-7 py-3.5 rounded-full font-medium hover:bg-gray-50 transition"
            >
              ▶ Xem khóa học
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 mt-10 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-blue-500">⚡</span> Luyện nói AI
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">📚</span> Lộ trình cá nhân hóa
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">🛡️</span> Học mọi lúc, mọi nơi
            </div>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="w-80 h-80 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center relative">
            <div className="text-8xl">🤖</div>
            <div className="absolute -top-4 -left-6 bg-white shadow-lg rounded-2xl px-4 py-2 text-sm font-medium">
              Hello!
            </div>
            <div className="absolute top-10 -right-8 bg-white shadow-lg rounded-2xl px-4 py-2 text-sm font-medium">
              How are you?
            </div>
            <div className="absolute bottom-16 -left-10 bg-blue-600 text-white shadow-lg rounded-2xl px-4 py-2 text-sm font-medium">
              Listening
            </div>
          </div>
        </div>
      </section>

      {/* Tính năng */}
      <section id="tinhnang" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-8">
          <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4">💬</div>
            <h3 className="font-semibold text-lg mb-2">Nói tiếng Anh tự tin</h3>
            <p className="text-gray-600 text-sm">Luyện phát âm, giao tiếp trong các tình huống thực tế.</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl mb-4">🧠</div>
            <h3 className="font-semibold text-lg mb-2">AI thông minh, cá nhân hóa</h3>
            <p className="text-gray-600 text-sm">Hiểu trình độ và nhu cầu học của bạn.</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl mb-4">📊</div>
            <h3 className="font-semibold text-lg mb-2">Tiến bộ rõ rệt</h3>
            <p className="text-gray-600 text-sm">Theo dõi kết quả học tập mỗi ngày.</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-2xl mb-4">❤️</div>
            <h3 className="font-semibold text-lg mb-2">Học thật vui</h3>
            <p className="text-gray-600 text-sm">Giao diện hiện đại, thân thiện, truyền cảm hứng.</p>
          </div>
        </div>
      </section>

      {/* Về chúng tôi */}
      <section id="vechungtoi" className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Về AunoraAI</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            AunoraAI là nền tảng học tiếng Anh giao tiếp với AI, giúp bạn luyện nói thực tế,
            nhận góp ý ngay lập tức và theo dõi tiến bộ mỗi ngày. Chúng tôi thiết kế lộ trình
            12 tháng từ mất gốc đến giao tiếp thành thạo, phù hợp mọi trình độ.
          </p>
          <p className="text-slate-500 text-sm">
            Mục tiêu của chúng tôi: giúp bạn tự tin nói tiếng Anh trong công việc và đời sống.
          </p>
        </div>
      </section>

      <footer className="text-center py-8 text-gray-500 text-sm border-t">
        © 2026 AunoraAI. Học tiếng Anh thông minh hơn với AI.
      </footer>
    </main>
  );
}
