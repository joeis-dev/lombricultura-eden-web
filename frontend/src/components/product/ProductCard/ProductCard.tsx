import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@components/common';
import type { Product } from '@app-types/index';
import styles from './ProductCard.module.css';

export interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'detailed';
  showAddToCart?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'default',
  showAddToCart = true,
  className = '',
}) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Add to cart functionality
    console.log('Add to cart:', product.title);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Quick view functionality
    console.log('Quick view:', product.title);
  };

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <Card 
      variant="default" 
      hover={true}
      className={`${styles.productCard} ${styles[`productCard--${variant}`]} ${className}`}
    >
      {/* Product Image */}
      <div className={styles.productImage}>
        <Link to={`/products/${product.id}`}>
          {product.imageUrls && product.imageUrls.length > 0 ? (
            <img 
              src={product.imageUrls[0]} 
              alt={product.title}
              className={styles.image}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-image.jpg';
              }}
            />
          ) : (
            <div className={styles.placeholderImage}>
              📦
            </div>
          )}
        </Link>

        {/* Product Badges */}
        <div className={styles.productBadges}>
          {isOutOfStock && (
            <span className={`${styles.badge} ${styles.badgeOutOfStock}`}>
              Out of Stock
            </span>
          )}
          {isLowStock && (
            <span className={`${styles.badge} ${styles.badgeLowStock}`}>
              Only {product.stock} left
            </span>
          )}
          {product.isFeatured && (
            <span className={`${styles.badge} ${styles.badgeFeatured}`}>
              Featured
            </span>
          )}
        </div>

        {/* Quick Actions */}
        {variant !== 'compact' && (
          <div className={styles.quickActions}>
            <button
              className={styles.quickActionButton}
              onClick={handleQuickView}
              aria-label="Quick view"
              title="Quick view"
            >
              👁️
            </button>
            <button
              className={styles.quickActionButton}
              onClick={() => {
                // TODO: Add to wishlist
                console.log('Add to wishlist:', product.title);
              }}
              aria-label="Add to wishlist"
              title="Add to wishlist"
            >
              ❤️
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={styles.productInfo}>
        {/* Category */}
        {product.category && (
          <div className={styles.productCategory}>
            {product.category}
          </div>
        )}

        {/* Title */}
        <h3 className={styles.productTitle}>
          <Link to={`/products/${product.id}`}>
            {product.title}
          </Link>
        </h3>

        {/* Description (only for detailed variant) */}
        {variant === 'detailed' && product.description && (
          <p className={styles.productDescription}>
            {product.description.length > 100 
              ? `${product.description.substring(0, 100)}...`
              : product.description
            }
          </p>
        )}

        {/* Price and Stock */}
        <div className={styles.productMeta}>
          <div className={styles.priceContainer}>
            <span className={styles.price}>
              ${product.price.toFixed(2)}
            </span>
            {product.stock > 0 && (
              <span className={styles.stockInfo}>
                In stock ({product.stock} available)
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {showAddToCart && (
          <div className={styles.productActions}>
            <button
              className={`${styles.addToCartButton} ${isOutOfStock ? styles.disabled : ''}`}
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;