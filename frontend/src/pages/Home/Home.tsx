import React, { useState, useEffect } from 'react';
import { Card, Button, Loading } from '@components/common';
import ProductCard from '@components/product/ProductCard';
import PromotionsCarousel from '@components/home/PromotionsCarousel/PromotionsCarousel';
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
            title: 'Humus de Lombriz Premium 5kg',
            description: 'Fertilizante orgánico 100% natural, rico en nutrientes esenciales para plantas saludables. Ideal para huertos y jardines.',
            price: 249.99,
            stock: 50,
            category: 'Humus de Lombriz',
            imageUrls: ['https://picsum.photos/400/400?random=humus1'],
            isActive: true,
            isFeatured: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '2',
            sellerId: 'seller-1',
            title: 'Lombrices Rojas Californianas - 500uds',
            description: 'Criadero de lombrices rojas californianas de alta calidad para compostaje doméstico. Incluye manual de cuidados.',
            price: 199.99,
            stock: 30,
            category: 'Lombrices',
            imageUrls: ['https://picsum.photos/400/400?random=worms1'],
            isActive: true,
            isFeatured: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '3',
            sellerId: 'seller-2',
            title: 'Kit de Compostaje Doméstico',
            description: 'Todo lo necesario para iniciar tu compostador en casa. Incluye lombrices, sustrato, guía completa y contenedor.',
            price: 599.99,
            stock: 15,
            category: 'Kits de Compostaje',
            imageUrls: ['https://picsum.photos/400/400?random=kit1'],
            isActive: true,
            isFeatured: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '4',
            sellerId: 'seller-2',
            title: 'Humus Líquido - Extracto de Lombriz 1L',
            description: 'Fertilizante líquido concentrado de fácil aplicación. Resultados visibles en 7 días.',
            price: 129.99,
            stock: 75,
            category: 'Fertilizantes Líquidos',
            imageUrls: ['https://picsum.photos/400/400?random=liquid1'],
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