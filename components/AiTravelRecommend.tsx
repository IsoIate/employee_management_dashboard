"use client";

import { useEffect, useRef, useState } from "react";

interface Place {
  name: string;
  lat: number;
  lng: number;
  category: string;
}

export default function NaverAITravelOAPIMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>();
  const directionsRendererRef = useRef<any>(null);
  const [routeShown, setRouteShown] = useState(false);

  // 예시 AI 추천 데이터
  const places: Place[] = [
    { name: "해운대 해수욕장", lat: 35.1587, lng: 129.1604, category: "해변" },
    { name: "광안리 해수욕장", lat: 35.1535, lng: 129.1186, category: "해변" },
    { name: "부산 자갈치 시장", lat: 35.0987, lng: 129.0344, category: "음식" },
    { name: "남포동 국제시장", lat: 35.0973, lng: 129.035, category: "음식" },
    {
      name: "더 베이 101 카페거리",
      lat: 35.0961,
      lng: 129.0377,
      category: "카페",
    },
    {
      name: "부산 감천문화마을",
      lat: 35.0985,
      lng: 129.0092,
      category: "카페",
    },
    { name: "송정 해변", lat: 35.181, lng: 129.1944, category: "해변" },
  ];

  useEffect(() => {
    if (!mapRef.current) return;

    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=directions`;
    script.async = true;

    script.onload = () => {
      const mapObj = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(35.1595, 129.1604),
        zoom: 12,
      });
      setMap(mapObj);

      // DirectionsRenderer 준비
      if (window.naver.maps.DirectionsRenderer) {
        directionsRendererRef.current =
          new window.naver.maps.DirectionsRenderer({
            map: mapObj,
            polylineOptions: { strokeColor: "#1E90FF", strokeWeight: 4 },
          });
      }

      // 마커 생성
      places.forEach((place) => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(place.lat, place.lng),
          map: mapObj,
          title: place.name,
        });

        const infoWindow = new window.naver.maps.InfoWindow({
          content: `<div class="p-2"><strong>${place.name}</strong><br/>${place.category}</div>`,
        });

        window.naver.maps.Event.addListener(marker, "click", () => {
          infoWindow.open(mapObj, marker);
        });
      });

      // 경로 미리보기
      showRoutePreview(mapObj);
    };

    document.head.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  // 미리보기 경로 표시
  const showRoutePreview = (mapObj: any) => {
    if (places.length < 2 || !window.naver.maps.DirectionsService) return;

    const directionsService = window.naver.maps.DirectionsService();
    directionsService.route(
      {
        origin: { lat: places[0].lat, lng: places[0].lng },
        destination: {
          lat: places[places.length - 1].lat,
          lng: places[places.length - 1].lng,
        },
        waypoints: places.slice(1, -1).map((p) => ({ lat: p.lat, lng: p.lng })),
        travelMode: window.naver.maps.TravelMode.DRIVING,
      },
      (status: any, response: any) => {
        if (status !== window.naver.maps.ServiceStatus.OK) return;
        if (directionsRendererRef.current) {
          directionsRendererRef.current.setDirections(response);
        }
      }
    );
  };

  // 길 안내 버튼 클릭
  const handleStartNavigation = () => {
    if (!map || !window.naver.maps.DirectionsService || places.length < 2)
      return;

    const directionsService = window.naver.maps.DirectionsService();
    directionsService.route(
      {
        origin: { lat: places[0].lat, lng: places[0].lng },
        destination: {
          lat: places[places.length - 1].lat,
          lng: places[places.length - 1].lng,
        },
        waypoints: places.slice(1, -1).map((p) => ({ lat: p.lat, lng: p.lng })),
        travelMode: window.naver.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
      },
      (status: any, response: any) => {
        if (status !== window.naver.maps.ServiceStatus.OK) return;
        if (directionsRendererRef.current) {
          directionsRendererRef.current.setDirections(response);
          setRouteShown(true);
        }
      }
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div ref={mapRef} className="w-full h-[500px] rounded-lg shadow-md" />
      <div className="flex flex-col p-2 bg-gray-100 rounded-lg">
        <p className="font-semibold mb-2">추천 경로 예시</p>
        <ol className="list-decimal pl-5 mb-2">
          {places.map((p) => (
            <li key={p.name}>
              {p.name} ({p.category})
            </li>
          ))}
        </ol>
        <button
          onClick={handleStartNavigation}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          경로 안내 시작
        </button>
        {routeShown && <p className="mt-2 text-green-700">길 안내 중...</p>}
      </div>
    </div>
  );
}
