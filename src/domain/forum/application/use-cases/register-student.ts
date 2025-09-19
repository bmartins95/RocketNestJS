import { Injectable } from '@nestjs/common'

import { left, right } from '@/core/either'

import { Student } from '../../enterprise/entities/student'

import { StudentAlreadyExistsError } from './errors/student-already-exists-error'

import type { Hasher } from '../cryptography/hasher'
import type { StudentsRepository } from '../repositories/students-repository'
import type { Either } from '@/core/either';


interface RegisterStudentUseCaseRequest {
    name: string
    email: string
    password: string
}

type RegisterStudentUseCaseResponse = Either<
    StudentAlreadyExistsError,
    {
        student: Student
    }
>

@Injectable()
export class RegisterStudentUseCase {
    constructor(
        private studentsRepository: StudentsRepository,
        private hasher: Hasher
    ) { }

    async execute({
        name,
        email,
        password,
    }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
        const studentWithSameEmail = await this.studentsRepository.findByEmail(email)

        if (studentWithSameEmail) {
            return left(new StudentAlreadyExistsError(email))
        }

        const hashPassword = await this.hasher.hash(password)

        const student = Student.create({
            name,
            email,
            password: hashPassword,
        })

        await this.studentsRepository.create(student)

        return right({ student })
    }
}
