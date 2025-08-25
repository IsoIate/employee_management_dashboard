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

    // const data = await db.collection<Employee>("Employees").deleteMany();

    const data = await db.collection<Employee>("Employees").updateOne(
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
