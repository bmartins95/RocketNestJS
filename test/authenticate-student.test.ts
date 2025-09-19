import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/authenticate-student"

import { makeStudent } from "./factories/make-student"
import { InMemoryStudentsRepository } from "./repositories/in-memory-students-repository"
import { FakeEncrypter } from "./utils/fake-encrypter"
import { FakeHasher } from "./utils/fake-hasher"


let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let encrypter: FakeEncrypter

let sut: AuthenticateStudentUseCase

describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    encrypter = new FakeEncrypter()

    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
      encrypter,
    )
  })

  it('should be able to authenticate a student', async () => {
    const student = makeStudent({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryStudentsRepository.items.push(student)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.accessToken).toEqual(expect.any(String))
    }
  })
})
