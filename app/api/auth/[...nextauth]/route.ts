import clientPromise from "@/lib/mongodb";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // 로그인페이지 폼 생성
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      // 로그인 요청시 실행되는코드
      async authorize(credentials, req) {
        if (!credentials) return null;

        let db = (await clientPromise).db("Employee_Management");
        let user = await db
          .collection("User")
          .findOne({ email: credentials.email });
        if (!user) {
          console.log("존재하지 않는 이메일입니다.");
          return null;
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!pwcheck) {
          console.log("아이디 또는 비번번호가 틀립니다.");
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1일
    updateAge: 60 * 60 * 12
  },
  jwt: {
    maxAge: 60 * 60 * 24
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
