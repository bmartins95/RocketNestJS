import { createParamDecorator } from "@nestjs/common";

import type { TokenPayload } from "./jwt-strategy";
import type { ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (_: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.user as TokenPayload;
    }
)