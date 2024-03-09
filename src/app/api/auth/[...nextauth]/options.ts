// import { NextAuthOptions } from "next-auth";
import LinkedInProvider, { LinkedInProfile } from "next-auth/providers/linkedin";
// import { prisma } from "@/app/providers/PrismaProvider";
// import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
// const prisma = getPrismaClient();

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID || "",
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
            authorization: {
                params: { 
                    scope: "openid profile email",
                },
            },
            issuer: "https://www.linkedin.com",
            profile: (profile: LinkedInProfile) => ({
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
            }),
            wellKnown: "https://www.linkedin.com/oauth/.well-known/openid-configuration",
          }),
      // ...add more providers here
    ],
    secret: process.env.NEXTAUTH_SECRET!,
    callbacks: {
        // async jwt({ token, user }) {
            // if(user) {
                // console.log("JWT User", user);
                // console.log("JWT Token", token);
                // token.role = user.role;
            // }
            // return token;
        // },
        // async session({ session, token }) {
            // if (session?.user) {
                // console.log("Session", session);
                // console.log("Session.User", session.user);
                // console.log("Session Token", token);
                // session.user.role = token.role;
            // }
            // return session;
        // },
        // Use the signIn() callback to control if a user is allowed to sign in
        async signIn() {    // following will execute after user sign in

            // Save user data to the database
            // if(user.email && user.name) {
                // await prisma.user.upsert({
                    // where: { email: user.email },
                    // update: { name: user.name },
                    // create: { email: user.email, name: user.name },
                // });
                // await cleanup();
            // }
            console.log("Sign In Callback");
            
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
              return true
            } else {
              // Return false to display a default error message (can use to blocklist some emails)
              return false
              // Or you can return a URL to redirect to:
              // return '/unauthorized'
            }
        },
    },
  }
