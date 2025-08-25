import { WithId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";
import { Employee } from "../../../../types/Employees";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("Employee_Management");
    const employeesCollection = db.collection("LeaveEmployees");
    const defaultPaging = 12;

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || `${defaultPaging}`, 10);
    const skip = (page - 1) * limit;

    // 3. 전체 문서 수와 페이지네이션된 데이터 동시 가져오기
    const [totalEmployees, employees] = await Promise.all([
      employeesCollection.countDocuments(),
      employeesCollection.find({}).skip(skip).limit(limit).toArray(),
    ]);

    // 4. 전체 페이지 수 계산
    const totalPages = Math.ceil(totalEmployees / limit);

    // 5. 클라이언트에 응답 전송
    return NextResponse.json({
      employees,
      currentPage: page,
      totalPages,
      itemsPerPage: limit,
      totalItems: totalEmployees,
    });

    // const employees = await db
    //   .collection<Employee>("Employees")
    //   .find({})
    //   .toArray();

    // const data = employees.map((res) => {
    //   const { _id, ...rest } = res;
    //   return rest;
    // });

    // const employeesData = data.filter((e) => !e.leaveDate);
    // const leaveEmployeesData = data.filter((e) => e.leaveDate);

    // const totalData = {
    //   employees: employeesData,
    //   leaveEmployees: leaveEmployeesData,
    // };

    // return NextResponse.json(totalData);
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
