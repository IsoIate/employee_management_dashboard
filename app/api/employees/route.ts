import { WithId } from "mongodb";
import clientPromise from "../../../lib/mongodb";
import { Employee } from "../../../types/Employees";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Employee_Management");

    // 'find' 메소드에 제네릭 타입을 명시하여 반환되는 문서의 타입을 지정
    const employees = await db
      .collection<Employee>("Employees")
      .find({})
      .toArray();

    const data = employees.map((res) => {
      const { _id, ...rest } = res;
      return rest;
    });

    const employeesData = data.filter((e) => !("leaveDate" in e));
    const leaveEmployeesData = data.filter((e) => e.leaveDate);

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

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("Employee_Management");
    const reqData = await req.json();

    const data: WithId<Employee> | null = await db
      .collection<Employee>("Employees")
      .findOne({ id: Number(reqData.id) });

    if (!data) return NextResponse.json({ error: "사원 데이터 조회 실패" });

    const { _id, ...restData } = data;

    return NextResponse.json(restData);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch data" });
  }
}
