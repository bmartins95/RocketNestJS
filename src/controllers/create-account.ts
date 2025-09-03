import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { hash } from "bcryptjs";
import { z } from "zod";

import { ZodValidationPipe } from "src/pipes/zod-validation";
import { PrismaService } from "src/prisma/prisma.service";

const createAccountBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
});

type CreateAccountBody = z.infer<typeof createAccountBodySchema>;

@Controller('/accounts')
@UsePipes(new ZodValidationPipe(createAccountBodySchema))
export class CreateAccountController {
    constructor(private prisma: PrismaService) { }

    @Post()
    async handle(@Body() body: CreateAccountBody) {
        const { name, email, password } = body;

        const userWithSameEmail = await this.prisma.user.findUnique({
            where: {
                email,
            }
        });
        if (userWithSameEmail) {
            return {
                statusCode: 409,
                message: 'Email already in use.',
            }
        }

        const hashedPassword = await hash(password, 10);
        await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });
    }
}