import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card } from '@components/common';
import { useCartStore } from '@store/cartStore';
import styles from './Cart.module.css';

const formatPrice = (value: number) =>
  `$${value.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalItems = useCartStore((state) => state.items.reduce(
    (total, item) => total + item.quantity,
    0
  ));
  const totalPrice = useCartStore((state) => state.items.reduce(
    (total, item) => {
      const unitPrice = item.variant ? item.variant.price : item.product.price;
      return total + unitPrice * item.quantity;
    },
    0
  ));

  const handleQuantityChange = (itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity);
  };

  if (items.length === 0) {
    return (
      <div className={styles.cartPage}>
        <div className="container">
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🛒</div>
            <h1 className={styles.emptyTitle}>Tu carrito está vacío</h1>
            <p className={styles.emptyText}>
              Aún no has agregado productos. Explora nuestra tienda para encontrar
              todo para tu huerto y jardín.
            </p>
            <Link to="/" className={styles.continueLink}>
              Explorar productos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className="container">
        <h1 className={styles.pageTitle}>Tu Carrito</h1>
        <p className={styles.pageSubtitle}>
          {totalItems} producto{totalItems !== 1 ? 's' : ''} en tu carrito
        </p>

        <div className={styles.cartLayout}>
          <section className={styles.cartItems}>
            {items.map((item) => {
              const unitPrice = item.variant ? item.variant.price : item.product.price;
              const lineTotal = unitPrice * item.quantity;
              const maxStock = item.variant?.stock ?? item.product.stock;

              return (
                <Card key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    {item.product.imageUrls && item.product.imageUrls.length > 0 ? (
                      <img
                        src={item.product.imageUrls[0]}
                        alt={item.product.title}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-image.jpg';
                        }}
                      />
                    ) : (
                      <div className={styles.itemPlaceholder}>📦</div>
                    )}
                  </div>

                  <div className={styles.itemInfo}>
                    <Link
                      to={`/products/${item.product.id}`}
                      className={styles.itemTitle}
                    >
                      {item.product.title}
                    </Link>
                    {item.variant && (
                      <span className={styles.itemVariant}>
                        {item.variant.label}
                      </span>
                    )}
                    <span className={styles.itemPrice}>
                      {formatPrice(unitPrice)}
                    </span>
                  </div>

                  <div className={styles.itemControls}>
                    <div className={styles.quantitySelector}>
                      <button
                        className={styles.quantityButton}
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        className={styles.quantityInput}
                        value={item.quantity}
                        min={1}
                        max={maxStock}
                        onChange={(e) =>
                          handleQuantityChange(item.id, Number(e.target.value))
                        }
                      />
                      <button
                        className={styles.quantityButton}
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        disabled={item.quantity >= maxStock}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>

                    <span className={styles.lineTotal}>{formatPrice(lineTotal)}</span>

                    <button
                      className={styles.removeButton}
                      onClick={() => removeItem(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </Card>
              );
            })}
          </section>

          <aside className={styles.cartSummary}>
            <Card>
              <Card.Header>
                <h3 className={styles.summaryTitle}>Resumen</h3>
              </Card.Header>
              <Card.Body>
                <div className={styles.summaryRow}>
                  <span>Productos ({totalItems})</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Envío</span>
                  <span className={styles.summaryMuted}>Se calcula al finalizar</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>

                <Button
                  fullWidth
                  size="lg"
                  className={styles.checkoutButton}
                  onClick={() => navigate('/checkout')}
                >
                  Proceder al Pago
                </Button>

                <Link to="/" className={styles.continueShopping}>
                  Seguir comprando
                </Link>

                <button className={styles.clearCartButton} onClick={clearCart}>
                  Vaciar carrito
                </button>
              </Card.Body>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;