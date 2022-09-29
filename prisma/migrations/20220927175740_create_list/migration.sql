-- CreateTable
CREATE TABLE "TypeListProducts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collection" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "collection" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    CONSTRAINT "Products_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "TypeListProducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserLists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "collection" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    CONSTRAINT "UserLists_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "TypeListProducts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserProductsPerList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "collection" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    CONSTRAINT "UserProductsPerList_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "UserLists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
