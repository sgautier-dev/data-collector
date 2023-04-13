import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prismadb";
import { Visit, Client } from "@prisma/client";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

interface VisitAndClient extends Visit, Client {}

export async function POST(req: NextRequest) {
	const { clientId, date, duration, isNewClient, name, type, postal, param }: VisitAndClient = await req.json();

	try {
		const visit: Visit = await prisma.visit.create({
			data: {
				date,
				duration,
				isNewClient,
				client: isNewClient 
					? {
						create: {
							name: name,
							type: type,
							postal: postal,
							param: param,
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
		if (
			error instanceof PrismaClientKnownRequestError &&
			error.code === "P2002"
		) {
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
