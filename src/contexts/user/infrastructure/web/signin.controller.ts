import { ActionFunction } from "@remix-run/node";
import { UserService } from "../../user.service.injection";

export const action: ActionFunction = async ({ request }) => {
    const body = new URLSearchParams(await request.text());
    const email = body.get("email");
    const password = body.get("password");

    if (!email || !password) {
        return new Response("Email and password are required", {
            status: 400,
        });
    }

    const userService = new UserService();

    return new Response("Sign in successful", {
        status: 200,
    });
}