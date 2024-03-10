import { withAuth } from "next-auth/middleware"

const BASE_URL = process.env.NEXTAUTH_URL!

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  {
    callbacks: {
      // this function will be called only if the user is authenticated
      authorized: async ({ token }) => {
        if (!token) return false;

        const user = await fetch(`${BASE_URL}/api/users/?email=${token?.email}`, { cache: 'no-store' });
        const response = await user.json();

        if(response.Users.length === 0 || response.Users[0]?.email !== token?.email) {

          const newUser = await fetch(`${BASE_URL}/api/users`, { method: 'POST', body: JSON.stringify({ formData: { email: token?.email, name: token?.name, image: token?.image } }) });
          await newUser.json();
          console.log('new user added');
          
        }
        
        return token?.email !== undefined
      },
    },
  }
)

export const config = { matcher: ["/"] }

// export { default } from 'next-auth/middleware';