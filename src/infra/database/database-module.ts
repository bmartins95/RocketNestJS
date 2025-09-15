import { Module } from "@nestjs/common";

import { PrismaService } from "./prisma/prisma.service";
import { PrismaAnswerAttachmentRepository } from "./prisma/repositories/prisma-answer-attachments-repository";
import { PrismaAnswerCommentsRepository } from "./prisma/repositories/prisma-answer-comments-repository";
import { PrismaAnswerRepository } from "./prisma/repositories/prisma-answers-repository";
import { PrismaQuestionAttachmentRepository } from "./prisma/repositories/prisma-question-attachments-repository";
import { PrismaQuestionsCommentsRepository } from "./prisma/repositories/prisma-question-comments-repository";
import { PrismaQuestionsRepository } from "./prisma/repositories/prisma-questions-repository";


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