import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Navibar from "@/components/Navibar";
import "../styles/globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Employee Management Dashboard",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="ko">
      <body className="bg-white text-gray-900">
        <Providers>
          <Navibar session={session}></Navibar>
          {children}
        </Providers>
      </body>
    </html>
  );
}
