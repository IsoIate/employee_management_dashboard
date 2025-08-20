"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface Location {
  id: number;
  type: "parking" | "ev";
  name: string;
  lat: number;
  lng: number;
  available: number; // 잔여 대수/충전기
  total: number; // 총 대수/충전기
}

// 샘플 주차장 데이터
const sampleParking: Location[] = [
  {
    id: 1,
    type: "parking",
    name: "주차장 A",
    lat: 37.5665,
    lng: 126.978,
    available: 12,
    total: 50,
  },
];

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Location | null>(null);
  const [evData, setEvData] = useState<Location[]>([]);

  // 전기차 충전소 API 호출
  const fetchEvData = async () => {
    try {
      let data: any = await axios.get(`/api/ev`).then((res) => {
        return JSON.parse(res.data);
      });
      console.log(data);

      //   // API 데이터 변환: Location 타입으로 매핑
      const locations: Location[] = data.map((item: any, index: number) => ({
        id: item.chgerId,
        type: item.chgerType,
        name: item.statNm,
        addr: item.addr,
        statNm: item.statNm,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lng),
        available: parseInt(item.rsrvChrgCnt) || 0, // 예시: 예약 가능 충전기 수
        total: parseInt(item.stat) || 1, // 예시: 총 충전기 수
      }));

      console.log(locations);
      setEvData(locations);
    } catch (error) {
      console.error("전기차 충전소 API 오류", error);
    }
  };

  useEffect(() => {
    fetchEvData();
  }, []);

  useEffect(() => {
    // 지도 스크립트 동적 로드
    const existingScript = document.getElementById("naver-maps");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "naver-maps";
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;
      script.async = true;
      document.head.appendChild(script);
      script.onload = () => initMap();
    } else {
      //   <p> 로딩중... </p>;
      initMap();
    }

    async function initMap() {
      if (!mapRef.current || !(window as any).naver) return;
      const naver = (window as any).naver;

      const map = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(37.5665, 126.978),
        zoom: 14,
      });

      // 주차장 마커 추가
      sampleParking.forEach((loc) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(loc.lat, loc.lng),
          map: map,
          title: loc.name,
          icon: "https://navermaps.github.io/maps.js/docs/img/example/marker_b.png",
        });

        naver.maps.Event.addListener(marker, "click", () => {
          setSelected(loc);
        });
      });

      // 전기차 충전소 API 호출
      await fetchEvData();

      // EV 마커 추가 (evData 업데이트 후)
      evData.forEach((loc) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(loc.lat, loc.lng),
          map: map,
          title: loc.name,
          icon: "https://navermaps.github.io/maps.js/docs/img/example/marker_g.png",
        });

        naver.maps.Event.addListener(marker, "click", () => {
          setSelected(loc);
        });
      });
    }
  }, []); // evData가 업데이트되면 마커 재생성

  return (
    <div className="relative w-full h-screen">
      <div ref={mapRef} className="w-full h-[500px]" />

      {/* 상세 모달 */}
      {selected && (
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg w-80 z-50">
          <h2 className="text-lg font-bold mb-2">{selected.name}</h2>
          <p>
            유형: {selected.type === "parking" ? "주차장" : "전기차 충전소"}
          </p>
          <p>
            잔여 {selected.type === "parking" ? "주차공간" : "충전기"}:{" "}
            {selected.available} / {selected.total}
          </p>
          <button
            onClick={() => setSelected(null)}
            className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
}
