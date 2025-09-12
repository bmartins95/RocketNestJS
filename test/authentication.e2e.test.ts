
import { Test } from "@nestjs/testing";
import { hash } from "bcryptjs";
import request from "supertest";

import { AppModule } from "@/app.module";
import { PrismaService } from "@/prisma/prisma.service";

import type { INestApplication } from "@nestjs/common";
import type { Server } from "node:http";

describe("Authenticate user (E2E)", () => {
    let app: INestApplication<Server>;
    let prisma: PrismaService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleRef.createNestApplication();
        prisma = moduleRef.get<PrismaService>(PrismaService);
        await app.init();
    });

    test("[POST] /sessions", async () => {
        const server: Server = app.getHttpServer();

        await prisma.user.create({
            data: {
                name: "John Doe",
                email: "john.doe@example.com",
                password: await hash("securePassword123", 10),
            },
        });

        const response = await request(server).post("/sessions").send({
            email: "john.doe@example.com",
            password: "securePassword123",
        });
        expect(response.status).toBe(201);
        expect(response.body).toEqual(
            expect(typeof response.body.access_token).toBe('string'),
        );
    });
});