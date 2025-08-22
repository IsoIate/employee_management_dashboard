/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // 이 부분을 추가
  },
  plugins: [],
};
