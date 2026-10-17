"use client";

import Link from "next/link";
import { useState } from "react";

const situations = [
  "Chào hỏi và giới thiệu bản thân",
  "Gọi món ở nhà hàng",
  "Hỏi đường",
  "Mua sắm",
  "Nói chuyện với bạn bè",
];

export default function LuyenNoi() {
  const [selected, setSelected] = useState(situations[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState("");

  function handleStart() {
    setIsRecording(true);
    setFeedback("");
    // Giả lập: sau 3 giây hiện phản hồi
    setTimeout(() => {
      setIsRecording(false);
      setFeedback(
        "Phát âm khá tốt! Hãy nhấn mạnh hơn vào từ 'Hello'. Thử nói chậm hơn một chút nhé."
      );
    }, 3000);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="max-w-3xl mx-auto px-6 py-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
        >
          ← Quay về Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Luyện nói với AI</h1>
        <p className="text-gray-600 mb-8">
          Chọn tình huống, nói vào micro, AI sẽ góp ý phát âm và cách diễn đạt.
        </p>

        {/* Chọn tình huống */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-3">Chọn tình huống</h2>
          <div className="flex flex-wrap gap-2">
            {situations.map((s) => (
              <button
                key={s}
                onClick={() => setSelected(s)}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  selected === s
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Khu vực luyện nói */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-sm mb-6">
          <p className="text-gray-500 text-sm mb-2">Tình huống đang luyện</p>
          <h3 className="text-xl font-bold text-gray-900 mb-8">{selected}</h3>

          <button
            onClick={handleStart}
            disabled={isRecording}
            className={`w-24 h-24 rounded-full text-4xl flex items-center justify-center mx-auto transition ${
              isRecording
                ? "bg-red-500 text-white animate-pulse"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isRecording ? "⏹" : "🎤"}
          </button>

          <p className="text-sm text-gray-500 mt-4">
            {isRecording
              ? "Đang nghe... Hãy nói đi"
              : "Nhấn micro để bắt đầu nói"}
          </p>
        </div>

        {/* Phản hồi AI */}
        {feedback && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <h3 className="font-semibold text-green-800 mb-2">Phản hồi từ AI</h3>
            <p className="text-green-700 text-sm leading-relaxed">{feedback}</p>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-8">
          * Hiện tại đang dùng phản hồi mẫu. Sau này sẽ gắn AI thật (speech-to-text + góp ý).
        </p>
      </section>
    </main>
  );
}
