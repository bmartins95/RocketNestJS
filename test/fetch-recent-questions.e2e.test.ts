
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { hash } from "bcryptjs";
import request from "supertest";

import { AppModule } from "@/infra/app.module";
import { PrismaService } from "@/infra/prisma/prisma.service";

import type { INestApplication } from "@nestjs/common";
import type { Server } from "node:http";

describe("Fetch recent questions (E2E)", () => {
    let app: INestApplication<Server>;
    let prisma: PrismaService;
    let jwt: JwtService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleRef.createNestApplication();
        prisma = moduleRef.get<PrismaService>(PrismaService);
        jwt = moduleRef.get<JwtService>(JwtService);
        await app.init();
    });

    test("[GET] /questions", async () => {
        const server: Server = app.getHttpServer();

        const user = await prisma.user.create({
            data: {
                name: "John Doe",
                email: "john.doe@example.com",
                password: await hash("securePassword123", 10),
            },
        });

        const token = jwt.sign({ sub: user.id });

        await prisma.question.create({
            data: {
                title: "Question 01",
                slug: "question_01",
                content: "Question content 01",
                authorId: user.id,
            }
        });
        await prisma.question.create({
            data: {
                title: "Question 02",
                slug: "question_02",
                content: "Question content 02",
                authorId: user.id,
            }
        });

        const response = await request(server)
            .get("/questions")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.questions).toHaveLength(2);
        expect(response.body.questions).toEqual([
            expect.objectContaining({ title: "Question 02" }),
            expect.objectContaining({ title: "Question 01" }),
        ]);
    });
});