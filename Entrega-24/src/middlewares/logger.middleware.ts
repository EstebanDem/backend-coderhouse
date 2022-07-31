import { Context, bgRgb8 } from "../deps.ts";

export async function logger(ctx: Context, next: () => void) {
    await next();

    let eightBitColor = 7;

    switch (ctx.request.method) {
        case 'GET': {
            eightBitColor = 4;
            break;
        }
        case 'POST': {
            eightBitColor = 2;
            break;
        }
        case 'PATCH': {
            eightBitColor = 3;
            break;
        }
        case 'DELETE': {
            eightBitColor = 1;
            break;
        }
        default: {
            break;
        }
    }
    console.log(bgRgb8(`[${ctx.request.method}] - Request from: ${ctx.request.url}`, eightBitColor));
}
