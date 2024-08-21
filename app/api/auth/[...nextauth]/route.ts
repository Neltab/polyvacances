'use server'

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getUser } from "../user/Providers/server"
import bcrypt from "bcryptjs";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log(url, baseUrl)
      return baseUrl
    },
    async session({ session, token, user }) {
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
  },

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", },
        password: { label: "Mot de passe", type: "password" }
      },
      
      async authorize(credentials) {
        if(!credentials) {
          return null;
        }

        const user = await getUser(credentials.email)

        if(!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password)

        if (!passwordMatch) {
          return null;
        }

        return {
          ...user,
          id: user.id.toString(),
        }
      },
    })
  ],
})

export { handler as GET, handler as POST }