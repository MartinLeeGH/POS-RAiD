//api for payment. Save transaction to database
import { NextApiRequest, NextApiResponse } from 'next';
import { prismaClient } from '@/app/_db/database';
import { Employee, Product, Transaction } from '@prisma/client';
import { mysqlDateTimeNow } from '@/app/_utils/date';
import { ProductDTO } from '@/app/_models/_home/productDTO';
import { EmployeeDetails } from '@/app/_models/_home/employeeDetails';
import { moneyFormatter } from '@/app/_utils/formatter';
import { errorToast, successToast } from '@/app/_components/_common/_toast/toast';
import { json } from 'stream/consumers';

//difficult to gather logs as this is server side rendering and not client rendering
//have to look in both places to check logs
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { data } = req.body;
        //Destructure the paymentRequestDTO object
        const { employeeDetails, totalCost, products }: { employeeDetails: EmployeeDetails, totalCost: number, products: ProductDTO[]} = data;

        //wrap the following database inserts into 1 transaction and rollback everything if any database inserts fails
        await prismaClient.$transaction(async (prismaClient) => {
            //create transaction record first
            const newTransaction = await prismaClient.transaction.create({
                data: {
                    date: new Date(),
                    employee: { connect: { employeeId: employeeDetails.employeeId}}, //connect to existing employee record
                    transactionAmount: totalCost
                }
            })

            //associate transaction record with the productOnTransaction relation table
            const productsOnTransactions = await Promise.all(products.map(async (product) => {
                return prismaClient.productsOnTransactions.create({
                data: {
                    product: { connect: { id: product.id } }, //associate with an existing product record
                    transaction: { connect: { transactionId: newTransaction.transactionId } }, //associate with the newly created transaction
                    quantity: product.quantity,
                    cost: parseFloat(moneyFormatter(product.quantity*product.price)),
                },
                });
            }));
            successToast('Successfully completed the payment transaction')
            res.status(200).json("successfully saved");
        })
    } catch (error) {
        errorToast('Error encountered while processing payment. Please try again later')
        res.status(500).json({ error: error });//have to send back response to prevent stalled request
    }
    
    
}