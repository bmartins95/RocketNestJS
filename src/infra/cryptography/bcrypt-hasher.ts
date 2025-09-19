import { compare, hash } from "bcryptjs";

import type { Hasher } from "@/domain/forum/application/cryptography/hasher";

export class BcryptHasher implements Hasher {
    async hash(value: string): Promise<string> {
        return hash(value, 8);
    }

    async compare(value: string, hashedValue: string): Promise<boolean> {
        return compare(value, hashedValue);
    }
}