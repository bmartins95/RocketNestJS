import { BadRequestException } from "@nestjs/common";
import { ZodError, z } from "zod";

import type { PipeTransform } from "@nestjs/common";
import type { ZodType } from "zod";


export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodType) { }

    transform(value: unknown) {
        try {
            return this.schema.parse(value);
        }
        catch (error) {
            if (error instanceof ZodError) {
                throw new BadRequestException(z.treeifyError(error));
            }
            throw new BadRequestException("Validation failed.");
        }
    }
}