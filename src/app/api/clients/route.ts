import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prismadb';
import { Client } from '@prisma/client';

export async function GET() {
    try {
      const clients: Client[] = await prisma.client.findMany();
      return NextResponse.json({ clients })
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Une erreur est survenue lors de la récupération des clients.' });
    }

}