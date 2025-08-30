import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  // Session 타입을 확장
  interface Session {
    user: {
      id: string; // authOptions의 callbacks에서 추가
      role?: string; // 예시: 'admin', 'user' 등
      // 여기에 추가하고 싶은 속성을 정의
    } & DefaultSession["user"];
  }

  // User 타입을 확장 (authorize 함수의 반환값)
  interface User extends DefaultUser {
    id: string;
    role?: string;
    // 여기에 추가하고 싶은 속성을 정의
  }
}

declare module "next-auth/jwt" {
  // JWT 토큰 타입을 확장
  interface JWT extends DefaultJWT {
    id: string;
    role?: string;
    // 여기에 추가하고 싶은 속성을 정의
  }
}
