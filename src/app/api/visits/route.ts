import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prismadb";
import { Visit, Client } from "@prisma/client";

interface VisitAndClient extends Visit, Client {}

export async function POST(req: NextRequest) {
	const {
		clientId,
		date,
		duration,
		isNewClient,
		name,
		type,
		postal,
		param,
	}: VisitAndClient = await req.json();

	try {
		let client: Client | null = null;

		if (isNewClient && name) {
			// Search for existing client in the database (case insensitive)
			client = await prisma.client.findFirst({
				where: { name: { equals: name, mode: "insensitive" } },
			});
			if (client) {
				const error = { code: "P2002" };
				throw error;
			}
		}

		const visit: Visit = await prisma.visit.create({
			data: {
				date,
				duration,
				isNewClient,
				client:
					isNewClient && !client
						? {
								create: {
									name,
									type,
									postal,
									param,
								},
						  }
						: {
								connect: {
									id: clientId,
								},
						  },
			},
		});
		return NextResponse.json({
			message: `Nouvelle visite ${visit} enregistrée`,
		});
	} catch (error: any) {
		if (error.code === "P2002") {
			// Error code P2002 is for unique constraint violation
			return NextResponse.json(
				{
					error: `Le client ${name} existe déjà.`,
				},
				{ status: 400 }
			);
		} else {
			console.error(error);
			return NextResponse.json({
				error: `Une erreur est survenue lors de l'enregistrement de la visite.`,
			});
		}
	}
}
