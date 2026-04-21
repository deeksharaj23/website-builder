import express from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

import { db, migrate } from './db.js'
import { clearSessionCookie, readSession, setSessionCookie } from './auth.js'
import { sendEnterpriseLeadEmail } from './email.js'

let appSingleton = null

export function createApp() {
  if (appSingleton) return appSingleton

  const app = express()

  migrate()

  app.set('trust proxy', 1)
  app.use(helmet({ contentSecurityPolicy: false })) // CSP handled by Vite/static host; keep API simple
  app.use(express.json({ limit: '200kb' }))
  app.use(cookieParser())

  function sendError(res, status, message) {
    return res.status(status).json({ ok: false, error: message })
  }

  function publicUserRow(row) {
    if (!row) return null
    return { id: row.id, email: row.email, name: row.name }
  }

  function getAuthedUser(req) {
    const session = readSession(req)
    if (!session || typeof session.userId !== 'number') return null
    const row = db.prepare('SELECT id, email, name FROM users WHERE id = ?').get(session.userId)
    return publicUserRow(row)
  }

  app.get('/api/health', (req, res) => {
    res.json({ ok: true })
  })

  app.get('/api/auth/me', (req, res) => {
    const user = getAuthedUser(req)
    return res.json({ ok: true, user })
  })

  app.post('/api/auth/logout', (req, res) => {
    clearSessionCookie(res, req)
    return res.json({ ok: true })
  })

  const enterpriseLeadSchema = z.object({
    name: z.string().trim().max(80, 'Name is too long.').optional().or(z.literal('')),
    workEmail: z.string().trim().email('Please enter a valid work email.').max(254),
    company: z.string().trim().max(120, 'Company is too long.').optional().or(z.literal('')),
    message: z.string().trim().max(2000, 'Message is too long.').optional().or(z.literal('')),
  })

  app.post('/api/enterprise/lead', (req, res) => {
    const parsed = enterpriseLeadSchema.safeParse(req.body)
    if (!parsed.success) return sendError(res, 400, parsed.error.issues[0]?.message || 'Invalid request.')

    const { name, workEmail, company, message } = parsed.data
    const workEmailLower = workEmail.toLowerCase()

    db.prepare(
      `INSERT INTO enterprise_leads (name, work_email, company, message)
       VALUES (?, ?, ?, ?)`
    ).run(name || null, workEmailLower, company || null, message || null)

    // Best-effort email notification. If SMTP isn't configured, DB write still succeeds.
    sendEnterpriseLeadEmail({
      to: 'ceo@ellenox.com',
      lead: { name: name || '', workEmail: workEmailLower, company: company || '', message: message || '' },
    }).catch(() => {})

    return res.json({ ok: true })
  })

  const signupSchema = z.object({
    name: z.string().trim().min(1, 'Please enter your name.').max(80, 'Name is too long.'),
    email: z.string().trim().email('Please enter a valid email.').max(254),
    password: z.string().min(8, 'Password must be at least 8 characters.').max(200),
  })

  app.post('/api/auth/signup', async (req, res) => {
    const parsed = signupSchema.safeParse(req.body)
    if (!parsed.success) return sendError(res, 400, parsed.error.issues[0]?.message || 'Invalid sign up.')

    const { name, email, password } = parsed.data
    const emailLower = email.toLowerCase()

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(emailLower)
    if (existing) return sendError(res, 409, 'An account with this email already exists.')

    const passwordHash = await bcrypt.hash(password, 12)
    const info = db.prepare(
      `INSERT INTO users (email, name, password_hash, updated_at)
       VALUES (?, ?, ?, datetime('now'))`
    ).run(emailLower, name, passwordHash)

    const userId = Number(info.lastInsertRowid)
    setSessionCookie(res, req, { userId })

    return res.json({ ok: true, user: { id: userId, email: emailLower, name } })
  })

  const loginSchema = z.object({
    email: z.string().trim().email('Please enter a valid email.').max(254),
    password: z.string().min(1, 'Please enter your password.').max(200),
  })

  app.post('/api/auth/login', async (req, res) => {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success) return sendError(res, 400, parsed.error.issues[0]?.message || 'Invalid login.')

    const { email, password } = parsed.data
    const emailLower = email.toLowerCase()

    const row = db.prepare('SELECT id, email, name, password_hash FROM users WHERE email = ?').get(emailLower)
    if (!row) return sendError(res, 401, 'Invalid email or password.')

    const ok = await bcrypt.compare(password, row.password_hash)
    if (!ok) return sendError(res, 401, 'Invalid email or password.')

    setSessionCookie(res, req, { userId: row.id })
    return res.json({ ok: true, user: publicUserRow(row) })
  })

  const updateProfileSchema = z.object({
    name: z.string().trim().min(1, 'Please enter your name.').max(80, 'Name is too long.'),
  })

  app.patch('/api/auth/profile', (req, res) => {
    const user = getAuthedUser(req)
    if (!user) return sendError(res, 401, 'Not authenticated.')

    const parsed = updateProfileSchema.safeParse(req.body)
    if (!parsed.success) return sendError(res, 400, parsed.error.issues[0]?.message || 'Invalid profile update.')

    db.prepare('UPDATE users SET name = ?, updated_at = datetime(\'now\') WHERE id = ?').run(parsed.data.name, user.id)
    return res.json({ ok: true, user: { ...user, name: parsed.data.name } })
  })

  appSingleton = app
  return app
}

