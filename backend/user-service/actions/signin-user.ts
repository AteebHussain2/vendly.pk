type TypeUser = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    username: string
}

export async function signIn(req: Request) {
    const { firstName, lastName, email, password, username }: TypeUser = await req.body?.json();

    if (!firstName || !email || !password || !username) return Response.json({ status: 415, message: "Invalid inputs!" });

    const password_hash = password;

    const user = await {
        firstName,
        lastName,
        username,
        email,
        password_hash,
    };    

    return Response.json({ status: 200, message: "Request received!" });
}