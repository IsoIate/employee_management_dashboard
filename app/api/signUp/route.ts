import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const { email, password, username, phone } = await request.json();
    const client = await clientPromise;
    const db = client.db("Employee_Management");

    // 사용자 이름 중복 확인
    const existingUser = await db.collection("User").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "이미 존재하는 유저입니다." },
        { status: 409 }
      );
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 데이터베이스에 사용자 정보 저장
    const result = await db.collection("User").insertOne({
      email,
      password: hashedPassword,
      username,
      phone,
      createdAt: new Date(),
      role: "user"
    });

    if (result.acknowledged) {
      return NextResponse.json({ status: 201 });
    } else {
      return NextResponse.json({ status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
