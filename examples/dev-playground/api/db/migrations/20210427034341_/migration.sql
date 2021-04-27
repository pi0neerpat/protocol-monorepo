-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "authDetailId" TEXT NOT NULL,
    FOREIGN KEY ("authDetailId") REFERENCES "AuthDetail" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuthDetail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nonce" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Flow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "flowRate" TEXT NOT NULL,
    "recipientAddress" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    FOREIGN KEY ("recipientAddress") REFERENCES "User" ("address") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("ownerAddress") REFERENCES "User" ("address") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User.address_unique" ON "User"("address");
