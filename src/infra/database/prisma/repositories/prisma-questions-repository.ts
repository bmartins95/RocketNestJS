
import { Injectable } from "@nestjs/common";

import { PrismaQuestionMapper } from "../mappers/prisma-question-mapper";
import { PrismaService } from "../prisma.service";

import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import type { Question } from '@/domain/forum/enterprise/entities/question'

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
    constructor(private prisma: PrismaService) { }

    async findById(id: string): Promise<Question | null> {
        const question = await this.prisma.question.findUnique({
            where: {
                id
            },
        });

        if (!question) {
            return null;
        }

        return PrismaQuestionMapper.toDomain(question);
    }

    async findBySlug(slug: string): Promise<Question | null> {
        throw new Error("Method not implemented.");
    }

    async findManyRecent(page: PaginationParams): Promise<Question[]> {
        throw new Error("Method not implemented.");
    }

    async save(question: Question): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async create(question: Question): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async delete(question: Question): Promise<void> {
        throw new Error("Method not implemented.");
    }
}