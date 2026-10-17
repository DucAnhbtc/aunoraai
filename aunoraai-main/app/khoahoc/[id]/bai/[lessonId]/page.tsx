import Link from "next/link";
import { notFound } from "next/navigation";
import { courses } from "@/data/courses";
import { lessons } from "@/data/lessons";

type Props = {
  params: Promise<{ id: string; lessonId: string }>;
};

export default async function LessonPage({ params }: Props) {
  const { id, lessonId } = await params;
  const courseId = Number(id);
  const lessonIdNum = Number(lessonId);

  const course = courses.find((c) => c.id === courseId);
  const lesson = lessons.find((l) => l.id === lessonIdNum && l.courseId === courseId);

  if (!course || !lesson) notFound();

  const courseLessons = lessons
    .filter((l) => l.courseId === courseId)
    .sort((a, b) => a.order - b.order);

  const currentIndex = courseLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? courseLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < courseLessons.length - 1
      ? courseLessons[currentIndex + 1]
      : null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="max-w-3xl mx-auto px-6 py-10">
        {/* Quay về */}
        <Link
          href={`/khoahoc/${course.id}`}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
        >
          ← Quay về {course.title}
        </Link>

        {/* Tiêu đề bài */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm mb-6">
          <p className="text-sm text-gray-500 mb-1">
            {course.title} · Bài {lesson.order}/{courseLessons.length}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {lesson.title}
          </h1>
          <p className="text-sm text-gray-500">⏱ {lesson.duration}</p>
        </div>

        {/* Nội dung bài học (mẫu) */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Nội dung bài học</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Chào bạn! Đây là bài <strong>{lesson.title}</strong> trong khóa{" "}
              <strong>{course.title}</strong>.
            </p>
            <p>
              Trong bài này bạn sẽ học các kiến thức và mẫu câu liên quan đến chủ đề trên.
              Hãy đọc kỹ, nghe ví dụ và luyện nói theo.
            </p>

            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="font-medium text-blue-800 mb-2">Ví dụ mẫu:</p>
              <p className="text-blue-700">Hello! My name is Lan. Nice to meet you.</p>
              <p className="text-blue-600 text-sm mt-1">
                Xin chào! Tên tôi là Lan. Rất vui được gặp bạn.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="font-medium text-gray-800 mb-2">Luyện tập nhanh:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Đọc to câu ví dụ 3 lần</li>
                <li>Tự giới thiệu bản thân bằng tiếng Anh</li>
                <li>Ghi lại 5 từ mới trong bài</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Nút luyện nói + AI */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Link
            href="/luyennoi"
            className="bg-blue-600 hover:bg-blue-700 text-white text-center py-3.5 rounded-xl font-medium transition"
          >
            🎤 Luyện nói với AI
          </Link>
          <Link
            href="/aitutor"
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 text-center py-3.5 rounded-xl font-medium transition"
          >
            🤖 Hỏi AI Tutor
          </Link>
        </div>

        {/* Điều hướng bài trước / sau */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {prevLesson ? (
            <Link
              href={`/khoahoc/${course.id}/bai/${prevLesson.id}`}
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              ← Bài trước: {prevLesson.title}
            </Link>
          ) : (
            <span />
          )}

          {nextLesson ? (
            <Link
              href={`/khoahoc/${course.id}/bai/${nextLesson.id}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Bài tiếp theo: {nextLesson.title} →
            </Link>
          ) : (
            <span className="text-sm text-green-600 font-medium">
              ✓ Đã hết bài trong khóa
            </span>
          )}
        </div>
      </section>
    </main>
  );
}
