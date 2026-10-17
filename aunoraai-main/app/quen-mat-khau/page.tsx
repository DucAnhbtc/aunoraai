"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function QuenMatKhau() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "code" | "newpass">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const trimmedEmail = email.trim().toLowerCase();

    if (!isValidEmail(trimmedEmail)) {
      setError("Email không hợp lệ");
      return;
    }

    const users = JSON.parse(localStorage.getItem("aunora_users") || "[]");
    if (!users.some((u: { email: string }) => u.email === trimmedEmail)) {
      setError("Email chưa được đăng ký");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, purpose: "reset" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Không gửi được mã");
        return;
      }
      setStep("code");
    } catch {
      setError("Lỗi kết nối");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          code,
          purpose: "reset",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Mã không đúng");
        return;
      }
      setStep("newpass");
    } catch {
      setError("Lỗi kết nối");
    } finally {
      setLoading(false);
    }
  }

  function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Mật khẩu tối thiểu 6 ký tự");
      return;
    }
    if (password !== confirm) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    const users = JSON.parse(localStorage.getItem("aunora_users") || "[]");
    const idx = users.findIndex(
      (u: { email: string }) => u.email === email.trim().toLowerCase()
    );
    if (idx === -1) {
      setError("Không tìm thấy tài khoản");
      return;
    }

    users[idx].password = password;
    localStorage.setItem("aunora_users", JSON.stringify(users));
    alert("Đổi mật khẩu thành công! Hãy đăng nhập lại.");
    router.push("/dangnhap");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="AunoraAI"
            className="w-14 h-14 rounded-full object-cover mx-auto mb-3"
          />
          <h1 className="text-2xl font-bold">Quên mật khẩu</h1>
          <p className="text-gray-500 text-sm mt-1">
            {step === "email" && "Nhập email để nhận mã"}
            {step === "code" && `Mã đã gửi về ${email}`}
            {step === "newpass" && "Nhập mật khẩu mới"}
          </p>
        </div>

        {step === "email" && (
          <form onSubmit={handleSendCode} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ten@gmail.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Đang gửi..." : "Gửi mã"}
            </button>
          </form>
        )}

        {step === "code" && (
          <form onSubmit={handleVerifyCode} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mã 6 số</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                placeholder="123456"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Đang kiểm tra..." : "Xác nhận mã"}
            </button>
          </form>
        )}

        {step === "newpass" && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700"
            >
              Đổi mật khẩu
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          <Link href="/dangnhap" className="text-blue-600 font-medium hover:underline">
            ← Về đăng nhập
          </Link>
        </p>
      </div>
    </main>
  );
}
