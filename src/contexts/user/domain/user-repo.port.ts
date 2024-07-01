import { User } from "./user";

export interface UserRepository {
    findByEmail: (email: string) => Promise<User | null>;
    save: (user: User) => Promise<void>;
    exists(email: string): Promise<boolean>;
}