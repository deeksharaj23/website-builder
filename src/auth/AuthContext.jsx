import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'orqis.auth.v1'

function readStoredUser() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    if (typeof parsed.email !== 'string' || !parsed.email.trim()) return null
    const name = typeof parsed.name === 'string' ? parsed.name.trim() : ''
    return { email: parsed.email.trim(), name: name || undefined }
  } catch {
    return null
  }
}

function writeStoredUser(user) {
  try {
    if (!user) window.localStorage.removeItem(STORAGE_KEY)
    else window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } catch {
    // ignore storage failures (private mode, blocked, etc.)
  }
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => (typeof window === 'undefined' ? null : readStoredUser()))

  useEffect(() => {
    writeStoredUser(user)
  }, [user])

  const login = useCallback(async ({ email, password }) => {
    const nextEmail = String(email || '').trim()
    const nextPassword = String(password || '')

    if (!nextEmail) return { ok: false, error: 'Please enter your email.' }
    if (!nextPassword) return { ok: false, error: 'Please enter your password.' }

    setUser({ email: nextEmail })
    return { ok: true }
  }, [])

  const signup = useCallback(async ({ email, password }) => {
    const nextName = String(arguments?.[0]?.name || '').trim()
    const nextEmail = String(email || '').trim()
    const nextPassword = String(password || '')

    if (!nextName) return { ok: false, error: 'Please enter your name.' }
    if (!nextEmail) return { ok: false, error: 'Please enter your email.' }
    if (!nextPassword) return { ok: false, error: 'Please create a password.' }
    if (nextPassword.length < 8) return { ok: false, error: 'Password must be at least 8 characters.' }

    setUser({ email: nextEmail, name: nextName })
    return { ok: true }
  }, [])

  const updateProfile = useCallback(({ name }) => {
    const nextName = String(name || '').trim()
    if (!nextName) return { ok: false, error: 'Please enter your name.' }
    setUser((prev) => (prev ? { ...prev, name: nextName } : prev))
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const value = useMemo(() => {
    return {
      user,
      isAuthenticated: Boolean(user),
      login,
      signup,
      updateProfile,
      logout,
    }
  }, [user, login, signup, updateProfile, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider />')
  return ctx
}
