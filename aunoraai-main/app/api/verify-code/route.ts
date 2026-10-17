import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

function hashCode(code: string) {
  return crypto.createHash("sha256").update(code).digest("hex");
}

export async function POST(req: Request) {
  try {
    const { email, code, purpose } = await req.json();

    if (!email || !code || !purpose) {
      return NextResponse.json({ error: "Thiếu thông tin" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const raw = cookieStore.get("aunora_verify")?.value;

    if (!raw) {
      return NextResponse.json(
        { error: "Mã đã hết hạn hoặc chưa gửi mã" },
        { status: 400 }
      );
    }

    const data = JSON.parse(raw);

    if (data.email !== email.toLowerCase() || data.purpose !== purpose) {
      return NextResponse.json({ error: "Email không khớp" }, { status: 400 });
    }

    if (Date.now() > data.expires) {
      return NextResponse.json({ error: "Mã đã hết hạn" }, { status: 400 });
    }

    if (data.hash !== hashCode(code.trim())) {
      return NextResponse.json({ error: "Mã không đúng" }, { status: 400 });
    }

    // Xóa cookie sau khi dùng
    cookieStore.delete("aunora_verify");

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Lỗi xác minh" }, { status: 500 });
  }
}
