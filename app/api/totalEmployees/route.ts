import clientPromise from "../../../lib/mongodb";
import { Employee } from "../../../types/Employees";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("Employee_Management");

    const employees = await db
      .collection<Employee>("Employees")
      .find({})
      .toArray();

    const leaveEmployees = await db
      .collection<Employee>("LeaveEmployees")
      .find({})
      .toArray();

    // 재직중 사원정보
    const employeesData = employees.map((res) => {
      const { _id, ...rest } = res;
      return rest;
    });

    // 퇴사자 사원정보
    const leaveEmployeesData = leaveEmployees.map((res) => {
      const { _id, ...rest } = res;
      return rest;
    });

    const totalData = {
      employees: employeesData,
      leaveEmployees: leaveEmployeesData,
    };

    return NextResponse.json(totalData);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch data" });
  }
}
