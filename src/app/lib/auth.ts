import {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                if (credentials?.email === "admin@example.com" &&
                    credentials?.password === "admin123") {
                    return {
                        id: "1",
                        email: credentials.email,
                        name: "Admin"
                    };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error'
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({session, token}) {
            if (token && session.user) {
                session.user.id = token.sub!;
            }
            return session;
        },
    },
};
