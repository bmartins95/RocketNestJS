import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

import type { Question as PrismaQuestion, Prisma } from "@prisma/client";

export class PrismaQuestionMapper {
    static toDomain(raw: PrismaQuestion): Question {
        return Question.create(
            {
                title: raw.title,
                content: raw.content,
                slug: Slug.create(raw.slug),
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt,
                authorId: new UniqueEntityID(raw.authorId),
                bestAnswerId: raw.bestAnswerId ? new UniqueEntityID(raw.bestAnswerId) : null,
            },
            new UniqueEntityID(raw.id)
        );
    }

    static toPrisma(question: Question): Prisma.QuestionUncheckedCreateInput {
        return {
            id: question.id.toString(),
            authorId: question.authorId.toString(),
            bestAnswerId: question.bestAnswerId?.toString() ?? null,
            content: question.content,
            title: question.title,
            slug: question.slug.value,
            createdAt: question.createdAt,
            updatedAt: question?.updatedAt ?? undefined,
        }
    }

}