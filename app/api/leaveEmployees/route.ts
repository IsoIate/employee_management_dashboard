import clientPromise from "../../../lib/mongodb";
import { Employee } from "../../../types/Employees";
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
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
}
