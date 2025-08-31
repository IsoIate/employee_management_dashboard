import clientPromise from "../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Employee_Management");
    const userData = await db.collection("User").find({}).toArray();

    // id, pw 제거 후 반환
    const filteredData = userData.map(({ _id, password, ...rest }) => rest);

    return NextResponse.json({
      filteredData,
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("Employee_Management");
    const reqData = await req.json();
    const data = reqData.data;

    const result = await db.collection("User").updateOne(
      { email: data.email },
      {
        $set: {
          role: data.role,
        },
      }
    );

    if (result.acknowledged) return NextResponse.json(true);
    else return NextResponse.json(false);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
}
