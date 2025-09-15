import { Injectable } from "@nestjs/common";

import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository";

@Injectable()
export class PrismaQuestionAttachmentRepository implements QuestionAttachmentsRepository {
    async findManyByQuestionId(questionId: string): Promise<any[]> {
        throw new Error("Method not implemented.");
    }

    async deleteManyByQuestionId(questionId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}