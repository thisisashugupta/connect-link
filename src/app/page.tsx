'use server'

import Image from "next/image";
import Link from "next/link";
import ChooseInterests from "@/components/choose_interests";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import User from "@/app/models/user";
console.log('page rendered');

export default async function Home() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const foundUser = await User.findOne({ email: email });
  console.log('foundUser', foundUser);
  const interests = foundUser?.interests;

  if (!interests || interests.length < 3)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black text-white">
      <ChooseInterests />
    </main>
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Welcome</p>
      <div>
        <p>Your Interests</p>
        {interests.map((interest: string, index: number) => <div key={index + interest} className="list-item">{interest}</div>)}
      </div>
      <Link className="bg-red-500 hover:bg-red-600 focus:bg-red-700 px-4 py-2 rounded-lg text-white font-semibold text-xl" href='/api/auth/signout'>Sign Out</Link>
    </main>
  );
}
