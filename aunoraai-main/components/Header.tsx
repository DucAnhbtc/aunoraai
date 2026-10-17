"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const loggedIn = localStorage.getItem("aunora_logged_in") === "true";
    setIsLoggedIn(loggedIn);
    setReady(true);
  }, [pathname]);

  function handleLogout() {
    localStorage.removeItem("aunora_logged_in");
    setIsLoggedIn(false);
    window.location.href = "/";
  }

  return (
    <header className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
      <Link href="/" className="flex items-center gap-2">
        <img
          src="/logo.png"
          alt="AunoraAI"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-xl font-bold text-gray-800">AunoraAI</span>
      </Link>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <Link href="/" className="hover:text-blue-600">
          Trang chủ
        </Link>
        <Link href="/khoahoc" className="hover:text-blue-600">
          Khóa học
        </Link>
        {isLoggedIn && (
          <Link href="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
        )}
        <a href="/#tinhnang" className="hover:text-blue-600">
          Tính năng
        </a>
        <a href="/#vechungtoi" className="hover:text-blue-600">
          Về chúng tôi
        </a>
      </nav>

      <div className="flex items-center gap-3 min-w-[180px] justify-end">
        {!ready ? (
          <div className="h-9 w-24 bg-gray-100 rounded-full animate-pulse" />
        ) : isLoggedIn ? (
          <>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 px-4 py-2"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-500 hover:text-red-600 px-4 py-2"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link
              href="/dangnhap"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 px-4 py-2"
            >
              Đăng nhập
            </Link>
            <Link
              href="/dangky"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition"
            >
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
