import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common";
import { z } from "zod";

import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ZodValidationPipe } from "src/pipes/zod-validation";
import { PrismaService } from "src/prisma/prisma.service";

const createQuestionBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
});

type CreateQuestionBody = z.infer<typeof createQuestionBodySchema>;

@Controller('/questions')
@UseGuards(JwtAuthGuard)
@UsePipes(new ZodValidationPipe(createQuestionBodySchema))
export class CreateQuestionController {
    constructor(private prisma: PrismaService) { }

    @Post()
    async handle(@Body() body: CreateQuestionBody) {
        const { name, email, password } = body;
    }
}