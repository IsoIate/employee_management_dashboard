// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. JWT 토큰이 저장된 쿠키나 헤더를 확인 (예: 'token' 쿠키)
  const isAuthenticated = request.cookies.has("token");

  // 2. 보호된 경로(로그인이 필요한 페이지)를 정의
  const protectedRoutes = [
    // "/dashboard",
    // "/inputEmployee",
    // "/employees",
    // "/leaveEmployees",
    "/adminPage",
  ];

  // 3. 현재 요청된 경로가 보호된 경로인지 확인
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // 4. 로그인 상태와 보호된 경로 여부에 따라 리다이렉션
  if (isProtectedRoute && !isAuthenticated) {
    // 보호된 페이지에 접근했지만 로그인되어 있지 않은 경우 -> 로그인 페이지로 리다이렉션
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 5. 로그인 페이지에 접근했지만 이미 로그인되어 있는 경우 -> 대시보드로 리다이렉션
  if (request.nextUrl.pathname.startsWith("/login") && isAuthenticated) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next(); // 조건에 해당하지 않으면 요청을 계속 진행
}

// 6. 미들웨어가 실행될 경로를 설정 (선택 사항)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
