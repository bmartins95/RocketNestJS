import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import z from "zod";

import { JwtAuthGuard } from "@/infra/auth/jwt-auth-guard";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation";
import { PrismaService } from "@/infra/database/prisma/prisma.service";

const pageQueryParamSchema = z
    .string()
    .optional()
    .default('1')
    .transform((Number))
    .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)
type PageQueryParam = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
    constructor(private prisma: PrismaService) { }

    @Get()
    async handle(@Query('page', queryValidationPipe) page: PageQueryParam) {
        const questions = await this.prisma.question.findMany({
            take: 20,
            skip: (page - 1) * 20,
            orderBy: {
                createdAt: 'desc',
            },
        });

        return { questions };
    }
}