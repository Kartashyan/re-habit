import { User } from "./domain/user";
import { UserModel } from "./domain/user.model";

interface UserService {
    findByEmail: (email: string) => Promise<UserModel | null>;
    save: (user: User) => Promise<void>;
    exists(email: string): Promise<boolean>;
}

export {type UserService as UserServiceInterface};