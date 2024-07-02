import { User } from "./domain/user";

interface UserService {
    findByEmail: (email: string) => Promise<User | null>;
    save: (user: User) => Promise<void>;
    exists(email: string): Promise<boolean>;
}

export {type UserService as UserServiceInterface};