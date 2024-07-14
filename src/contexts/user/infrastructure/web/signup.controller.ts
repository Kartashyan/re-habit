import { ActionFunction, redirect } from "@remix-run/node";
import { UserService } from "../../user.service.injection";

export const action: ActionFunction = async ({ request }) => {
    const body = new URLSearchParams(await request.text());
    const email = body.get("email");
    const password = body.get("password");
    if (!email || !password) {
        return new Response(JSON.stringify({errors: {
            text: "Email and password are required",
        
        }}), {
            headers: {
              "Content-Type": "application/json; utf-8",
            },
          });
    }
    const userService = new UserService();
    await userService.signup({ email, password });

    return redirect("/login");
}

