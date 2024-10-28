import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import { AuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';


const prisma = new PrismaClient()



export const authOptions: AuthOptions = ({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider
      ({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'text' },
          password: { label: 'Password', type: 'password' }
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
          }
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error("User not found");
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          if (!isCorrectPassword) {
            throw new Error("Invalid password");
          }
          return user;
        },
      })
  ],
  pages: {
    signIn: '/signin',
    signOut: '/'
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    }
  }
});