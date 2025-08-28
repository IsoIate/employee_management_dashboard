import clientPromise from "@/lib/mongodb";
import { Employee } from "@/types/Employees";
import { WithId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("Employee_Management");
    const reqData = await req.json();
    const id = params.id;

    // const data = await db.collection<Employee>("Employees").updateMany(
    //   {
    //     status: "status_3",
    //   },
    //   {
    //     $set: { status: "status_1" },
    //   }
    // );

    const data = await db.collection<Employee>("LeaveEmployees").updateOne(
      { id: Number(id) },
      {
        $set: {
          name: reqData.data.name,
          email: reqData.data.email,
          department: reqData.data.department,
          position: reqData.data.position,
          gender: reqData.data.gender,
          age: reqData.data.age,
          memo: reqData.data.memo,
          status: reqData.data.status,
          form: reqData.data.form,
          startDate: reqData.data.startDate,
          leaveDate: reqData.data.leaveDate == "" ? "" : reqData.data.leaveDate,
          profileImage: reqData.data.profileImage,
        },
      }
    );

    if (data.acknowledged) return NextResponse.json({ res: true });
    else return NextResponse.json({ res: false });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch data" });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("Employee_Management");
    const id = Number(params.id);

    // 기존 데이터 가져오기
    const prevData = await db
      .collection<Employee>("LeaveEmployees")
      .findOne({ id: id });

    if (!prevData) {
      return NextResponse.json({ res: "해당 사원이 존재하지 않습니다." });
    } else {
      // 퇴직날짜 초기화
      prevData.leaveDate = "";
      prevData.status = "status_1";
    }

    // 재직사원 테이블에 저장
    const insertData = await db
      .collection<Employee>("Employees")
      .insertOne(prevData);

    // 퇴직사원 테이블에서 제거
    const deleteData = await db
      .collection<Employee>("LeaveEmployees")
      .deleteOne({ id: id });

    if (insertData.acknowledged && deleteData.acknowledged)
      return NextResponse.json({
        result: true,
        message: "성공적으로 복직처리 되었습니다.",
      });
    else
      return NextResponse.json({
        result: false,
        message: "데이터 이동중 문제가 발생했습니다.",
      });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch data" });
  }
}
