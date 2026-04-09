import { createRouter, createRoute, createRootRoute, RouterProvider } from '@tanstack/react-router'
import SignInPage from './pages/SignInPage'
import DashboardPage from './pages/DashboardPage'
import ExamTestPage from './pages/ExamTestPage'

const rootRoute = createRootRoute()

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: SignInPage,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
})

const examTestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/exam-test/$id',
  component: ExamTestPage,
})

const routeTree = rootRoute.addChildren([indexRoute, dashboardRoute, examTestRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return <RouterProvider router={router} />
}