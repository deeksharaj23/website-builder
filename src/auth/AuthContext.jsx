import { createContext, useCallback, useContext, useMemo, useState } from 'react'

// Demo-only auth. No server, no database.
const STORAGE_KEY = 'orqis_demo_user'

function readStoredUser() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    if (typeof parsed.email !== 'string') return null
    if (typeof parsed.name !== 'string') return null
    return {
      id: typeof parsed.id === 'number' ? parsed.id : Date.now(),
      email: parsed.email,
      name: parsed.name,
    }
  } catch {
    return null
  }
}

function writeStoredUser(user) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

function clearStoredUser() {
  window.localStorage.removeItem(STORAGE_KEY)
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser())
  const [isBootstrapped] = useState(true)

  const login = useCallback(async ({ email, password }) => {
    const nextEmail = String(email || '').trim().toLowerCase()
    const nextPassword = String(password || '')
    if (!nextEmail || !nextEmail.includes('@')) return { ok: false, error: 'Please enter a valid email.' }
    if (!nextPassword) return { ok: false, error: 'Please enter your password.' }

    const stored = readStoredUser()
    if (!stored) return { ok: false, error: 'No demo account found. Please sign up first.' }
    if (stored.email.toLowerCase() !== nextEmail) return { ok: false, error: 'Invalid email or password.' }

    // Demo-only: we don’t persist passwords locally.
    setUser(stored)
    return { ok: true }
  }, [])

  const signup = useCallback(async ({ name, email, password }) => {
    const nextName = String(name || '').trim()
    const nextEmail = String(email || '').trim().toLowerCase()
    const nextPassword = String(password || '')

    if (!nextName) return { ok: false, error: 'Please enter your name.' }
    if (!nextEmail || !nextEmail.includes('@')) return { ok: false, error: 'Please enter a valid email.' }
    if (nextPassword.length < 8) return { ok: false, error: 'Password must be at least 8 characters.' }

    const nextUser = { id: Date.now(), email: nextEmail, name: nextName }
    writeStoredUser(nextUser)
    setUser(nextUser)
    return { ok: true }
  }, [])

  const updateProfile = useCallback(({ name }) => {
    const nextName = String(name || '').trim()
    if (!nextName) return Promise.resolve({ ok: false, error: 'Please enter your name.' })

    const stored = readStoredUser()
    if (!stored) return Promise.resolve({ ok: false, error: 'Not authenticated.' })

    const nextUser = { ...stored, name: nextName }
    writeStoredUser(nextUser)
    setUser(nextUser)
    return Promise.resolve({ ok: true })
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    clearStoredUser()
  }, [])

  const value = useMemo(() => {
    return {
      user,
      isAuthenticated: Boolean(user),
      isBootstrapped,
      login,
      signup,
      updateProfile,
      logout,
    }
  }, [user, isBootstrapped, login, signup, updateProfile, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider />')
  return ctx
}
