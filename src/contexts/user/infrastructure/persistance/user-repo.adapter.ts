import { User } from "../../domain/user.aggregate";
import { UserRepository } from "../../domain/user-repo.port";

export class UserLocalMemoryRepositoryAdapter implements UserRepository {
    private users: User[] = [];

    async save(user: User): Promise<void> {
        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find((user) => user.email.value === email) || null;
    }

    async exists(email: string): Promise<boolean> {
        return !!this.users.find((user) => user.email.value === email);
    }
}