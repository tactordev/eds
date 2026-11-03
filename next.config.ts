import type { NextConfig, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import os from "os";

type nextApiHandler = (req: NextRequest, res: NextApiResponse) => Promise<void>;


function getIps() {
  const interfaces = os.networkInterfaces();
  const ips = [];

  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]!) {
      if (net.family === "IPv4" && !net.internal) {
        ips.push(net.address);
      }
    }
  }

  return ips;
}

const actionHeaderCheckOverride = async (
  req: NextRequest,
  res: NextApiResponse,
  next: NextApiHandler,
): Promise<any> => {
  console.debug("REQUEST HEADERS:::: ", req.headers);

  
  const response = NextResponse.next();
  if (process.env.NODE_ENV !== "production") {
    response.headers.set('x-forwarded-host', 'localhost:5500');
  }
  return response;
}


const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ['effective-space-doodle-v4gv6wgjpqq266vw-3000.app.github.dev'],
    },
  },
  allowedDevOrigins: getIps(),
};

export default nextConfig;
