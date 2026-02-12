import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Loading } from '@components/common';
import ProductCard from '@components/product/ProductCard';
import type { Product } from '@app-types/index';
import styles from './Products.module.css';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Mock categories - in real app, this would come from API
  const categories = [
    'All Categories',
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports & Outdoors',
    'Books',
    'Toys & Games',
    'Health & Beauty'
  ];

  // Mock fetch products - in real app, this would be an API call
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock products data
        const mockProducts: Product[] = [
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
            id: '2',
            sellerId: 'seller-1',
            title: 'Organic Cotton T-Shirt',
            description: 'Comfortable and sustainable t-shirt made from 100% organic cotton.',
            price: 29.99,
            stock: 50,
            category: 'Clothing',
            imageUrls: ['https://picsum.photos/400/400?random=2'],
            isActive: true,
            isFeatured: false,
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
            id: '4',
            sellerId: 'seller-2',
            title: 'Yoga Mat Premium',
            description: 'Non-slip exercise yoga mat with carrying strap and alignment markers.',
            price: 39.99,
            stock: 25,
            category: 'Sports & Outdoors',
            imageUrls: ['https://picsum.photos/400/400?random=4'],
            isActive: true,
            isFeatured: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '5',
            sellerId: 'seller-3',
            title: 'Ceramic Plant Pot Set',
            description: 'Set of 3 handmade ceramic plant pots with drainage holes.',
            price: 45.99,
            stock: 0,
            category: 'Home & Garden',
            imageUrls: ['https://picsum.photos/400/400?random=5'],
            isActive: true,
            isFeatured: false,
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
          }
        ];

        setProducts(mockProducts);
        setTotalPages(1); // Mock pagination
      } catch (err) {
        setError('Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || 
                             selectedCategory === '' || 
                             product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice && product.isActive;
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

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loading size="lg" text="Loading products..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <Card>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.productsPage}>
      {/* Page Header */}
      <div className="container">
        <div className={styles.pageHeader}>
          <h1>Products</h1>
          <p>Discover our amazing collection of quality products</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.productsLayout}>
          {/* Filters Sidebar */}
          <aside className={styles.filtersSidebar}>
            <Card>
              <Card.Header>
                <h3>Filters</h3>
              </Card.Header>
              <Card.Body>
                {/* Search */}
                <div className={styles.filterSection}>
                  <h4>Search</h4>
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    leftIcon="🔍"
                  />
                </div>

                {/* Categories */}
                <div className={styles.filterSection}>
                  <h4>Categories</h4>
                  <div className={styles.categoryList}>
                    {categories.map(category => (
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

                {/* Price Range */}
                <div className={styles.filterSection}>
                  <h4>Price Range</h4>
                  <div className={styles.priceRange}>
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(Number(e.target.value), priceRange[1])}
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(priceRange[0], Number(e.target.value))}
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </aside>

          {/* Main Content */}
          <main className={styles.mainContent}>
            {/* Toolbar */}
            <div className={styles.toolbar}>
              <div className={styles.toolbarLeft}>
                <p className={styles.resultsCount}>
                  {filteredProducts.length} products found
                </p>
              </div>
              
              <div className={styles.toolbarRight}>
                {/* View Mode Toggle */}
                <div className={styles.viewToggle}>
                  <button
                    className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                  >
                    ⊞
                  </button>
                  <button
                    className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                  >
                    ☰
                  </button>
                </div>

                {/* Sort */}
                <select
                  className={styles.sortSelect}
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <div className={`${styles.productsContainer} ${styles[`productsContainer--${viewMode}`]}`}>
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant={viewMode === 'list' ? 'compact' : 'default'}
                    showAddToCart={true}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <Card>
                  <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <h3>No products found</h3>
                    <p>Try adjusting your filters or search terms</p>
                    <Button onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All Categories');
                      setPriceRange([0, 1000]);
                    }}>
                      Clear Filters
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                >
                  Previous
                </Button>
                <span className={styles.pageInfo}>
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                >
                  Next
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;