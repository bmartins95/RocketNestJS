import { Module } from "@nestjs/common";

import { PrismaService } from "./prisma/prisma.service";
import { PrismaAnswerAttachmentRepository } from "./prisma/repositories/prisma-answer-attachments";
import { PrismaAnswerCommentsRepository } from "./prisma/repositories/prisma-answer-comments";
import { PrismaAnswerRepository } from "./prisma/repositories/prisma-answers";
import { PrismaQuestionAttachmentRepository } from "./prisma/repositories/prisma-question-attachments";
import { PrismaQuestionsCommentsRepository } from "./prisma/repositories/prisma-question-comments";
import { PrismaQuestionsRepository } from "./prisma/repositories/prisma-questions";


@Module({
    exports: [
        PrismaService,
        PrismaQuestionsRepository,
        PrismaQuestionsCommentsRepository,
        PrismaQuestionAttachmentRepository,
        PrismaAnswerRepository,
        PrismaAnswerCommentsRepository,
        PrismaAnswerAttachmentRepository
    ],
    providers: [
        PrismaService,
        PrismaQuestionsRepository,
        PrismaQuestionsCommentsRepository,
        PrismaQuestionAttachmentRepository,
        PrismaAnswerRepository,
        PrismaAnswerCommentsRepository,
        PrismaAnswerAttachmentRepository
    ],
})
export class DatabaseModule { }