import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// 실제 환경에서는 환경 변수를 사용하세요.
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// 이 함수는 실제 데이터베이스에서 사용자 정보를 조회하는 함수를 대신합니다.
// 실제 DB 연결 로직으로 대체해야 합니다.
async function findUserByUsername(username: string) {
  // 실제 DB에서는 user.password가 해싱된 비밀번호여야 합니다.
  const user = {
    id: 1,
    username: "admin",
    password: "hashed_password_from_db", // bcrypt.hashSync('password123', 10) 으로 생성된 해시 값
    role: "Admin",
  };
  return username === user.username ? user : null;
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const user = await findUserByUsername(username);

    // 1. 사용자 존재 여부 확인
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 401 });
    }

    // 2. 비밀번호 일치 여부 확인
    // bcrypt.compare()를 사용하여 해싱된 비밀번호를 비교
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 401 }
      );
    }

    // 3. JWT 토큰 생성
    const token = jwt.sign(
      { userId: user.id, role: user.role }, // 토큰에 담을 정보
      JWT_SECRET,
      { expiresIn: "1h" } // 토큰 만료 시간
    );

    // 4. 토큰을 JSON 응답으로 반환
    return NextResponse.json(
      {
        token,
        user: { id: user.id, username: user.username, role: user.role },
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
