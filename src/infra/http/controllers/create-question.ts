import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import z from "zod";

import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { JwtAuthGuard } from "@/infra/auth/jwt-auth-guard";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation";
import { PrismaService } from "@/infra/prisma/prisma.service";

import type { TokenPayload } from "@/infra/auth/jwt-strategy";

const createQuestionBodySchema = z.object({
    title: z.string(),
    content: z.string(),
});

type CreateQuestionBody = z.infer<typeof createQuestionBodySchema>;

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
    constructor(private prisma: PrismaService) { }

    @Post()
    async handle(
        @CurrentUser() user: TokenPayload,
        @Body(new ZodValidationPipe(createQuestionBodySchema)) body: CreateQuestionBody
    ) {
        const { title, content } = body;
        await this.prisma.question.create({
            data: {
                title,
                content,
                authorId: user.sub,
                slug: this.toSlug(title),
            }
        });
    }

    private toSlug(title: string): string {
        return title
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    }
}