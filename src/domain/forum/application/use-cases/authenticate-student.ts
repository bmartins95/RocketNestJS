import { Injectable } from '@nestjs/common'

import { left, right } from '@/core/either'


import { WrongCredentialsError } from './errors/wrong-credentials-error'

import type { Encrypter } from '../cryptography/encrypter'
import type { Hasher } from '../cryptography/hasher'
import type { StudentsRepository } from '../repositories/students-repository'
import type { Either } from '@/core/either';


interface AuthenticateStudentUseCaseRequest {
    email: string
    password: string
}

type AuthenticateStudentUseCaseResponse = Either<
    WrongCredentialsError,
    {
        accessToken: string
    }
>

@Injectable()
export class AuthenticateStudentUseCase {
    constructor(
        private studentsRepository: StudentsRepository,
        private hasher: Hasher,
        private encrypter: Encrypter
    ) { }

    async execute({
        email,
        password,
    }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
        const student = await this.studentsRepository.findByEmail(email)

        if (!student) {
            return left(new WrongCredentialsError())
        }

        const doesPasswordMatch = await this.hasher.compare(
            password,
            student.password
        )

        if (!doesPasswordMatch) {
            return left(new WrongCredentialsError())
        }

        const accessToken = await this.encrypter.encrypt({ sub: student.id })

        return right({ accessToken })
    }
}
