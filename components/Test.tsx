"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface EvLocation {
  lat: number;
  lng: number;
  name: string;
}

export default function NaverMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  // 📌 전기차 충전소 API 호출 함수
  const fetchEvData = async (centerLat: number, centerLng: number) => {
    try {
      // 예시 API (실제 API로 교체)
      //   const res = await fetch(
      //     `/api/ev?lat=${centerLat}&lng=${centerLng}`
      //   );
      //   const data: EvLocation[] = await res.json();

      const data: any = await axios.get(`/api/ev`).then((res) => {
        return JSON.parse(res.data);
      });
      console.log(data);
      return data;
    } catch (err) {
      console.error("EV 데이터 가져오기 실패", err);
      return [];
    }
  };

  // 📌 마커 클리어
  const clearMarkers = () => {
    markers.forEach((m) => m.setMap(null)); // 지도에서 제거
    setMarkers([]);
  };

  // 📌 새 마커 찍기
  const renderMarkers = (map: any, data: EvLocation[]) => {
    clearMarkers();
    const naver = (window as any).naver;

    const newMarkers = data.map((loc) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(loc.lat, loc.lng),
        map,
        title: loc.name,
        icon: "https://navermaps.github.io/maps.js/docs/img/example/marker_g.png",
      });
      return marker;
    });

    setMarkers(newMarkers);
  };

  // 📌 지도 초기화
  useEffect(() => {
    const existingScript = document.getElementById("naver-maps");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "naver-maps";
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;
      script.async = true;
      document.head.appendChild(script);
      script.onload = () => initMap();
    } else {
      initMap();
    }

    async function initMap() {
      if (!mapRef.current || !(window as any).naver) return;
      const naver = (window as any).naver;

      const mapInstance = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(37.5665, 126.978),
        zoom: 14,
      });

      setMap(mapInstance);

      // 📌 처음 로드 시 데이터 가져오기
      const center = mapInstance.getCenter();
      const data = await fetchEvData(center.y, center.x);
      renderMarkers(mapInstance, data);

      // 📌 지도 이동 후 데이터 다시 가져오기
      naver.maps.Event.addListener(mapInstance, "idle", async () => {
        const center = mapInstance.getCenter();
        const data = await fetchEvData(center.y, center.x);
        renderMarkers(mapInstance, data);
      });
    }
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "600px" }} />;
}
