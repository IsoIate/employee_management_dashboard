"use client";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useEffect } from "react";

export default function Navibar() {
  return (
    <>
      <div>
        <nav className="bg-blue-400  shadow py-4 ">
          <div className="px-8 mx-auto max-w-[75%]">
            <div className="flex items-center justify-between h-16">
              <div className=" flex items-center">
                <a
                  className="flex-shrink-0 text-stone-50  hover:text-black no-underline text-3xl mb-3"
                  href="/"
                >
                  A Company
                  {/* <img
                    className="w-8 h-8"
                    src="/icons/rocket.svg"
                    alt="A Company"
                  /> */}
                </a>
                <div className="hidden md:block">
                  <div className="flex items-baseline ml-10 space-x-4">
                    <a
                      className="text-stone-50  hover:text-black px-3 py-2 rounded-md text-md font-medium no-underline"
                      href="/inputEmployee"
                    >
                      사원등록
                    </a>
                    <a
                      className="text-stone-50  hover:text-black px-3 py-2 rounded-md text-md font-medium no-underline"
                      href="/employees"
                    >
                      사원목록
                    </a>
                    <a
                      className="text-stone-50  hover:text-black px-3 py-2 rounded-md text-md font-medium no-underline"
                      href="/leaveEmployees"
                    >
                      퇴사사원목록
                    </a>
                    <a
                      className="text-stone-50  hover:text-black px-3 py-2 rounded-md text-md font-medium no-underline"
                      href="/adminPage"
                    >
                      관리자페이지
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex -mr-2 md:hidden">
                <button className="text-black  hover:text-black inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                  <svg
                    width="10"
                    height="10"
                    fill="currentColor"
                    className="w-4 h-4"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                className="text-stone-50  hover:text-black block px-3 py-2 rounded-md text-base font-medium no-underline"
                href="/#"
              >
                사원등록
              </a>
              <a
                className="text-stone-50  hover:text-black px-3 py-2 rounded-md text-base font-medium no-underline"
                href="/#"
              >
                사원목록
              </a>
              <a
                className="text-stone-50  hover:text-black block px-3 py-2 rounded-md text-base font-medium no-underline"
                href="/#"
              >
                관리자페이지
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
