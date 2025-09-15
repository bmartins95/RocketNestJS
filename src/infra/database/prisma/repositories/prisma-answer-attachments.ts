import { Injectable } from "@nestjs/common";

import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";

@Injectable()
export class PrismaAnswerAttachmentRepository implements AnswerAttachmentsRepository {
    async findManyByAnswerId(answerId: string): Promise<any[]> {
        throw new Error("Method not implemented.");
    }

    async deleteManyByAnswerId(answerId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}