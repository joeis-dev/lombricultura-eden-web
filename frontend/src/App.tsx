import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from '@components/common';
import { Layout } from '@components/layout';
import { useAuthStore } from '@store/authStore';
import Loading from '@components/common/Loading';
import { ThemeProvider } from '@contexts/ThemeContext';

// Lazy load pages for better performance
const Home = React.lazy(() => import('@pages/Home/Home'));
const Products = React.lazy(() => import('@pages/Products/Products'));
const ProductDetail = React.lazy(() => import('@pages/ProductDetail/ProductDetail'));
const Cart = React.lazy(() => import('@pages/Cart/Cart'));
const Checkout = React.lazy(() => import('@pages/Checkout/Checkout'));
const Login = React.lazy(() => import('@pages/Auth/Login'));
const Register = React.lazy(() => import('@pages/Auth/Register'));
const Profile = React.lazy(() => import('@pages/Profile/Profile'));
const OrderHistory = React.lazy(() => import('@pages/OrderHistory/OrderHistory'));
const OrderTracking = React.lazy(() => import('@pages/OrderTracking/OrderTracking'));
const SellerDashboard = React.lazy(() => import('@pages/Seller/Dashboard/Dashboard'));
const ProductManager = React.lazy(() => import('@pages/Seller/ProductManager/ProductManager'));

// Loading fallback for lazy loaded components
const PageLoading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <Loading size="lg" text="Loading page..." />
  </div>
);

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRole?: string }> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
};

// Public route component (redirects authenticated users away)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Router>
          <Layout>
            <Suspense fallback={<PageLoading />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              
              {/* Auth Routes - Public Only */}
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/register" 
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                } 
              />
              
              {/* Protected Routes */}
              <Route 
                path="/checkout" 
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/profile/*" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/orders" 
                element={
                  <ProtectedRoute>
                    <OrderHistory />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/orders/:id/tracking" 
                element={
                  <ProtectedRoute>
                    <OrderTracking />
                  </ProtectedRoute>
                } 
              />
              
              {/* Seller Routes */}
              <Route 
                path="/seller/*" 
                element={
                  <ProtectedRoute requiredRole="SELLER">
                    <SellerDashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/seller/products" 
                element={
                  <ProtectedRoute requiredRole="SELLER">
                    <ProductManager />
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin Routes (placeholder for future implementation) */}
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <div style={{ padding: '2rem', textAlign: 'center' }}>
                      <h1>Admin Panel</h1>
                      <p>Admin functionality coming soon...</p>
                    </div>
                  </ProtectedRoute>
                } 
              />
              
              {/* Fallback Routes */}
              <Route 
                path="/about" 
                element={
                  <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <h1>About Us</h1>
                    <p>Learn more about our company...</p>
                  </div>
                } 
              />
              
              <Route 
                path="/contact" 
                element={
                  <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <h1>Contact Us</h1>
                    <p>Get in touch with our team...</p>
                  </div>
                } 
              />
              
              <Route 
                path="/faq" 
                element={
                  <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <h1>Frequently Asked Questions</h1>
                    <p>Find answers to common questions...</p>
                  </div>
                } 
              />
              
              {/* 404 Not Found */}
              <Route 
                path="*" 
                element={
                  <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
                      404
                    </h1>
                    <h2 style={{ marginBottom: '1rem' }}>Page Not Found</h2>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                      The page you're looking for doesn't exist or has been moved.
                    </p>
                    <button 
                      onClick={() => window.history.back()}
                      style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        marginRight: '1rem'
                      }}
                    >
                      Go Back
                    </button>
                    <button 
                      onClick={() => window.location.href = '/'}
                      style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: 'var(--color-surface)',
                        color: 'var(--color-text)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '0.375rem',
                        cursor: 'pointer'
                      }}
                    >
                      Go Home
                    </button>
                  </div>
                } 
              />
            </Routes>
            </Suspense>
        </Layout>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;