import { Password } from "../../domain/password.value-object";
import * as bcrypt from 'bcrypt';


export class PasswordService {
    public static hash(password: Password): string {
        return bcrypt.hashSync(password.value, bcrypt.genSaltSync());
    }

    public static compare(password: Password, hash: string): boolean {
        return bcrypt.compareSync(password.value, hash);
    }
}