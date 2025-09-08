import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import z from "zod";

import type { Env } from "@/env";


const tokenSchema = z.object({
    sub: z.string(),
})

export type TokenPayload = z.infer<typeof tokenSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService<Env, true>) {
        const publicKey = config.get<string>('JWT_PUBLIC_KEY', { infer: true })
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Buffer.from(publicKey, 'base64').toString('utf-8'),
            algorithms: ['RS256']
        })
    }

    async validate(payload: TokenPayload) {
        return tokenSchema.parse(payload);
    }
}