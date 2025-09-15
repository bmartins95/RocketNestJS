import { Injectable } from "@nestjs/common";

import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

@Injectable()
export class PrismaQuestionsCommentsRepository implements QuestionCommentsRepository {
    async findById(id: string): Promise<QuestionComment | null> {
        throw new Error("Method not implemented.");
    }

    async findManyByQuestionId(questionId: string): Promise<QuestionComment[]> {
        throw new Error("Method not implemented.");
    }

    async create(comment: QuestionComment): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async delete(comment: QuestionComment): Promise<void> {
        throw new Error("Method not implemented.");
    }
}