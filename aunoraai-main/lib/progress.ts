const KEY = "aunora_progress";
const ACCESS_KEY = "aunora_course_access";

export type ProgressMap = Record<string, boolean>;

export function getProgress(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function markLessonDone(courseId: number, lessonId: number) {
  const p = getProgress();
  p[`${courseId}-${lessonId}`] = true;
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function isLessonDone(courseId: number, lessonId: number) {
  return !!getProgress()[`${courseId}-${lessonId}`];
}

export function getCourseProgressPercent(courseId: number, totalLessons: number) {
  if (totalLessons === 0) return 0;
  const p = getProgress();
  const done = Object.keys(p).filter(
    (k) => k.startsWith(`${courseId}-`) && p[k]
  ).length;
  return Math.min(100, Math.round((done / totalLessons) * 100));
}

export function hasCourseAccess(courseId: number, isFree: boolean) {
  if (isFree) return true;
  if (typeof window === "undefined") return false;
  try {
    const access = JSON.parse(localStorage.getItem(ACCESS_KEY) || "{}");
    return !!access[String(courseId)];
  } catch {
    return false;
  }
}

export function unlockCourse(courseId: number) {
  const access = JSON.parse(localStorage.getItem(ACCESS_KEY) || "{}");
  access[String(courseId)] = true;
  localStorage.setItem(ACCESS_KEY, JSON.stringify(access));
}
