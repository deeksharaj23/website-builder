import jwt from 'jsonwebtoken'

const COOKIE_NAME = 'orqis_session'

function requireEnv(name, fallback) {
  const v = process.env[name] || fallback
  if (!v) throw new Error(`Missing required env var: ${name}`)
  return v
}

export function getJwtSecret() {
  // For local dev we fall back to a stable secret; in prod you MUST set ORQIS_JWT_SECRET
  return requireEnv('ORQIS_JWT_SECRET', 'dev-secret-change-me')
}

export function getCookieOptions(req) {
  const isProd = process.env.NODE_ENV === 'production'
  const secure = isProd ? true : req.secure || req.headers['x-forwarded-proto'] === 'https'
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure,
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days
  }
}

export function setSessionCookie(res, req, payload) {
  const token = jwt.sign(payload, getJwtSecret(), { expiresIn: '14d' })
  res.cookie(COOKIE_NAME, token, getCookieOptions(req))
}

export function clearSessionCookie(res, req) {
  res.clearCookie(COOKIE_NAME, { ...getCookieOptions(req), maxAge: 0 })
}

export function readSession(req) {
  const token = req.cookies?.[COOKIE_NAME]
  if (!token) return null
  try {
    return jwt.verify(token, getJwtSecret())
  } catch {
    return null
  }
}

