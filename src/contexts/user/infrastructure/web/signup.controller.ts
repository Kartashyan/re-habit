import { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
    const body = new URLSearchParams(await request.text());
    const email = body.get("email");
    const password = body.get("password");

    if (!email || !password) {
        return new Response("Email and password are required", {
            status: 400,
        });
    }

    return new Response("Sign in successful", {
        status: 200,
    });
}

