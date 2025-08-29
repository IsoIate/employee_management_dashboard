import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

interface User {
  email: string;
  password: string;
  username: string;
  phone: string;
  role?: string;
  createdAt: Date;
}

// 실제 환경에서는 환경 변수를 사용하세요.
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { email, password } = req.data;
    const client = await clientPromise;
    const db = client.db("Employee_Management");
    const user = await db.collection<User>("User").findOne({ email: email });

    console.log(user);

    // 사용자 존재 여부 확인
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 401 });
    }

    // 비밀번호 일치 여부 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 401 }
      );
    }

    console.log(isPasswordValid);

    // JWT 토큰 생성
    const token = jwt.sign(
      { email: user.email, username: user.username, role: user.role }, // 토큰에 담을 정보
      JWT_SECRET,
      { expiresIn: "1h" } // 토큰 만료 시간
    );
    console.log(token);

    // 토큰을 JSON 응답으로 반환
    return NextResponse.json(
      {
        token,
        user: { email: user.email, username: user.username, role: user.role },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
