"use client";

import { useEffect, useRef, useState } from "react";

interface MarkerInfo {
  marker: any;
  position: any;
}

export default function NaverMapWithUI() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<MarkerInfo[]>([]);
  const [distance, setDistance] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const directionsRendererRef = useRef<any>(null);
  const clusterRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=directions,markerclusterer`;
    script.async = true;

    script.onload = () => {
      const mapObj = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(37.5665, 126.978),
        zoom: 14,
      });
      setMap(mapObj);

      // 안전하게 DirectionsRenderer 생성
      const interval = setInterval(() => {
        if (window.naver.maps && window.naver.maps.DirectionsRenderer) {
          directionsRendererRef.current =
            new window.naver.maps.DirectionsRenderer({
              map: mapObj,
              preserveViewport: true,
              suppressMarkers: true,
              polylineOptions: { strokeColor: "#1E90FF", strokeWeight: 4 },
            });

          clusterRef.current = new window.naver.maps.MarkerClusterer({
            map: mapObj,
            minClusterSize: 2,
          });

          clearInterval(interval);
        }
      }, 100);

      // 클릭 이벤트
      window.naver.maps.Event.addListener(mapObj, "click", (e: any) => {
        const clickPos = e.coord;
        const existingIndex = markers.findIndex(
          (m) =>
            m.position.lat() === clickPos.lat() &&
            m.position.lng() === clickPos.lng()
        );

        let newMarkers = [...markers];

        if (existingIndex !== -1) {
          newMarkers[existingIndex].marker.setMap(null);
          newMarkers.splice(existingIndex, 1);
        } else {
          const newMarker = new window.naver.maps.Marker({
            position: clickPos,
            map: mapObj,
            title: "선택 위치",
          });
          newMarkers.push({ marker: newMarker, position: clickPos });
        }

        setMarkers(newMarkers);

        // 클러스터 갱신
        if (clusterRef.current) {
          clusterRef.current.clear();
          clusterRef.current.addMarkers(newMarkers.map((m) => m.marker));
        }

        // 경로 표시
        if (newMarkers.length >= 2 && directionsRendererRef.current) {
          const directionsService = new window.naver.maps.DirectionsService();
          directionsService.route(
            {
              origin: newMarkers[0].position,
              destination: newMarkers[newMarkers.length - 1].position,
              travelMode: window.naver.maps.TravelMode.DRIVING,
            },
            (status: any, response: any) => {
              if (status !== window.naver.maps.ServiceStatus.OK) return;
              directionsRendererRef.current.setDirections(response);

              const route = response.routes[0];
              setDistance(route.summary.distance);
              setDuration(route.summary.duration);
            }
          );
        } else if (directionsRendererRef.current) {
          directionsRendererRef.current.setDirections({ routes: [] });
          setDistance(0);
          setDuration(0);
        }
      });
    };

    document.head.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [markers]);

  const handleReset = () => {
    // 마커 제거
    markers.forEach((m) => m.marker.setMap(null));
    setMarkers([]);
    setDistance(0);
    setDuration(0);

    // 클러스터 초기화
    if (clusterRef.current) clusterRef.current.clear();

    // 경로 초기화
    if (directionsRendererRef.current)
      directionsRendererRef.current.setDirections({ routes: [] });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-[500px] rounded-lg shadow-md" ref={mapRef} />
      <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
        <div>
          <p>거리: {distance} m</p>
          <p>예상 소요 시간: {duration} 초</p>
        </div>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleReset}
        >
          지도 초기화
        </button>
      </div>
    </div>
  );
}
