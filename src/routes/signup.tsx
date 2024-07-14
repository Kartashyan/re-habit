import { ActionFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { action as signupController } from "~/contexts/user/infrastructure/web/signup.controller";
import { Button } from "~/shared/ui-lib/button";
import { Input } from "~/shared/ui-lib/input";

export const action: ActionFunction = signupController;

export default function Signup() {
    return (
        <section className="flex h-screen flex-col justify-center items-center">
            <div className="h-72 flex flex-col gap-y-1">
                <h1 className="text-2xl bg-slate-500">Signup</h1>
                <form className="flex flex-col gap-y-1">
                    <Input type="email" id="email" name="email" placeholder="Email" />
                    <Input type="password" id="password" name="password" placeholder="Password" />
                    <Button type="submit">Signup</Button>
                    <p>Already have an account?</p>
                    <p>Go to</p>
                    <Button asChild>
                        <Link to="/login">Login</Link>
                    </Button>
                </form>
            </div>
        </section>
    );
}
