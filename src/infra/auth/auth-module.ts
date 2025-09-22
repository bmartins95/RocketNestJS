import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";



import { EnvService } from "../env-service";

import { JwtAuthGuard } from "./jwt-auth-guard";
import { JwtStrategy } from "./jwt-strategy";


@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            inject: [EnvService],
            useFactory(env: EnvService) {
                const privateKey = env.get('JWT_PRIVATE_KEY')
                const publicKey = env.get('JWT_PUBLIC_KEY')
                return {
                    privateKey: Buffer.from(privateKey, 'base64').toString('utf-8'),
                    publicKey: Buffer.from(publicKey, 'base64').toString('utf-8'),
                    signOptions: { algorithm: 'RS256' }
                }
            }
        })
    ],
    exports: [JwtModule],
    providers: [
        JwtStrategy,
        { provide: APP_GUARD, useClass: JwtAuthGuard }
    ]
})
export class AuthModule { }