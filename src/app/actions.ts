"use server"
import User from "@/app/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

async function serverAction(interests: string[]) {

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    console.log("User Interests:", interests);

    if (interests.length >= 3) {
        const updatedUserData = await User.findOneAndUpdate(
            { email: email }, // Filter criteria
            { interests: interests }, // Updated data
            { new: true } // Return the updated document
        )
        console.log("Updated User Data:", updatedUserData);        
        return { saved: true, interests };
    }

    return { saved: false, interests };
}

export { serverAction };