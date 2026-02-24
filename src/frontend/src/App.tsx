import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import AppDetailPage from './pages/AppDetailPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from '@/components/ui/sonner';

// Layout component with Navbar and Footer
function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

// Define routes
const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/category/$categoryName',
  component: CategoryPage,
});

const appDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/app/$appId',
  component: AppDetailPage,
});

// Create router
const routeTree = rootRoute.addChildren([indexRoute, categoryRoute, appDetailRoute]);

const router = createRouter({ routeTree });

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
