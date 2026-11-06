import { NextResponse, NextRequest } from "next/server";

type nextApiHandler = (req: NextRequest, res: NextApiResponse) => Promise<void>;


export const proxy = async (
  req: NextRequest,
): Promise<any> => {
    const url = req.nextUrl;


    if (process.env.NODE_ENV !== "production") {
        const headers = new Headers(req.headers);
        const host = "effective-space-doodle-v4gv6wgjpqq266vw-3000.app.github.dev";
        headers.set('x-forwarded-host', host);
        headers.set('origin', `https://${host}`);

        return NextResponse.next({ request: { headers } });
    }
    return NextResponse.next();
}