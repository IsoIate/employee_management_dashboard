"use client";

import Login from "@/components/Login";
// pages/index.tsx
import React, { useState } from "react";
import { Carousel, Button } from "react-bootstrap";

export default function Home() {
  let [loginToggle, setLoginToggle] = useState(false);

  function loginBtn() {
    setLoginToggle(!loginToggle);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* 상단: 제목 + 설명 */}
      <header className="bg-gray-100 py-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Travel Planner</h1>
        <p className="text-gray-700 text-lg">
          여행 가기 전, 친구, 가족, 동료와 일정 공유를 해 봐요!
        </p>
      </header>

      {/* 중간: 이미지 캐러셀 */}
      <main className="flex-grow container mx-auto py-10">
        <div>
          <Carousel className="w-full">
            <Carousel.Item className="relative h-[400px] md:h-[500px]">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="https://picsum.photos/800/400?random=1"
                alt="Slide 1"
              />
            </Carousel.Item>
            <Carousel.Item className="relative h-[400px] md:h-[500px]">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="https://picsum.photos/800/400?random=2"
                alt="Slide 2"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="flex flex-col items-center pt-20">
          <Login loginToggle={loginToggle}></Login>
        </div>
        <div className=" pt-20 flex flex-col gap-4 items-center ">
          <Button
            variant="primary"
            className="w-60"
            onClick={() => {
              loginBtn();
            }}
          >
            로그인
          </Button>
          <Button variant="success" className="w-60">
            회원가입
          </Button>
          <Button
            variant="outline-secondary"
            className="w-60"
            onClick={() => {
              location.href = "/plan";
            }}
          >
            살펴보기
          </Button>
        </div>
      </main>
    </div>
  );
}
