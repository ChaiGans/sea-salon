import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Session, User } from "next-auth";
import { db } from "@/lib/db";
import { compare } from "bcrypt";

// Extend the User type to include the role
interface ExtendedUser extends User {
  role: string; // Assume role is mandatory for all users
}

// Extend the Session type to include the extended user and any other properties
export interface ExtendedSession extends Session {
  user: ExtendedUser;
}

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      profile(profile: any) {
        console.log("Profile github : ", profile);

        let userRole = "Github User";
        if (profile?.email === ("elbertchailes888@gmail.com" || "thomas.n@compfest.id")) {
          userRole = "admin";
        }

        return {
          id: String(profile.id),
          ...profile,
          role: userRole,
        } as ExtendedUser;
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: `${existingUser.id}`,
          username: existingUser.full_name,
          role: `${existingUser.role === "ADMIN" ? "admin" : "user"}`,
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session?.user as ExtendedUser) {
        session.user.role = token.role;
        return session as ExtendedSession;
      }
      return session as ExtendedSession;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
