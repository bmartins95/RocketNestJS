import { Injectable } from '@nestjs/common';

import { right } from '@/core/either'

import type { QuestionsRepository } from '../repositories/questions-repository'
import type { Either } from '@/core/either';
import type { Question } from '@/domain/forum/enterprise/entities/question'

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

type FetchRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>

@Injectable()
export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return right({
      questions,
    })
  }
}
