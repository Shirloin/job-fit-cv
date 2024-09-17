// lib/cors.ts

export function cors(req: any, res: any) {
    res.setHeader('Access-Control-Allow-Origin', 'https://job-fit-cv.shirloin.my.id');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return true;
    }

    return false;
}
