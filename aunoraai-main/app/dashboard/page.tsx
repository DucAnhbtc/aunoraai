import Link from "next/link";

export default function Dashboard() {
  const user = {
    name: "Học viên",
    xp: 0,
    streak: 0,
    level: "Chưa xác định",
  };

  const hasStarted = false;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition"
          >
            ← Quay về trang chủ
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Xin chào, {user.name} 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Chào mừng bạn đến với AunoraAI. Hãy bắt đầu khóa học đầu tiên!
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-sm text-gray-500">Điểm XP</p>
            <p className="text-3xl font-bold text-blue-600 mt-1">{user.xp}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-sm text-gray-500">Chuỗi ngày học</p>
            <p className="text-3xl font-bold text-orange-500 mt-1">
              🔥 {user.streak}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <p className="text-sm text-gray-500">Trình độ hiện tại</p>
            <p className="text-xl font-bold text-gray-500 mt-2">{user.level}</p>
          </div>
        </div>

        {!hasStarted && (
          <div className="bg-white rounded-2xl border border-dashed border-blue-200 p-8 text-center mb-8">
            <div className="text-5xl mb-4">📚</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Bạn chưa bắt đầu khóa học nào
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Chọn một khóa phù hợp với trình độ để bắt đầu luyện tiếng Anh cùng
              AI.
            </p>
            <Link
              href="/khoahoc"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              Xem khóa học →
            </Link>
          </div>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/khoahoc"
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition text-center"
          >
            <div className="text-3xl mb-2">📚</div>
            <h3 className="font-semibold text-gray-900">Khóa học</h3>
            <p className="text-sm text-gray-500 mt-1">Xem tất cả khóa</p>
          </Link>

          <Link
            href="/luyennoi"
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition text-center"
          >
            <div className="text-3xl mb-2">🎤</div>
            <h3 className="font-semibold text-gray-900">Luyện nói</h3>
            <p className="text-sm text-gray-500 mt-1">Nói với AI</p>
          </Link>

          <Link
            href="/aitutor"
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition text-center"
          >
            <div className="text-3xl mb-2">🤖</div>
            <h3 className="font-semibold text-gray-900">AI Tutor</h3>
            <p className="text-sm text-gray-500 mt-1">Hỏi đáp bài học</p>
          </Link>

          <Link
            href="/thanhtich"
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition text-center"
          >
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="font-semibold text-gray-900">Thành tích</h3>
            <p className="text-sm text-gray-500 mt-1">Huy hiệu & XP</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
