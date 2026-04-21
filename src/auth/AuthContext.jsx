import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

async function api(path, { method = 'GET', body, signal } = {}) {
  const res = await fetch(path, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  })

  const data = await res.json().catch(() => null)
  if (!res.ok) {
    return { ok: false, error: data?.error || 'Request failed.' }
  }
  return data || { ok: true }
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isBootstrapped, setIsBootstrapped] = useState(false)

  useEffect(() => {
    const ctrl = new AbortController()
    api('/api/auth/me', { signal: ctrl.signal }).then((res) => {
      if (res?.ok) setUser(res.user || null)
      setIsBootstrapped(true)
    }).catch(() => setIsBootstrapped(true))
    return () => ctrl.abort()
  }, [])

  const login = useCallback(async ({ email, password }) => {
    const res = await api('/api/auth/login', { method: 'POST', body: { email, password } })
    if (!res.ok) return res
    setUser(res.user || null)
    return { ok: true }
  }, [])

  const signup = useCallback(async ({ name, email, password }) => {
    const res = await api('/api/auth/signup', { method: 'POST', body: { name, email, password } })
    if (!res.ok) return res
    setUser(res.user || null)
    return { ok: true }
  }, [])

  const updateProfile = useCallback(({ name }) => {
    return api('/api/auth/profile', { method: 'PATCH', body: { name } }).then((res) => {
      if (!res.ok) return res
      setUser(res.user || null)
      return { ok: true }
    })
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    api('/api/auth/logout', { method: 'POST' }).catch(() => {})
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
