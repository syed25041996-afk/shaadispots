import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { HallDetailPage } from './pages/HallDetailPage';
import { Hall3DPage } from './pages/Hall3DPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Initialize TanStack Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Scroll to top helper on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout controller to omit header & footer on fullscreen 3D route
const AppLayout: React.FC = () => {
  const location = useLocation();
  const is3DRoute = location.pathname.endsWith('/3d');

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-stone-800">
      <ScrollToTop />
      {!is3DRoute && <Navbar />}
      <main className={`flex-1 ${is3DRoute ? 'h-screen w-screen p-0 m-0' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/halls" element={<ListingsPage />} />
          <Route path="/halls/:id" element={<HallDetailPage />} />
          <Route path="/halls/:id/3d" element={<Hall3DPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!is3DRoute && <Footer />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;

