import { Resend } from "resend";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

function hashCode(code: string) {
  return crypto.createHash("sha256").update(code).digest("hex");
}

export async function POST(req: Request) {
  try {
    const { email, purpose } = await req.json(); // purpose: "register" | "reset"

    if (!email || !purpose) {
      return NextResponse.json({ error: "Thiếu thông tin" }, { status: 400 });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 số
    const expires = Date.now() + 10 * 60 * 1000; // 10 phút

    // Gửi email
    const { error } = await resend.emails.send({
      from: "AunoraAI <onboarding@resend.dev>",
      to: email,
      subject:
        purpose === "register"
          ? "Mã xác nhận đăng ký AunoraAI"
          : "Mã đặt lại mật khẩu AunoraAI",
      html: `
        <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto;">
          <h2>AunoraAI</h2>
          <p>Mã xác nhận của bạn là:</p>
          <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px;">${code}</p>
          <p>Mã có hiệu lực trong <b>10 phút</b>.</p>
          <p style="color: #888; font-size: 13px;">Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
        </div>
      `,
    });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Không gửi được email. Kiểm tra API key hoặc email nhận." },
        { status: 500 }
      );
    }

    // Lưu hash mã vào cookie (httpOnly) — không cần database
    const cookieStore = await cookies();
    cookieStore.set(
      "aunora_verify",
      JSON.stringify({
        email: email.toLowerCase(),
        purpose,
        hash: hashCode(code),
        expires,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 600, // 10 phút
        path: "/",
      }
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
