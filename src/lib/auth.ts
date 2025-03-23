import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import db from "../../prisma/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      try {
        if (!user.email || !user.name) {
          return false;
        }

        const existingUser = await db.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          await db.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image ?? "",
            },
          });
        }
        return true;
      } catch (error) {
        return false;
      }
    },
  },
});
