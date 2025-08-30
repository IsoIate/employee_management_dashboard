import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ token, req }) => {
      if (!token) {
        return false;
      }

      const pathname = req.nextUrl.pathname;

      if (pathname.startsWith("/adminPage")) {
        return token.role === "admin";
      }

      if (pathname.startsWith("/inputEmployees")) {
        return token.role === "admin" || token.role === "hr_admin";
      }

      if (pathname.startsWith("/leaveEmployees")) {
        return token.role === "admin" || token.role === "hr_admin";
      }

      return !!token;
    },
  },
});

// matcher: 로그인 체크할 경로만 지정
// /api/* 는 제외 → 회원가입 API 안전하게 공개
export const config = {
  matcher: [
    "/adminPage/:path*",   // 관리자 페이지
    "/inputEmployees/:path*",   // 사원 등록 페이지
    "/leaveEmployees/:path*",   // 퇴사자 목록 페이지
    "/((?!api|_next/static|favicon.ico).*)" // 나머지 공개 API 제외
  ],
};