/*
  Warnings:

  - You are about to drop the column `createdAt` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `stock_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `stock_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `stock_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `warehouseId` on the `stock_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `warehouse_inventories` table. All the data in the column will be lost.
  - You are about to drop the column `minStock` on the `warehouse_inventories` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `warehouse_inventories` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `warehouse_inventories` table. All the data in the column will be lost.
  - You are about to drop the column `warehouseId` on the `warehouse_inventories` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `warehouses` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `warehouses` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `warehouses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[warehouse_id,product_id]` on the table `warehouse_inventories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `stock_transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `stock_transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warehouse_id` to the `stock_transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_stock` to the `warehouse_inventories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `warehouse_inventories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `warehouse_inventories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warehouse_id` to the `warehouse_inventories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `warehouses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."stock_transactions" DROP CONSTRAINT "stock_transactions_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."stock_transactions" DROP CONSTRAINT "stock_transactions_warehouseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."warehouse_inventories" DROP CONSTRAINT "warehouse_inventories_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."warehouse_inventories" DROP CONSTRAINT "warehouse_inventories_warehouseId_fkey";

-- DropIndex
DROP INDEX "public"."warehouse_inventories_warehouseId_productId_key";

-- AlterTable
ALTER TABLE "public"."products" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."stock_transactions" DROP COLUMN "createdAt",
DROP COLUMN "productId",
DROP COLUMN "updatedAt",
DROP COLUMN "warehouseId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "warehouse_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."warehouse_inventories" DROP COLUMN "createdAt",
DROP COLUMN "minStock",
DROP COLUMN "productId",
DROP COLUMN "updatedAt",
DROP COLUMN "warehouseId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "min_stock" INTEGER NOT NULL,
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "warehouse_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."warehouses" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "warehouse_inventories_warehouse_id_product_id_key" ON "public"."warehouse_inventories"("warehouse_id", "product_id");

-- AddForeignKey
ALTER TABLE "public"."warehouse_inventories" ADD CONSTRAINT "warehouse_inventories_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."warehouse_inventories" ADD CONSTRAINT "warehouse_inventories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stock_transactions" ADD CONSTRAINT "stock_transactions_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stock_transactions" ADD CONSTRAINT "stock_transactions_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
