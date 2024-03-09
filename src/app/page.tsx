'use server'

import Image from "next/image";
import Link from "next/link";
import ChooseInterests from "@/components/choose_interests";

let firstLogin = true;
console.log('firstLogin', firstLogin, Math.random());

export async function changeFirstLogin() {
  firstLogin = false;
  console.log('firstLogin changed');
}

console.log('page rendered');


export default async function Home() {

  if (firstLogin) return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black text-white">
      <ChooseInterests />
    </main>
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Welcome</p>
      <Link className="bg-red-500 hover:bg-red-600 focus:bg-red-700 px-4 py-2 rounded-lg text-white font-semibold text-xl" href='/api/auth/signout'>Sign Out</Link>
    </main>
  );
}
