"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { courses } from "@/data/courses";
import { lessons } from "@/data/lessons";
import { unlockCourse, hasCourseAccess } from "@/lib/progress";

const ADMIN_CODE = "Blockchain3011@@@@";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [accessMap, setAccessMap] = useState<Record<number, boolean>>({});
  const [users, setUsers] = useState<User[]>([]);
  const [tab, setTab] = useState<"overview" | "users" | "courses">("overview");

  async function loadUsers() {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (!res.ok) {
        setUsers([]);
        return;
      }
      setUsers(
        (data.users || []).map(
          (u: { id: string; name: string | null; email: string | null }) => ({
            id: u.id,
            name: u.name || "",
            email: u.email || "",
          })
        )
      );
    } catch {
      setUsers([]);
    }
  }

  useEffect(() => {
    const logged = localStorage.getItem("aunora_logged_in") === "true";
    const admin = localStorage.getItem("aunora_admin") === "true";
    setIsLoggedIn(logged);
    setIsAdmin(admin);

    const map: Record<number, boolean> = {};
    courses.forEach((c) => {
      map[c.id] = hasCourseAccess(c.id, c.is_free);
    });
    setAccessMap(map);

    if (admin) loadUsers();
    setReady(true);
  }, []);

  function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim() === ADMIN_CODE) {
      localStorage.setItem("aunora_admin", "true");
      setIsAdmin(true);
      setError("");
      loadUsers();
    } else {
      setError("Mã admin không đúng");
    }
  }

  function handleUnlock(courseId: number) {
    unlockCourse(courseId);
    setAccessMap((prev) => ({ ...prev, [courseId]: true }));
  }

  function handleLogoutAdmin() {
    localStorage.removeItem("aunora_admin");
    setIsAdmin(false);
  }

  async function handleDeleteUser(id: string, email: string) {
    if (!confirm(`Xóa tài khoản ${email}?`)) return;
    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Xóa thất bại");
        return;
      }
      loadUsers();
    } catch {
      alert("Lỗi kết nối");
    }
  }

  if (!ready) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Đang tải...</p>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <h1 className="text-xl font-bold mb-2">Admin AunoraAI</h1>
          <p className="text-gray-600 text-sm mb-6">
            Bạn cần đăng nhập tài khoản trước.
          </p>
          <Link
            href="/dangnhap"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700"
          >
            Đăng nhập
          </Link>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          <h1 className="text-xl font-bold text-center mb-2">Xác minh Admin</h1>
          <p className="text-gray-500 text-sm text-center mb-6">
            Nhập mã quản trị để tiếp tục
          </p>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Mã admin"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700"
            >
              Vào trang Admin
            </button>
          </form>
          <div className="text-center mt-4">
            <Link href="/dashboard" className="text-sm text-gray-500 hover:underline">
              ← Về Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const freeLessons = lessons.filter((l) => l.is_free).length;
  const paidCourses = courses.filter((c) => !c.is_free).length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin AunoraAI</h1>
            <p className="text-gray-500 text-sm mt-1">
              Quản lý người dùng và khóa học
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-blue-600 px-3 py-2">
              ← Dashboard
            </Link>
            <button
              onClick={handleLogoutAdmin}
              className="text-sm text-red-500 hover:text-red-600 px-3 py-2"
            >
              Thoát Admin
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-8 border-b border-gray-200 pb-2">
          <button
            onClick={() => setTab("overview")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              tab === "overview" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Tổng quan
          </button>
          <button
            onClick={() => {
              setTab("users");
              loadUsers();
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              tab === "users" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Người dùng ({users.length})
          </button>
          <button
            onClick={() => setTab("courses")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              tab === "courses" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Khóa học
          </button>
        </div>

        {tab === "overview" && (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-sm text-gray-500">Người dùng</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{users.length}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-sm text-gray-500">Tổng khóa học</p>
              <p className="text-3xl font-bold text-indigo-600 mt-1">{courses.length}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-sm text-gray-500">Bài miễn phí</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{freeLessons}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-sm text-gray-500">Khóa trả phí</p>
              <p className="text-3xl font-bold text-orange-500 mt-1">{paidCourses}</p>
            </div>
          </div>
        )}

        {tab === "users" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Danh sách người dùng</h2>
              <button onClick={loadUsers} className="text-sm text-blue-600 hover:underline">
                Làm mới
              </button>
            </div>
            {users.length === 0 ? (
              <p className="p-8 text-center text-gray-500">
                Chưa có người dùng hoặc chưa load được từ Supabase.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-700">#</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">Họ tên</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">Email</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => (
                      <tr key={u.id} className="border-t border-gray-100">
                        <td className="px-4 py-3">{i + 1}</td>
                        <td className="px-4 py-3 font-medium">{u.name}</td>
                        <td className="px-4 py-3 text-gray-600">{u.email}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDeleteUser(u.id, u.email)}
                            className="text-xs text-red-600 hover:underline"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === "courses" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Quản lý khóa học</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-700">ID</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Tên khóa</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Trình độ</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Giá</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Quyền</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c) => {
                    const unlocked = accessMap[c.id];
                    return (
                      <tr key={c.id} className="border-t border-gray-100">
                        <td className="px-4 py-3">{c.id}</td>
                        <td className="px-4 py-3 font-medium">{c.title}</td>
                        <td className="px-4 py-3 text-gray-600">{c.level}</td>
                        <td className="px-4 py-3">
                          {c.is_free ? (
                            <span className="text-green-600 font-semibold">FREE</span>
                          ) : (
                            `${c.price.toLocaleString("vi-VN")}đ`
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {c.is_free || unlocked ? (
                            <span className="text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
                              Đã mở
                            </span>
                          ) : (
                            <span className="text-orange-600 text-xs font-medium bg-orange-50 px-2 py-1 rounded-full">
                              Chưa mở
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Link
                              href={`/khoahoc/${c.id}`}
                              className="text-blue-600 hover:underline text-xs"
                            >
                              Xem
                            </Link>
                            {!c.is_free && !unlocked && (
                              <button
                                onClick={() => handleUnlock(c.id)}
                                className="text-xs bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-700"
                              >
                                Mở khóa
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}