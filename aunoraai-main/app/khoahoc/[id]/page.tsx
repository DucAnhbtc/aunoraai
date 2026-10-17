import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, colorMap } from "@/data/courses";
import { lessons } from "@/data/lessons";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params;
  const courseId = Number(id);
  const course = courses.find((c) => c.id === courseId);

  if (!course) notFound();

  const courseLessons = lessons
    .filter((l) => l.courseId === courseId)
    .sort((a, b) => a.order - b.order);

  const colors = colorMap[course.color];

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="max-w-4xl mx-auto px-6 py-10">
        <Link
          href="/khoahoc"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
        >
          ← Quay về danh sách khóa học
        </Link>

        {/* Thông tin khóa */}
        <div className={`bg-white rounded-2xl border ${colors.border} p-6 md:p-8 mb-8 shadow-sm`}>
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${colors.badge}`}>
            {course.is_free ? "FREE" : course.level}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mt-3 mb-2">
            {course.title}
          </h1>
          <p className="text-gray-600 mb-4">Dành cho: {course.forWho}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span>⏱ {course.duration}</span>
            <span>📚 {courseLessons.length} bài học</span>
            <span className="font-semibold text-gray-800">
              {course.is_free ? "Miễn phí" : `${course.price.toLocaleString("vi-VN")}đ`}
            </span>
          </div>
        </div>

        {/* Danh sách bài học */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Danh sách bài học</h2>
        <div className="space-y-3">
          {courseLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                  {lesson.order}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                  <p className="text-sm text-gray-500">{lesson.duration}</p>
                </div>
              </div>
              <Link
                href={`/khoahoc/${course.id}/bai/${lesson.id}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${colors.button}`}
              >
                Học ngay
              </Link>
            </div>
          ))}
        </div>

        {courseLessons.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            Chưa có bài học nào trong khóa này.
          </p>
        )}
      </section>
    </main>
  );
}
