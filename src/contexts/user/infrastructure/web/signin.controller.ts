import { ActionFunction } from "@remix-run/node";
import { authenticator, EMAIL_PASSWORD_STRATEGY } from "~/infra/auth/authenticator.server";

export const action: ActionFunction = async ({ request }) => {
    return await authenticator.authenticate(EMAIL_PASSWORD_STRATEGY, request, {
        successRedirect: "/app",
        failureRedirect: "/login",
      });
}