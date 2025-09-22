import { BadRequestException, Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { z } from "zod";

import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/authenticate-student";
import { WrongCredentialsError } from "@/domain/forum/application/use-cases/errors/wrong-credentials-error";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation";

const authenticationBodySchema = z.object({
    email: z.email(),
    password: z.string(),
});

type AuthenticationBody = z.infer<typeof authenticationBodySchema>;

@Controller('/sessions')
@UsePipes(new ZodValidationPipe(authenticationBodySchema))
export class AuthenticationController {
    constructor(
        private authenticateStudent: AuthenticateStudentUseCase
    ) { }

    @Post()
    async handle(@Body() body: AuthenticationBody) {
        const { email, password } = body;

        const result = await this.authenticateStudent.execute({
            email,
            password
        });

        if (result.isLeft()) {
            const error = result.value;

            switch (error.constructor) {
                case WrongCredentialsError:
                    throw new UnauthorizedException(error.message);
                default:
                    throw new BadRequestException(error.message);
            }
        }

        return {
            access_token: result.value.accessToken,
        };
    }
}