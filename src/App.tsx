import { createRouter, createRoute, createRootRoute, RouterProvider } from '@tanstack/react-router'
import SignInPage from './pages/SignInPage'
import DashboardPage from './pages/DashboardPage'
import ExamTestPage from './pages/ExamTestPage'
import CompletePage from './pages/CompletePage'
import TimeoutPage from './pages/TimeoutPage'

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

const completeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/complete',
  component: CompletePage,
})

const timeoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/timeout',
  component: TimeoutPage,
})

const routeTree = rootRoute.addChildren([indexRoute, dashboardRoute, examTestRoute, completeRoute, timeoutRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return <RouterProvider router={router} />
}