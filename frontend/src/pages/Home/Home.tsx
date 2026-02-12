import React, { useState, useEffect } from 'react';
import { Card, Button, Loading } from '@components/common';
import ProductCard from '@components/product/ProductCard';
import type { Product } from '@app-types/index';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock fetch featured products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockFeaturedProducts: Product[] = [
          {
            id: '1',
            sellerId: 'seller-1',
            title: 'Premium Wireless Headphones',
            description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
            price: 199.99,
            stock: 15,
            category: 'Electronics',
            imageUrls: ['https://picsum.photos/400/400?random=1'],
            isActive: true,
            isFeatured: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '3',
            sellerId: 'seller-2',
            title: 'Smart Home Security Camera',
            description: 'WiFi-enabled security camera with night vision and mobile app control.',
            price: 149.99,
            stock: 3,
            category: 'Electronics',
            imageUrls: ['https://picsum.photos/400/400?random=3'],
            isActive: true,
            isFeatured: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '6',
            sellerId: 'seller-3',
            title: 'JavaScript Programming Guide',
            description: 'Comprehensive guide to modern JavaScript programming with examples.',
            price: 34.99,
            stock: 100,
            category: 'Books',
            imageUrls: ['https://picsum.photos/400/400?random=6'],
            isActive: true,
            isFeatured: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '2',
            sellerId: 'seller-1',
            title: 'Organic Cotton T-Shirt',
            description: 'Comfortable and sustainable t-shirt made from 100% organic cotton.',
            price: 29.99,
            stock: 50,
            category: 'Clothing',
            imageUrls: ['https://picsum.photos/400/400?random=2'],
            isActive: true,
            isFeatured: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];

        setFeaturedProducts(mockFeaturedProducts);
      } catch (err) {
        setError('Failed to load featured products');
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loading size="lg" text="Loading home page..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <Card>
          <h2>Welcome to Shop</h2>
          <p>{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Discover Amazing Products
            </h1>
            <p className={styles.heroSubtitle}>
              Shop our curated collection of quality products from trusted sellers
            </p>
            <div className={styles.heroActions}>
              <Button size="lg" onClick={() => window.location.href = '/products'}>
                Shop Now
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featuredSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Products</h2>
            <p className={styles.sectionSubtitle}>
              Hand-picked products we think you'll love
            </p>
          </div>
          
          {featuredProducts.length > 0 ? (
            <div className={styles.featuredGrid}>
              {featuredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="default"
                  showAddToCart={true}
                />
              ))}
            </div>
          ) : (
            <div className={styles.noProducts}>
              <Card>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <h3>No featured products available</h3>
                  <Button onClick={() => window.location.href = '/products'}>
                    Browse All Products
                  </Button>
                </div>
              </Card>
            </div>
          )}
          
          <div className={styles.viewAllButton}>
            <Button variant="outline" onClick={() => window.location.href = '/products'}>
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className="container">
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🚚</div>
              <h3>Fast Shipping</h3>
              <p>Free shipping on orders over $50</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔒</div>
              <h3>Secure Payment</h3>
              <p>Safe and secure payment processing</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>↩️</div>
              <h3>Easy Returns</h3>
              <p>30-day return policy on all items</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎧</div>
              <h3>24/7 Support</h3>
              <p>Customer support around the clock</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categoriesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Shop by Category</h2>
            <p className={styles.sectionSubtitle}>
              Explore our wide range of product categories
            </p>
          </div>
          
          <div className={styles.categoriesGrid}>
            {[
              { name: 'Electronics', icon: '📱', count: 245 },
              { name: 'Clothing', icon: '👕', count: 189 },
              { name: 'Home & Garden', icon: '🏠', count: 156 },
              { name: 'Sports & Outdoors', icon: '⚽', count: 98 },
              { name: 'Books', icon: '📚', count: 267 },
              { name: 'Toys & Games', icon: '🎮', count: 134 }
            ].map(category => (
              <div 
                key={category.name}
                className={styles.categoryCard}
                onClick={() => window.location.href = `/products?category=${encodeURIComponent(category.name)}`}
              >
                <div className={styles.categoryIcon}>{category.icon}</div>
                <h4>{category.name}</h4>
                <span className={styles.categoryCount}>{category.count} products</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletterSection}>
        <div className="container">
          <div className={styles.newsletterContent}>
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for exclusive offers and new product updates</p>
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.newsletterInput}
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;