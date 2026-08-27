import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, Input, Loading } from '@components/common';
import ProductCard from '@components/product/ProductCard';
import { getProducts } from '@services/productService';
import type { Product } from '@app-types/index';
import styles from '../Products/Products.module.css';

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'Todas';

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category).filter((c): c is string => Boolean(c)))
    );
    return ['Todas', ...uniqueCategories.sort((a, b) => a.localeCompare(b))];
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
      <div className={styles.productsPage}>
        <div className={`container ${styles.loadingContainer}`}>
          <Loading size="lg" text="Cargando productos..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.productsPage}>
        <div className={`container ${styles.errorContainer}`}>
          <Card>
            <h2>Error al cargar productos</h2>
            <p>{error}</p>
            <button className={styles.clearButton} onClick={() => window.location.reload()}>
              Intentar de Nuevo
            </button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.productsPage}>
      <div className="container">
        <div className={styles.productsLayout}>
          <aside className={styles.filtersSidebar}>
            <Card>
              <Card.Header>
                <h3>Filtros</h3>
              </Card.Header>
              <Card.Body>
                <div className={styles.filterSection}>
                  <h4>Buscar</h4>
                  <Input
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    leftIcon="🔍"
                  />
                </div>

                <div className={styles.filterSection}>
                  <h4>Categorías</h4>
                  <div className={styles.categoryList}>
                    {categories.map((category) => (
                      <label key={category} className={styles.categoryItem}>
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => handleCategoryChange(category)}
                        />
                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </aside>

          <main className={styles.mainContent}>
            <div className={styles.toolbar}>
              <div className={styles.toolbarLeft}>
                <p className={styles.resultsCount}>
                  {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className={styles.toolbarRight}>
                <div className={styles.viewToggle}>
                  <button
                    className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
                    onClick={() => setViewMode('grid')}
                    aria-label="Vista cuadrícula"
                  >
                    ⊞
                  </button>
                  <button
                    className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
                    onClick={() => setViewMode('list')}
                    aria-label="Vista lista"
                  >
                    ☰
                  </button>
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
            </div>

            {filteredProducts.length > 0 ? (
              <div
                className={`${styles.productsContainer} ${
                  styles[`productsContainer--${viewMode}`]
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant={viewMode === 'list' ? 'compact' : 'default'}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <Card>
                  <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <h3>No se encontraron productos</h3>
                    <p>Intenta ajustar tus filtros o términos de búsqueda</p>
                    <button
                      className={styles.clearButton}
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('Todas');
                      }}
                    >
                      Limpiar Filtros
                    </button>
                  </div>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;