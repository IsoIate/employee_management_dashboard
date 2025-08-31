import clientPromise from "@/lib/mongodb";
import { Employee } from "@/types/Employees";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("Employee_Management");
    const reqData = await req.json();
    const id = reqData.newId;

    reqData.data.id = id;

    const data = await db
      .collection<Employee>("Employees")
      .insertOne(reqData.data);

    if (data.acknowledged) return NextResponse.json({ res: true });
    else 
      return NextResponse.json({ res: false });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch data" });
  }
}
