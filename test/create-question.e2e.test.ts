
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { hash } from "bcryptjs";
import request from "supertest";

import { AppModule } from "@/infra/app-module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";

import type { INestApplication } from "@nestjs/common";
import type { Server } from "node:http";

describe("Create question (E2E)", () => {
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

    test("[POST] /questions", async () => {
        const server: Server = app.getHttpServer();

        const user = await prisma.user.create({
            data: {
                name: "John Doe",
                email: "john.doe@example.com",
                password: await hash("securePassword123", 10),
            },
        });

        const token = jwt.sign({ sub: user.id });

        const response = await request(server)
            .post("/questions")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Question Title",
                content: "This is the content of the question.",
            });
        expect(response.status).toBe(201);

        const question = await prisma.question.findFirst({
            where: { title: "Question Title" },
        });
        expect(question).toBeDefined();
        expect(question?.title).toBe("Question Title");
        expect(question?.content).toBe("This is the content of the question.");
    });
});