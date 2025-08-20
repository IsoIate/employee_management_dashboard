// app/api/ev/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import xml2js from "xml2js";

export async function GET(req: NextRequest) {
  try {
    let addr = "인천광역시 미추홀구";
    // const apiUrl = `http://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=${process.env.NEXT_PUBLIC_EV_API_ID}&numOfRows=10&pageNo=1&dataType=XML`;
    const apiUrl = `http://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=${process.env.NEXT_PUBLIC_EV_API_ID}&addr=${addr}&numOfRows=10&pageNo=1&dataType=XML`;

    const res = await axios.get(apiUrl);
    const xmlData = res.data;
    console.log(xmlData.items[0].item);
    const items = JSON.stringify(xmlData.items[0].item);

    return NextResponse.json(items);
    // return NextResponse.json({ items });
  } catch (err) {
    return NextResponse.json(
      { error: "API 호출 실패", details: err },
      { status: 500 }
    );
  }
}
