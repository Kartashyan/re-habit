import { User } from "../domain/user";
import { UserModel } from "../domain/user.model";

export class UserMapper {
    static toModel(user: User): UserModel {
        return {
            id: user.id.value,
            email: user.email.value,
            password: user.password.value,
        };
    }
}