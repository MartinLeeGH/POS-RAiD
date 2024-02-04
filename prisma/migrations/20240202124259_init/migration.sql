/*
  Warnings:

  - Added the required column `cost` to the `ProductsOnTransactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `ProductsOnTransactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionAmount` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ProductsOnTransactions` ADD COLUMN `cost` INTEGER NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `transactionAmount` DOUBLE NOT NULL;
