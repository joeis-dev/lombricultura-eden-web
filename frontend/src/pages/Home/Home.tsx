import React, { useState, useEffect } from 'react';
import { Card, Button, Loading } from '@components/common';
import ProductCard from '@components/product/ProductCard';
import PromotionsCarousel from '@components/home/PromotionsCarousel/PromotionsCarousel';
import { products } from '@data/products';
import type { Product } from '@app-types/index';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setFeaturedProducts(products.filter(p => p.isFeatured));
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
        <Loading size="lg" text="Cargando Lombricultura Edén..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <Card>
          <h2>Bienvenido a Lombricultura Edén</h2>
          <p>{error}</p>
          <Button onClick={() => window.location.reload()}>Intentar de Nuevo</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      {/* Promotions Carousel */}
      <PromotionsCarousel />

      {/* Featured Products */}
      <section className={styles.featuredSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Productos Destacados</h2>
            <p className={styles.sectionSubtitle}>
              Los favoritos de nuestros clientes para un jardín próspero
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
                  <h3>No hay productos destacados disponibles</h3>
                  <Button onClick={() => window.location.href = '/products'}>
                    Ver Todos los Productos
                  </Button>
                </div>
              </Card>
            </div>
          )}
          
          <div className={styles.viewAllButton}>
            <Button variant="outline" onClick={() => window.location.href = '/products'}>
              Ver Catálogo Completo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className="container">
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌱</div>
              <h3>100% Orgánico</h3>
              <p>Productos naturales sin químicos sintéticos</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>♻️</div>
              <h3>Sustentable</h3>
              <p>Compostaje que ayuda al medio ambiente</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🚚</div>
              <h3>Envío Rápido</h3>
              <p>Entrega en 24-48 horas a todo México</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📚</div>
              <h3>Asesoría Experta</h3>
              <p>Guías y soporte para tu lombricultura</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categoriesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Categorías</h2>
            <p className={styles.sectionSubtitle}>
              Explora nuestra línea de productos para lombricultura
            </p>
          </div>
          
          <div className={styles.categoriesGrid}>
            {[
              { name: 'Humus de Lombriz', icon: '🌿', count: 12 },
              { name: 'Lombrices', icon: '🪱', count: 5 },
              { name: 'Kits de Compostaje', icon: '📦', count: 8 },
              { name: 'Fertilizantes', icon: '💧', count: 15 },
              { name: 'Contenedores', icon: '🏠', count: 6 },
              { name: 'Accesorios', icon: '🛠️', count: 20 }
            ].map(category => (
              <div 
                key={category.name}
                className={styles.categoryCard}
                onClick={() => window.location.href = `/products?category=${encodeURIComponent(category.name)}`}
              >
                <div className={styles.categoryIcon}>{category.icon}</div>
                <h4>{category.name}</h4>
                <span className={styles.categoryCount}>{category.count} productos</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletterSection}>
        <div className="container">
          <div className={styles.newsletterContent}>
            <h2>Únete a la Comunidad Edén</h2>
            <p>Recibe tips de lombricultura, ofertas exclusivas y novedades directo en tu correo</p>
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className={styles.newsletterInput}
                required
              />
              <Button type="submit">Suscribirme</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;