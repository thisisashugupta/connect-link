"use server"

const userInterests : string[] = [];

async function serverAction(interests: string[]) {

    console.log("User Interests:", interests);

    if (interests.length >= 3) {
        userInterests.push(...interests);
        return { saved: true, userInterests };
    }

    return { saved: false, userInterests };
}

export { serverAction };