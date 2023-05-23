import NextAuth from 'next-auth';
// Providers
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
// Prisma Adapter
import { PrismaAdapter } from '@next-auth/prisma-adapter';
// Prisma Functions
import prisma from '@/utils/prisma/prismadb';
import FindByUniqueData from '@/utils/prisma/crud';
// bcrypt
import bcrypt from 'bcryptjs';
// Auth Options Typescript
import { AuthOptions } from '@/utils/types';
// Custom Functions
import ValidateEnv from '@/utils/validateEnv';

export const authOptions:AuthOptions = ({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: ValidateEnv(process.env.GITHUB_ID),
      clientSecret: ValidateEnv(process.env.GITHUB_SECRET),
    }),
    GoogleProvider({
      clientId: ValidateEnv(process.env.GOOGLE_CLIENT_ID),
      clientSecret: ValidateEnv(process.env.GOOGLE_CLIENT_SECRET),
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "email", type: "text"},
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const credential:Record<"email" | "password", string> | undefined = credentials;

        if (!credential?.email || !credential?.password) {
          throw new Error('Email and password required');
        }

        const user = await prisma.user.findUnique({where: {email: credential?.email}});

        // const user = await FindByUniqueData('User', {
        //   email: credential?.email,
        // });

        console.log(user)
        if (!user) throw new Error("User doesn't exist");
        if (!user?.verified) throw new Error('Please verify your email address');

        const isCorrectPassword:boolean = await bcrypt.compare(
          credential.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error('Incorrect password or email address');
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  debug: ValidateEnv(process.env.NODE_ENV) === 'development',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    // jwt fonksiyonu ile kullanıcı giriş yaptıktan sonra giriş yapan kullanıcının bilgilerini token değişkenine atıyoruz.
    // bu bilgileri session fonksiyonunda kullanacağız.
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    // session fonksiyonu ile kullanıcı giriş yaptıktan sonra giriş yapan kullanıcının bilgilerini session değişkenine atıyoruz.
    async session({ session, token }:any) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export default NextAuth(authOptions)