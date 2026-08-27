import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, Button, Loading } from '@components/common';
import { useCartStore } from '@store/cartStore';
import { products } from '@data/products';
import type { Product } from '@app-types/index';
import styles from './ProductDetail.module.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addItem, fetchCart } = useCartStore();

  useEffect(() => {
    setLoading(true);
    const found = products.find((p) => p.id === id);
    if (found) {
      setProduct(found);
      const activeVariants = found.variants.filter((v) => v.isActive);
      if (activeVariants.length > 0) {
        setSelectedVariantId(activeVariants[0].id);
      }
      setSelectedImage(0);
      setError(null);
    } else {
      setError('Producto no encontrado');
    }
    setLoading(false);
  }, [id]);

  const selectedVariant = useMemo(() => {
    if (!product) return null;
    return product.variants.find((v) => v.id === selectedVariantId) || null;
  }, [product, selectedVariantId]);

  const displayPrice = selectedVariant ? selectedVariant.price : product?.price ?? 0;
  const displayStock = selectedVariant ? selectedVariant.stock : product?.stock ?? 0;
  const isOutOfStock = displayStock <= 0;
  const isLowStock = displayStock > 0 && displayStock <= 5;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= displayStock) {
      setQuantity(newQuantity);
    }
  };

  const handleVariantChange = (variantId: string) => {
    setSelectedVariantId(variantId);
    setQuantity(1);
  };

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAddingToCart(true);
    try {
      await addItem(product, quantity, selectedVariant ?? undefined);
      await fetchCart();
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (err) {
      console.error('Error adding to cart:', err);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;

    try {
      await addItem(product, quantity, selectedVariant ?? undefined);
      await fetchCart();
      navigate('/checkout');
    } catch (err) {
      console.error('Error during buy now:', err);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loading size="lg" text="Cargando producto..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.errorContainer}>
        <Card>
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <h2>Producto No Encontrado</h2>
            <p>{error || 'El producto que buscas no existe.'}</p>
            <Button onClick={() => navigate('/products')}>Ver Productos</Button>
          </div>
        </Card>
      </div>
    );
  }

  const activeVariants = product.variants.filter((v) => v.isActive);

  return (
    <div className={styles.productDetailPage}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link to="/">Inicio</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link to="/products">Productos</Link>
          {product.category && (
            <>
              <span className={styles.breadcrumbSeparator}>/</span>
              <Link to={`/products?category=${product.category}`}>
                {product.category}
              </Link>
            </>
          )}
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{product.title}</span>
        </div>

        <div className={styles.productGrid}>
          <div className={styles.productGallery}>
            <div className={styles.mainImage}>
              {product.imageUrls && product.imageUrls.length > 0 ? (
                <img
                  src={product.imageUrls[selectedImage]}
                  alt={product.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-image.jpg';
                  }}
                />
              ) : (
                <div className={styles.placeholderImage}>📦</div>
              )}
            </div>
          </div>

          <div className={styles.productInfo}>
            {product.category && (
              <Link
                to={`/products?category=${product.category}`}
                className={styles.category}
              >
                {product.category}
              </Link>
            )}

            <h1 className={styles.title}>{product.title}</h1>

            <div className={styles.priceSection}>
              <span className={styles.price}>
                ${displayPrice.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
              </span>
              <span className={styles.currencyBadge}>MXN</span>
            </div>

            <div className={styles.stockSection}>
              {isOutOfStock ? (
                <span className={styles.outOfStock}>Agotado</span>
              ) : isLowStock ? (
                <span className={styles.lowStock}>
                  ¡Solo quedan {displayStock}!
                </span>
              ) : (
                <span className={styles.inStock}>
                  Disponible ({displayStock} en stock)
                </span>
              )}
            </div>

            {activeVariants.length > 0 && (
              <div className={styles.variantSection}>
                <label className={styles.variantLabel}>Presentación:</label>
                <select
                  className={styles.variantSelect}
                  value={selectedVariantId}
                  onChange={(e) => handleVariantChange(e.target.value)}
                >
                  {activeVariants.map((variant) => (
                    <option key={variant.id} value={variant.id} disabled={variant.stock <= 0}>
                      {variant.label} — ${variant.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                      {variant.stock <= 0 ? ' (Agotado)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className={styles.descriptionSection}>
              <h3>Descripción</h3>
              <div className={styles.description}>
                {product.description?.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>

            {!isOutOfStock && (
              <div className={styles.quantitySection}>
                <label>Cantidad:</label>
                <div className={styles.quantitySelector}>
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className={styles.quantityButton}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(Number(e.target.value))
                    }
                    min={1}
                    max={displayStock}
                    className={styles.quantityInput}
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= displayStock}
                    className={styles.quantityButton}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className={styles.actionButtons}>
              <Button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAddingToCart}
                variant="outline"
                className={styles.addToCartButton}
              >
                {isAddingToCart
                  ? 'Agregando...'
                  : addedToCart
                  ? '¡Agregado!'
                  : 'Agregar al Carrito'}
              </Button>
              <Button
                onClick={handleBuyNow}
                disabled={isOutOfStock || isAddingToCart}
                className={styles.buyNowButton}
              >
                Comprar Ahora
              </Button>
            </div>

            <div className={styles.productMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>SKU:</span>
                <span className={styles.metaValue}>{product.id.slice(0, 8).toUpperCase()}</span>
              </div>
              {product.category && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Categoría:</span>
                  <span className={styles.metaValue}>{product.category}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
