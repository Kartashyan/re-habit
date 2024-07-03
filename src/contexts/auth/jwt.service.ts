import jwt from 'jsonwebtoken';



export class JwtService {
    constructor(private secret: string) {
        if (!secret) {
            throw new Error('Secret is required');
        }
    }

    public generateToken(payload: any): string {
        return jwt.sign(payload, this.secret);
    }

    public verifyToken(token: string): any {
        return jwt.verify(token, this.secret);
    }
}