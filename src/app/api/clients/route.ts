import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/lib/prismadb';
import { Client } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const clients: Client[] = await prisma.client.findMany();
      res.status(200).json(clients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des clients.' });
    }
  } else {
    res.status(405).json({ message: 'Méthode HTTP non autorisée.' });
  }
}