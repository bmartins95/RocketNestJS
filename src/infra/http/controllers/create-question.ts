import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import z from "zod";

import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { JwtAuthGuard } from "@/infra/auth/jwt-auth-guard";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation";

import type { TokenPayload } from "@/infra/auth/jwt-strategy";

const createQuestionBodySchema = z.object({
    title: z.string(),
    content: z.string(),
});

type CreateQuestionBody = z.infer<typeof createQuestionBodySchema>;

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
    constructor(private service: CreateQuestionUseCase) { }

    @Post()
    async handle(
        @CurrentUser() user: TokenPayload,
        @Body(new ZodValidationPipe(createQuestionBodySchema)) body: CreateQuestionBody
    ) {
        const { title, content } = body;
        await this.service.execute({
            authorId: user.sub,
            title,
            content,
            attachmentsIds: [],
        });
    }
}