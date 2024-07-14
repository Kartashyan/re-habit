import { ActionFunction } from "@remix-run/node";
import { action as signInController } from "~/contexts/user/infrastructure/web/signin.controller";

export const action: ActionFunction = signInController;

export default function Login() {

    return (
        <div className="flex justify-center items-center">
            <h1 className="text-2xl">Login</h1>
            <form className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
                <button type="submit">Login</button>

                <a href="/signup">Sign up</a>
            </form>
        </div>
    );
}