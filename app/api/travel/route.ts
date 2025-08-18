// import { NextResponse } from "next/server";
// import connectToDatabase from "../../../lib/mongodb";
// import Travel from "../../../lib/models/Travel";

// export async function GET() {
//   await connectToDatabase();
//   const travels = await Travel.find({});
//   return NextResponse.json(travels);
// }

// export async function POST(request: Request) {
//   await connectToDatabase();
//   const data = await request.json();
//   const travel = await Travel.create(data);
//   return NextResponse.json(travel);
// }
