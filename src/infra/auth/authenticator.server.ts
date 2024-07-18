import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { Password } from "~/contexts/user/domain/password.value-object";
import { UserModel } from "~/contexts/user/domain/user.model";
import { userService } from "~/contexts/user/user.service.injection";
import { sessionStorage } from "~/infra/storage.server";

export const EMAIL_PASSWORD_STRATEGY = "email-password-strategy";

export const authenticator = new Authenticator<UserModel>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ context }) => {
    if (!context?.formData) {
      throw new Error("FormData must be provided in the Context");
    }

    const formData = context.formData as FormData;

    const email = formData.get("email");
    const password = formData.get("password");

    const result = await userService.findUserByEmail(String(email));

    if (!result.success) {
      throw new Error("Failed to authenticate user");
    }

    const user = result.value;

    if (!user.comparePassword(Password.create(String(password)))) {
      throw new Error("Failed to authenticate user");
    }

    return { email: user.email.value, id: user.id.value };
  }),
  EMAIL_PASSWORD_STRATEGY
);