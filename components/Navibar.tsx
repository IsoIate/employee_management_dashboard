"use client";

import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Session {
  session: User | null;
}

interface User {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
}

export default function Navibar({ session }: Session) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-blue-400 shadow py-4">
        <div className="px-8 mx-auto max-w-10xl hidden md:block">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-6">
              <a
                className="text-3xl font-bold text-white no-underline hover:text-black"
                href="/"
              >
                A Company
              </a>
              <div className="flex space-x-4 ml-6">
                {session?.user?.role === "admin" ||
                session?.user?.role === "hr_admin" ? (
                  <a
                    className="text-stone-50  hover:text-black px-3 py-2 rounded-md text-md font-medium no-underline"
                    href="/inputEmployee"
                  >
                    사원등록
                  </a>
                ) : (
                  ""
                )}
                <a
                  className="text-stone-50  hover:text-black px-3 py-2 rounded-md text-md font-medium no-underline"
                  href="/employees"
                >
                  사원목록
                </a>
                {session?.user?.role === "admin" ||
                session?.user?.role === "hr_admin" ? (
                  <a
                    className="text-stone-50  hover:text-black px-3 py-2 rounded-md text-md font-medium no-underline"
                    href="/leaveEmployees"
                  >
                    퇴사사원목록
                  </a>
                ) : (
                  ""
                )}
                {session?.user?.role === "admin" ? (
                  <a
                    className="text-stone-50  hover:text-black px-3 py-2 rounded-md text-md font-medium no-underline"
                    href="/adminPage"
                  >
                    관리자페이지
                  </a>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {!session ? (
                <a
                  className="text-stone-50  hover:text-black px-3 py-2 rounded-md text-md font-medium no-underline cursor-pointer"
                  onClick={() => {
                    signIn();
                  }}
                >
                  로그인
                </a>
              ) : (
                <>
                <p className="text-stone-50 m-0 px-3 py-2 rounded-md text-md font-medium">{session.user?.name}님</p>
                <a
                  className="text-stone-50  hover:text-black px-3 py-2 rounded-md text-md font-medium no-underline cursor-pointer"
                  onClick={() => {
                    signOut();
                  }}
                >
                  로그아웃
                </a>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            <div className="flex items-center gap-3">
              <a
                className="text-3xl mb-3 font-bold text-white no-underline hover:text-black"
                href="/"
              >
                A Company
              </a>
              <button
                className="md:hidden text-white border-none bg-blue-500 rounded-md mb-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
              </button>
            </div>
            <div className="relative md:hidden">
              <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
      ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
    `}
              >
                {session?.user?.role === "admin" ||
                session?.user?.role === "hr_admin" ? (
                  <a
                    className="text-stone-50  hover:text-black block px-3 py-2 rounded-md text-base font-medium no-underline"
                    href="/inputEmployee"
                  >
                    사원등록
                  </a>
                ) : (
                  ""
                )}
                <a
                  className="text-stone-50  hover:text-black block px-3 py-2 rounded-md text-base font-medium no-underline"
                  href="/employees"
                >
                  사원목록
                </a>
                {session?.user?.role === "admin" ||
                session?.user?.role === "hr_admin" ? (
                  <a
                    className="text-stone-50  hover:text-black block px-3 py-2 rounded-md text-base font-medium no-underline"
                    href="/leaveEmployees"
                  >
                    퇴사사원목록
                  </a>
                ) : (
                  ""
                )}
                {session?.user?.role === "admin" ? (
                  <a
                    className="text-stone-50  hover:text-black block px-3 py-2 rounded-md text-base font-medium no-underline"
                    href="/adminPage"
                  >
                    관리자페이지
                  </a>
                ) : (
                  ""
                )}
                {!session ? (
                  <a
                    className="text-stone-50  hover:text-black block px-3 py-2 rounded-md text-base font-medium no-underline"
                    onClick={() => {
                      signIn();
                    }}
                  >
                    로그인
                  </a>
                ) : (
                  <a
                    className="text-stone-50  hover:text-black block px-3 py-2 rounded-md text-base font-medium no-underline"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    로그아웃
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
