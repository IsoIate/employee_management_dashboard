import dbConnect from "@/lib/mongodb";
import Employee from "@/models/employee";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const employees = await Employee.find({});
    return NextResponse.json({ success: true, data: employees });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
