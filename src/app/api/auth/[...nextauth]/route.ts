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
        try {
          console.log('[AUTH] Login attempt for:', credentials?.email);

          if (!credentials?.email || !credentials?.password) {
            console.log('[AUTH] Missing credentials');
            return null;
          }

          // Buscar usuario en la base de datos
          console.log('[AUTH] Searching for user in database...');
          let user = await db.select().from(usuario_admin).where(eq(usuario_admin.email, credentials.email)).then(res => res[0]);

          // Si no existe, crear el usuario admin demo
          if (!user && credentials.email === 'gxbo2012@gmail.com') {
            console.log('[AUTH] User not found, creating admin user...');
            try {
              const inserted = await db.insert(usuario_admin).values({
                email: 'gxbo2012@gmail.com',
                password: 'Maria.2017'
              }).returning();
              user = inserted[0];
              console.log('[AUTH] Admin user created successfully');
            } catch (insertError) {
              console.error('[AUTH] Error creating user:', insertError);
              return null;
            }
          }

          if (!user) {
            console.log('[AUTH] User not found:', credentials.email);
            return null;
          }

          console.log('[AUTH] User found, verifying password...');
          if (user.password === credentials.password) {
            console.log('[AUTH] Login successful for:', user.email);
            return { id: String(user.id), email: user.email };
          }

          console.log('[AUTH] Invalid password for:', credentials.email);
          return null;
        } catch (error) {
          console.error('[AUTH] Error during authentication:', error);
          return null;
        }
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