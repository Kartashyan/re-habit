import { UserService } from "../user/user.service.injection";
import { JwtService } from "./jwt.service";

export class AuthService {
    private readonly userService: UserService;
    private readonly jwtService: JwtService;
    constructor(){
        this.userService = new UserService();
        this.jwtService = new JwtService(process.env.JWT_SECRET || '');
    }


}