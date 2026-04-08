import { createElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import RootLayout from '@/layouts/RootLayout'
import routes from '@/routes'

/**
 * App renders the central route tree.
 * RootLayout provides the shared Navbar + Footer wrapper.
 * Each route entry in routes.jsx maps a path to a lazy Page component.
 *
 * createElement is used instead of JSX so ESLint's no-unused-vars
 * reliably recognises the Page reference from the routes config.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {routes.map(({ path, Page }) => (
          <Route key={path} path={path} element={createElement(Page)} />
        ))}
      </Route>
    </Routes>
  )
}
