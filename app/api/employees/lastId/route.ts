import clientPromise from "../../../../lib/mongodb";
import { Employee } from "../../../../types/Employees";
import {  NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Employee_Management");

    const lastId = await db
      .collection<Employee>("Employees")
      .findOne({}, { sort: { id: -1 } });

    return NextResponse.json({ id: lastId?.id });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
}
