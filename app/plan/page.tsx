"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TravelCard from "../../components/TravelCard";
import { TravelItem } from "../../types/travel";
import NaverMap from "@/components/NaverMap";
import AiTravelRecommend from "@/components/AiTravelRecommend";
import Test from "@/components/Test";
import Test2 from "@/components/Test2";
import { Container } from "react-bootstrap";

export default function PlanPage() {
  const [travels, setTravels] = useState<TravelItem[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    // fetchTravels();
  }, []);

  const fetchTravels = async () => {
    const res = await axios.get("/api/travel");
    setTravels(res.data);
  };

  const addTravel = async () => {
    if (!title || !description || !date) return;
    await axios.post("/api/travel", { title, description, date });
    setTitle("");
    setDescription("");
    setDate("");
    fetchTravels();
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">여행 일정</h1>

        {/* 입력 폼 */}
        <div className="mb-6 flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <input
            type="text"
            placeholder="설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={addTravel}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            추가
          </button>
        </div>

        {/* 일정 리스트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {travels.map((travel) => (
            <TravelCard key={travel._id} travel={travel} />
          ))}
        </div>
      </div>
      {/* <NaverMap></NaverMap> */}
      <Container>
        {/* <AiTravelRecommend></AiTravelRecommend> */}
        <Test></Test>
        {/* <Test2></Test2> */}
      </Container>
    </>
  );
}
