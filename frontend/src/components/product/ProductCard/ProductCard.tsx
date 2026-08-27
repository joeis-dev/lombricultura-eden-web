import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@components/common';
import type { Product } from '@app-types/index';
import { getMinPrice, getTotalStock } from '@data/products';
import styles from './ProductCard.module.css';

export interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'detailed' | 'half';
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'default',
  className = '',
}) => {
  const navigate = useNavigate();

  const handleAddToFavorites = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/login');
  };

  const hasVariants = product.variants && product.variants.length > 0;
  const totalStock = getTotalStock(product);
  const minPrice = getMinPrice(product);
  const isOutOfStock = totalStock <= 0;
  const isLowStock = totalStock > 0 && totalStock <= 5;

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
              Agotado
            </span>
          )}
          {isLowStock && (
            <span className={`${styles.badge} ${styles.badgeLowStock}`}>
              ¡Solo quedan {totalStock}!
            </span>
          )}
          {product.isOnSale && product.discountPercent ? (
            <span className={`${styles.badge} ${styles.badgeSale}`}>
              Oferta: {product.discountPercent}% descuento
            </span>
          ) : null}
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <button
            className={styles.quickActionButton}
            onClick={handleAddToFavorites}
            aria-label="Agregar a favoritos"
            title="Agregar a favoritos"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
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
              {hasVariants ? 'Desde ' : ''}${minPrice.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
            </span>
            <span className={styles.currencyTag}>MXN</span>
            {totalStock > 0 && (
              <span className={styles.stockInfo}>
                {totalStock} disponible{totalStock !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;