import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input, Loading } from '@components/common';
import ProductCard from '@components/product/ProductCard';
import { getProducts } from '@services/productService';
import type { Product } from '@app-types/index';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'Todas';

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    let cancelled = false;
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getProducts();
        if (!cancelled) {
          setProducts(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError('No se pudieron cargar los productos');
          console.error('Error fetching products:', err);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  const visibleCategories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category).filter((c): c is string => Boolean(c)))
    );
    return uniqueCategories.sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch =
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === 'Todas' || p.category === selectedCategory;
        return matchesSearch && matchesCategory && p.isActive;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'name':
            return a.title.localeCompare(b.title);
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          default:
            return 0;
        }
      });
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'Todas') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  if (isLoading) {
    return (
      <div className={styles.storePage}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
          <Loading size="lg" text="Cargando productos..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.storePage}>
        <div className="container">
          <div className={styles.noResults}>
            <h3>No se pudieron cargar los productos</h3>
            <p>{error}</p>
            <button className={styles.clearButton} onClick={() => window.location.reload()}>
              Intentar de Nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.storePage}>
      {/* Catalog */}
      <section className={styles.catalogSection}>
        <div className="container">
          <div className={styles.catalogHeader}>
            <h2 className={styles.catalogTitle}>Catálogo de Productos</h2>
            <p className={styles.catalogSubtitle}>
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} disponible{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className={styles.toolbar}>
            <div className={styles.searchContainer}>
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon="🔍"
              />
            </div>

            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Nombre</option>
              <option value="price-low">Menor precio</option>
              <option value="price-high">Mayor precio</option>
              <option value="newest">Más recientes</option>
            </select>
          </div>

          <div className={styles.categoryPills}>
            <button
              className={`${styles.categoryPill} ${selectedCategory === 'Todas' ? styles.active : ''}`}
              onClick={() => handleCategoryChange('Todas')}
            >
              Todas
            </button>
            {visibleCategories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryPill} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredProducts.length > 0 ? (
            <div className={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="default"
                  showAddToCart={true}
                />
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <h3>No se encontraron productos</h3>
              <p>Intenta ajustar tus filtros o términos de búsqueda</p>
              <button
                className={styles.clearButton}
                onClick={() => {
                  setSearchTerm('');
                  handleCategoryChange('Todas');
                }}
              >
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;