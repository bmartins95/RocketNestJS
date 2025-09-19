import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { z } from "zod";

import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/authenticate-student";
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
            throw new Error(result.value.message);
        }

        return {
            access_token: result.value.accessToken,
        };
    }
}