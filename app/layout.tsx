import Navibar from "@/components/Navibar";
import "../styles/globals.css";

export const metadata = {
  title: "Employee Management Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-white text-gray-900">
        <Navibar></Navibar>
        {children}
      </body>
    </html>
  );
}
