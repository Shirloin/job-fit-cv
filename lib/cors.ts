import Cors from 'cors';
import { NextRequest, NextResponse } from 'next/server';


const cors = Cors({
    origin: process.env.NEXT_PUBLIC_BASE_PATH ?? "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
});

export function runMiddleware(req: NextRequest, res: NextResponse, fn: any) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export default cors;
