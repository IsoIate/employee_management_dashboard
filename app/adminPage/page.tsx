export default function adminPage() {
  return (
    <>
      <div className="min-h-screen p-4 sm:p-8 bg-gray-100 ">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl ">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center ">
            정보
          </h1>

          <form className="space-y-6">
            {/* 프로필 이미지 */}

            <div className="flex flex-col items-center space-y-4 mb-20">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 "></div>
              <label className="bg-blue-400 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500">
                이미지 변경
                <input type="file" className="hidden" />
              </label>
            </div>

            <h5 className="mb-2 text-gray-700"> 개인정보 </h5>
            <hr className="mb-5 border-gray-400" />

            {/* 이름, 사원번호 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  이름
                </label>
                <input type="text" name="name" className="form-control" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  사원번호
                </label>
                <input
                  type="text"
                  name="id"
                  className="form-control bg-gray-300 pointer-events-none"
                  readOnly
                />
              </div>
            </div>

            {/* 나이, 성별, 이메일 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    나이
                  </label>
                  <input type="number" name="age" className="form-control" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    성별
                  </label>
                  <div className="flex flex-row gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="male"
                        name="gender"
                        value="Male"
                      />
                      <label htmlFor="male" className="form-check-label">
                        남성
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="female"
                        name="gender"
                        value="Female"
                      />
                      <label htmlFor="female" className="form-check-label">
                        여성
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  이메일
                </label>
                <input type="email" name="email" className="form-control" />
                <div className={`alert alert-warning mt-2 `} role="alert">
                  <p className="m-0"> 이메일 주소를 확인해주세요. </p>
                </div>
              </div>
            </div>

            <h5 className="mb-2 text-gray-700"> 직원정보 </h5>
            <hr className="mb-5 border-gray-400" />

            {/* 부서, 직책 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  부서
                </label>
                <input type="text" name="department" className="form-control" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  직급
                </label>
                <input
                  type="text"
                  name="position"
                  className="form-control w-full"
                />
              </div>
            </div>

            {/* 입사, 퇴사일 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  입사일
                </label>
                <input type="date" name="startDate" className="form-control" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  퇴사일
                </label>
                <input
                  type="date"
                  name="leaveDate"
                  className="form-control bg-gray-300 pointer-events-none"
                  readOnly
                />
              </div>
            </div>

            {/* 메모 */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  메모
                </label>
                <textarea
                  className="form-control resize-none w-full h-40"
                  name="memo"
                ></textarea>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-400 text-white rounded-md border-none hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
