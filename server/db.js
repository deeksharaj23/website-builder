import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const dataDir = path.resolve(process.cwd(), 'server', 'data')
fs.mkdirSync(dataDir, { recursive: true })

const dbPath = path.join(dataDir, 'app.sqlite')
export const db = new Database(dbPath)

// Pragmas for sane defaults
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

export function migrate() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

    CREATE TABLE IF NOT EXISTS enterprise_leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      work_email TEXT NOT NULL,
      company TEXT,
      message TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_enterprise_leads_created_at ON enterprise_leads(created_at);
    CREATE INDEX IF NOT EXISTS idx_enterprise_leads_work_email ON enterprise_leads(work_email);
  `)
}

