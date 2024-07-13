import jwt, { JwtPayload } from 'jsonwebtoken';



export class JwtService {
    constructor(private secret: string) {
        if (!secret) {
            throw new Error('Secret is required');
        }
    }

    public generateToken(payload: JwtPayload | string): string {
        return jwt.sign(payload, this.secret);
    }

    public verifyToken(token: string): JwtPayload | string {
        return jwt.verify(token, this.secret);
    }
}