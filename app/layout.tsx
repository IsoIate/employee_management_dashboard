import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "Travel Planner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
