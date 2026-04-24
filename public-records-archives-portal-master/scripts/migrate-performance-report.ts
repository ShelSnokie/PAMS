/**
 * One-off migration: creates the PerformanceReport table in the SQLite DB.
 * Run with:  bun scripts/migrate-performance-report.ts
 */
import { Database } from 'bun:sqlite'

const DB_PATH = './db/custom.db'

const db = new Database(DB_PATH, { create: false })

db.exec(`
  CREATE TABLE IF NOT EXISTS "PerformanceReport" (
    "id"                TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    "userId"            TEXT NOT NULL,
    "weekNumber"        TEXT NOT NULL,
    "dateRange"         TEXT NOT NULL,
    "itemsUploaded"     INTEGER NOT NULL DEFAULT 0,
    "metadataCompleted" INTEGER NOT NULL DEFAULT 0,
    "comments"          TEXT,
    "status"            TEXT NOT NULL DEFAULT 'pending',
    "createdAt"         DATETIME NOT NULL DEFAULT (datetime('now')),
    "updatedAt"         DATETIME NOT NULL DEFAULT (datetime('now')),
    CONSTRAINT "PerformanceReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
  );
`)

console.log('✅  PerformanceReport table created (or already exists).')
db.close()
