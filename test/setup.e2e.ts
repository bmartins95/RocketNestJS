import { PrismaClient } from "@prisma/client";
import { execSync } from "node:child_process";
import { randomUUID } from "crypto";
import "dotenv/config";

const prisma = new PrismaClient();
const schemaId = randomUUID();

function generateUniqueDatabaseUrl(schemaId: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not defined in the environment variables.');
    }

    const databaseUrl = new URL(process.env.DATABASE_URL);
    databaseUrl.searchParams.set('schema', schemaId);
    return databaseUrl.toString();
}

beforeAll(async () => {
    const databaseUrl = generateUniqueDatabaseUrl(schemaId);
    process.env.DATABASE_URL = databaseUrl;
    execSync('npx prisma db push --force-reset');
});

afterAll(async () => {
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
    await prisma.$disconnect();
});
