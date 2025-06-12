import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import { usuario_admin } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@site.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        // Buscar usuario en la base de datos
        let user = await db.select().from(usuario_admin).where(eq(usuario_admin.email, credentials.email)).then(res => res[0]);
        // Si no existe, crear el usuario admin demo
        if (!user && credentials.email === 'gxbo2012@gmail.com') {
          const inserted = await db.insert(usuario_admin).values({ email: 'gxbo2012@gmail.com', password: 'Maria.2017' }).returning();
          user = inserted[0];
        }
        if (user && user.password === credentials.password) {
          return { id: String(user.id), email: user.email };
        }
        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' as const },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 