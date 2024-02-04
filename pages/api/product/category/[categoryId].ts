import { NextApiRequest, NextApiResponse } from 'next';
import { prismaClient } from '@/app/_db/database';
import { Product } from '@prisma/client';

//difficult to gather logs as this is server side rendering and not client rendering
//have to look in both places to check logs
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { categoryId } = req.query;
        const data: Product[] = await prismaClient.product.findMany({
            where: { categoryId: parseInt(categoryId as string)}
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });//have to send back response to prevent stalled request
    }
}