import mongoose from "mongoose";
import Counter from "./Counter";

const EmployeeSchema = new mongoose.Schema({
  employeeId: {
    type: Number,
    required: [true],
    unique: [true],
  },
  name: {
    type: String,
    required: [true, "이름은 필수 입력값 입니다."],
    maxlength: [10, "정상적인 이름을 작성해 주세요."],
  },
  email: {
    type: String,
    required: [false],
  },
  department: {
    type: String,
    required: [true, "부서명을 입력해 주세요."],
  },
  position: {
    type: String,
    required: [true, "담당업무를 입력해 주세요."],
  },
  gender: {
    type: String,
    required: [true, "성별을 입력해 주세요."],
  },
  age: {
    type: Number,
    required: [true, "나이를 입력해 주세요."],
  },
  startDate: {
    type: Date,
    required: [true, ""],
    default: Date.now,
  },
  leaveDate: {
    type: Date,
    required: [false],
  },
  profileImage: {
    type: String,
    required: [false],
  },
});

EmployeeSchema.pre("save", async function (next) {
  if (this.isNew) {
    // 새로운 문서를 저장할 때만 실행
    const counter = await Counter.findByIdAndUpdate(
      { _id: "employeeId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.employeeId = counter.seq;
  }
  next();
});

export default mongoose.models.User ||
  mongoose.model("Employee", EmployeeSchema);
