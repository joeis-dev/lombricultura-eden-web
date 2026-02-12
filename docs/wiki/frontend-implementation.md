# Frontend Implementation Guide

This guide provides detailed instructions for completing the React frontend.

## Architecture Overview

The frontend uses:
- **React 18** with TypeScript
- **Vite** for build tooling
- **Zustand** for state management
- **React Router** for routing
- **Axios** for API calls
- **Stripe** for payments

## Completed Components

✅ Project structure
✅ TypeScript types
✅ API client with authentication
✅ Auth store (Zustand)
✅ Cart store (Zustand)
✅ Theme configuration
✅ Docker configuration

## Remaining Tasks

### 1. Routing Setup

**File**: `frontend/src/App.tsx`

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@components/layout/Layout';
import { Home } from '@pages/Home';
import { Products } from '@pages/Products';
import { ProductDetail } from '@pages/ProductDetail';
import { Cart } from '@pages/Cart';
import { Checkout } from '@pages/Checkout';
import { Login } from '@pages/Auth/Login';
import { Register } from '@pages/Auth/Register';
import { Profile } from '@pages/Profile';
import { OrderHistory } from '@pages/OrderHistory';
import { OrderTracking } from '@pages/OrderTracking';
import { SellerDashboard } from '@pages/Seller/Dashboard';
import { ProtectedRoute } from '@components/common/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="orders/:id/track" element={<OrderTracking />} />
          </Route>
          
          {/* Seller routes */}
          <Route element={<ProtectedRoute requiredRole="SELLER" />}>
            <Route path="seller/*" element={<SellerDashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 2. Layout Components

#### Header

**File**: `frontend/src/components/layout/Header.tsx`

```typescript
import { Link } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';
import { useCartStore } from '@store/cartStore';
import { ShoppingCart, User, Menu } from 'lucide-react';

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <img src="/branding/logo.svg" alt="Logo" />
        </Link>
        
        <nav className="nav">
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        
        <div className="actions">
          <Link to="/cart" className="cart-icon">
            <ShoppingCart />
            {getTotalItems() > 0 && (
              <span className="badge">{getTotalItems()}</span>
            )}
          </Link>
          
          {isAuthenticated ? (
            <div className="user-menu">
              <User />
              <div className="dropdown">
                <Link to="/profile">Profile</Link>
                <Link to="/orders">Orders</Link>
                {user?.role === 'SELLER' && (
                  <Link to="/seller">My Store</Link>
                )}
                <button onClick={logout}>Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};
```

### 3. Pages

#### Home Page

**File**: `frontend/src/pages/Home/index.tsx`

```typescript
import { useEffect, useState } from 'react';
import { ProductCard } from '@components/product/ProductCard';
import { Testimonials } from '@components/common/Testimonials';
import apiClient from '@services/api';
import type { Product } from '@types/index';

export const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    const fetchFeatured = async () => {
      const response = await apiClient.get('/products/featured');
      setFeaturedProducts(response.data);
    };
    fetchFeatured();
  }, []);
  
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Our Store</h1>
        <p>Discover amazing products at great prices</p>
        <Link to="/products" className="btn-primary">Shop Now</Link>
      </section>
      
      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* About Section */}
      <section className="about">
        <h2>About Us</h2>
        <p>We are committed to providing quality products...</p>
      </section>
      
      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <Testimonials />
      </section>
    </div>
  );
};
```

#### Products Page

**File**: `frontend/src/pages/Products/index.tsx`

```typescript
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '@components/product/ProductCard';
import { ProductFilters } from '@components/product/ProductFilters';
import { SearchBar } from '@components/common/SearchBar';
import apiClient from '@services/api';
import type { Product, PaginatedResponse } from '@types/index';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<PaginatedResponse<Product>>();
  const [loading, setLoading] = useState(false);
  
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'createdAt,desc';
  const page = parseInt(searchParams.get('page') || '0');
  
  useEffect(() => {
    fetchProducts();
  }, [search, category, sort, page]);
  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/products', {
        params: { search, category, sort, page, size: 12 }
      });
      setProducts(response.data);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="products-page">
      <div className="filters-sidebar">
        <ProductFilters
          category={category}
          onCategoryChange={(cat) => setSearchParams({ category: cat })}
        />
      </div>
      
      <div className="products-main">
        <div className="products-header">
          <SearchBar
            value={search}
            onChange={(val) => setSearchParams({ search: val })}
          />
          <select
            value={sort}
            onChange={(e) => setSearchParams({ sort: e.target.value })}
          >
            <option value="createdAt,desc">Newest</option>
            <option value="price,asc">Price: Low to High</option>
            <option value="price,desc">Price: High to Low</option>
          </select>
        </div>
        
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="product-grid">
              {products?.content.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="pagination">
              {/* Add pagination controls */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
```

#### Product Detail Page

**File**: `frontend/src/pages/ProductDetail/index.tsx`

```typescript
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCartStore } from '@store/cartStore';
import apiClient from '@services/api';
import type { Product } from '@types/index';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await apiClient.get(`/products/${id}`);
      setProduct(response.data);
    };
    fetchProduct();
  }, [id]);
  
  const handleAddToCart = async () => {
    if (product) {
      await addItem(product, quantity);
      // Show success message
    }
  };
  
  if (!product) return <div>Loading...</div>;
  
  return (
    <div className="product-detail">
      <div className="product-images">
        <img src={product.imageUrls[0]} alt={product.title} />
      </div>
      
      <div className="product-info">
        <h1>{product.title}</h1>
        <p className="price">${product.price}</p>
        <p className="stock">
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </p>
        
        <div className="description">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>
        
        <div className="actions">
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
```

#### Checkout Page with Stripe

**File**: `frontend/src/pages/Checkout/index.tsx`

```typescript
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCartStore } from '@store/cartStore';
import { useAuthStore } from '@store/authStore';
import apiClient from '@services/api';
import type { Address } from '@types/index';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<Address>({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) return;
    
    setLoading(true);
    
    try {
      // Create order
      const orderResponse = await apiClient.post('/orders', {
        items: cart?.items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        shippingAddress,
        guestEmail: user?.email || undefined,
      });
      
      // Confirm payment
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/orders/${orderResponse.data.id}/success`,
        },
      });
      
      if (error) {
        console.error(error);
      } else {
        await clearCart();
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="shipping-address">
        <h3>Shipping Address</h3>
        {/* Address form fields */}
      </div>
      
      <div className="payment">
        <h3>Payment</h3>
        <PaymentElement />
      </div>
      
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Place Order'}
      </button>
    </form>
  );
};

export const Checkout = () => {
  const [clientSecret, setClientSecret] = useState('');
  
  useEffect(() => {
    const createPaymentIntent = async () => {
      const response = await apiClient.post('/payments/intent');
      setClientSecret(response.data.clientSecret);
    };
    createPaymentIntent();
  }, []);
  
  if (!clientSecret) return <div>Loading...</div>;
  
  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};
```

### 4. Seller Panel

**File**: `frontend/src/pages/Seller/Dashboard.tsx`

```typescript
import { Routes, Route, Link } from 'react-router-dom';
import { ProductManagement } from './ProductManagement';
import { OrderManagement } from './OrderManagement';
import { Analytics } from './Analytics';

export const SellerDashboard = () => {
  return (
    <div className="seller-dashboard">
      <aside className="sidebar">
        <nav>
          <Link to="/seller">Dashboard</Link>
          <Link to="/seller/products">Products</Link>
          <Link to="/seller/orders">Orders</Link>
          <Link to="/seller/analytics">Analytics</Link>
        </nav>
      </aside>
      
      <main className="content">
        <Routes>
          <Route index element={<Analytics />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="analytics" element={<Analytics />} />
        </Routes>
      </main>
    </div>
  );
};
```

### 5. Styling

**File**: `frontend/src/styles/index.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500&display=swap');

:root {
  --primary-color: #3B82F6;
  --secondary-color: #10B981;
  --accent-color: #F59E0B;
  --bg-color: #F9FAFB;
  --text-color: #111827;
  --border-color: #E5E7EB;
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Roboto', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-body);
  color: var(--text-color);
  background-color: var(--bg-color);
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 600;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #2563EB;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.product-card {
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* Add more styles as needed */
```

### 6. Theme Integration

**File**: `frontend/src/hooks/useTheme.ts`

```typescript
import { useEffect, useState } from 'react';
import type { ThemeConfig } from '@types/index';

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeConfig | null>(null);
  
  useEffect(() => {
    const loadTheme = async () => {
      const response = await fetch(import.meta.env.VITE_THEME_CONFIG);
      const config = await response.json();
      setTheme(config);
      
      // Apply theme to CSS variables
      document.documentElement.style.setProperty('--primary-color', config.primaryColor);
      document.documentElement.style.setProperty('--secondary-color', config.secondaryColor);
      document.documentElement.style.setProperty('--accent-color', config.accentColor);
      
      // Update document title and favicon
      document.title = config.brandName;
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        favicon.setAttribute('href', config.favicon);
      }
    };
    
    loadTheme();
  }, []);
  
  return theme;
};
```

### 7. Protected Routes

**File**: `frontend/src/components/common/ProtectedRoute.tsx`

```typescript
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';

interface ProtectedRouteProps {
  requiredRole?: 'CUSTOMER' | 'SELLER' | 'ADMIN';
}

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};
```

## Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage
pnpm test:coverage
```

## Building for Production

```bash
# Build
pnpm build

# Preview build
pnpm preview

# Analyze bundle
pnpm build --mode analyze
```

## Next Steps

1. Implement all pages
2. Create reusable components
3. Add form validation
4. Implement error handling
5. Add loading states
6. Create responsive design
7. Add animations and transitions
8. Implement accessibility features
9. Write tests
10. Optimize performance
