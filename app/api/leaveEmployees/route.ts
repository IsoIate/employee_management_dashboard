import { WithId } from "mongodb";
import clientPromise from "../../../lib/mongodb";
import { Employee } from "../../../types/Employees";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Employee_Management");
    
    const employees = await db
      .collection<Employee>("LeaveEmployees")
      .find({})
      .toArray();

    return NextResponse.json({
      employees,
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
}

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("Employee_Management");
    const reqData = await req.json();
    const data: WithId<Employee> | null = await db
      .collection<Employee>("LeaveEmployees")
      .findOne({ id: Number(reqData.id) });

    if (!data) return NextResponse.json({ error: "사원 데이터 조회 실패" });

    const { _id, ...restData } = data;

    return NextResponse.json(restData);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch data" });
  }
}
