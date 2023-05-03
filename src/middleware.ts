import { NextResponse } from "next/server";

const allowedOrigins =
	process.env.NODE_ENV === "production"
		? ["https://data-collector-seven.vercel.app"]
		: ["http://localhost:3000"];

export function middleware(request: Request) {
	const origin = request.headers.get("origin");
	console.log(origin);

    //add <&& !origin> if postman or thunderclient should be not allowed too
	if (origin && !allowedOrigins.includes(origin)) {
		return new NextResponse(null, {
			status: 400,
			statusText: "Bad Request",
			headers: {
				"Content-Type": "text/plain",
			},
		});
	}
}

export const config = {
    matcher: '/api/:path*',
}