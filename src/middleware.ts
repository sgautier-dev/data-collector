import { NextResponse } from "next/server";
import rateLimit from "express-rate-limit";

const allowedOrigins =
	process.env.NODE_ENV === "production"
		? ["https://data-collector-seven.vercel.app"]
		: ["http://localhost:3000"];

const getKey = (req: Request) => {
	return req.headers.get("x-forwarded-for") || "unknown-ip";
};

const rateLimiter = rateLimit({
	keyGenerator: getKey,
	windowMs: 60 * 1000,
	max: 3,
});

export async function middleware(request: Request) {
	// Check allowed origins
	const origin = request.headers.get("origin");
	if (origin && !allowedOrigins.includes(origin)) {
		return new NextResponse(null, {
			status: 403,
			statusText: "Forbidden",
			headers: {
				"Content-Type": "text/plain",
				"Access-Control-Allow-Origin": allowedOrigins.join(", "),
			},
		});
	}

	// Apply rate limiting
	let rateLimited: boolean = false;
	rateLimiter(request as any, {} as any, () => {
		rateLimited = true;
	});

	if (rateLimited) {
		return new NextResponse(null, {
			status: 429,
			statusText: "Too Many Requests",
			headers: {
				"Retry-After": "60",
				"Content-Type": "text/plain",
			},
		});
	}

	return null;
}

export const config = {
	matcher: "/api/:path*",
};
