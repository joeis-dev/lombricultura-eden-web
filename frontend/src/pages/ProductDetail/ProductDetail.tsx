import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, Button, Loading } from '@components/common';
import { useCartStore } from '@store/cartStore';
import type { Product, Review } from '@app-types/index';
import styles from './ProductDetail.module.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  
  const { addItem, fetchCart } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockProducts: Record<string, Product> = {
          '1': {
            id: '1',
            sellerId: 'seller-1',
            title: 'Premium Wireless Headphones',
            description: 'Experience immersive sound with our Premium Wireless Headphones. Featuring advanced noise cancellation technology, 40-hour battery life, and premium memory foam ear cushions for ultimate comfort. Perfect for music lovers, professionals, and anyone who demands the best audio quality.\n\nFeatures:\n- Active Noise Cancellation (ANC)\n- 40-hour battery life\n- Bluetooth 5.0 connectivity\n- Premium memory foam ear cushions\n- Built-in microphone for calls\n- Fast charging support',
            price: 199.99,
            stock: 15,
            category: 'Electronics',
            imageUrls: [
              'https://picsum.photos/600/600?random=1',
              'https://picsum.photos/600/600?random=11',
              'https://picsum.photos/600/600?random=21',
              'https://picsum.photos/600/600?random=31'
            ],
            isActive: true,
            isFeatured: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          '2': {
            id: '2',
            sellerId: 'seller-1',
            title: 'Organic Cotton T-Shirt',
            description: 'Crafted from 100% organic cotton, this comfortable t-shirt is perfect for everyday wear. Sustainable, soft, and stylish.',
            price: 29.99,
            stock: 50,
            category: 'Clothing',
            imageUrls: [
              'https://picsum.photos/600/600?random=2',
              'https://picsum.photos/600/600?random=12'
            ],
            isActive: true,
            isFeatured: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          '3': {
            id: '3',
            sellerId: 'seller-2',
            title: 'Smart Home Security Camera',
            description: 'Keep your home safe with our WiFi-enabled security camera featuring night vision, motion detection, and mobile app control.',
            price: 149.99,
            stock: 3,
            category: 'Electronics',
            imageUrls: [
              'https://picsum.photos/600/600?random=3',
              'https://picsum.photos/600/600?random=13'
            ],
            isActive: true,
            isFeatured: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          '4': {
            id: '4',
            sellerId: 'seller-2',
            title: 'Yoga Mat Premium',
            description: 'Non-slip exercise yoga mat with carrying strap and alignment markers. Eco-friendly materials.',
            price: 39.99,
            stock: 25,
            category: 'Sports & Outdoors',
            imageUrls: [
              'https://picsum.photos/600/600?random=4',
              'https://picsum.photos/600/600?random=14'
            ],
            isActive: true,
            isFeatured: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          '5': {
            id: '5',
            sellerId: 'seller-3',
            title: 'Ceramic Plant Pot Set',
            description: 'Set of 3 handmade ceramic plant pots with drainage holes. Perfect for indoor plants.',
            price: 45.99,
            stock: 0,
            category: 'Home & Garden',
            imageUrls: [
              'https://picsum.photos/600/600?random=5',
              'https://picsum.photos/600/600?random=15'
            ],
            isActive: true,
            isFeatured: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          '6': {
            id: '6',
            sellerId: 'seller-3',
            title: 'JavaScript Programming Guide',
            description: 'Comprehensive guide to modern JavaScript programming with practical examples and exercises.',
            price: 34.99,
            stock: 100,
            category: 'Books',
            imageUrls: [
              'https://picsum.photos/600/600?random=6',
              'https://picsum.photos/600/600?random=16'
            ],
            isActive: true,
            isFeatured: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        };

        const foundProduct = mockProducts[id];
        if (foundProduct) {
          setProduct(foundProduct);
          if (foundProduct.imageUrls.length > 0) {
            setSelectedImage(0);
          }
        } else {
          setError('Product not found');
        }

        const mockReviews: Review[] = [
          {
            id: '1',
            productId: id || '1',
            userId: 'user-1',
            rating: 5,
            comment: 'Excellent product! Exceeded my expectations.',
            isVerifiedPurchase: true,
            isApproved: true,
            createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
            updatedAt: new Date(Date.now() - 86400000 * 5).toISOString()
          },
          {
            id: '2',
            productId: id || '1',
            userId: 'user-2',
            rating: 4,
            comment: 'Great quality, fast shipping. Recommended!',
            isVerifiedPurchase: true,
            isApproved: true,
            createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
            updatedAt: new Date(Date.now() - 86400000 * 10).toISOString()
          }
        ];
        setReviews(mockReviews);
      } catch (err) {
        setError('Failed to load product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    try {
      await addItem(product, quantity);
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
      await addItem(product, quantity);
      await fetchCart();
      navigate('/checkout');
    } catch (err) {
      console.error('Error during buy now:', err);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loading size="lg" text="Loading product..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.errorContainer}>
        <Card>
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <h2>Product Not Found</h2>
            <p>{error || 'The product you are looking for does not exist.'}</p>
            <Button onClick={() => navigate('/products')}>
              Browse Products
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className={styles.productDetailPage}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link to="/products">Products</Link>
          {product.category && (
            <>
              <span className={styles.breadcrumbSeparator}>/</span>
              <Link to={`/products?category=${product.category}`}>{product.category}</Link>
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
                <div className={styles.placeholderImage}>
                  📦
                </div>
              )}
            </div>
            {product.imageUrls.length > 1 && (
              <div className={styles.thumbnailList}>
                {product.imageUrls.map((image, index) => (
                  <button
                    key={index}
                    className={`${styles.thumbnail} ${selectedImage === index ? styles.thumbnailActive : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.title} - Image ${index + 1}`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-image.jpg';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.productInfo}>
            {product.category && (
              <Link to={`/products?category=${product.category}`} className={styles.category}>
                {product.category}
              </Link>
            )}
            
            <h1 className={styles.title}>{product.title}</h1>
            
            {reviews.length > 0 && (
              <div className={styles.rating}>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= averageRating ? styles.starFilled : styles.starEmpty}>
                      ★
                    </span>
                  ))}
                </div>
                <span className={styles.ratingText}>
                  {averageRating.toFixed(1)} ({reviews.length} reviews)
                </span>
              </div>
            )}

            <div className={styles.priceSection}>
              <span className={styles.price}>${product.price.toFixed(2)}</span>
            </div>

            <div className={styles.stockSection}>
              {isOutOfStock ? (
                <span className={styles.outOfStock}>Out of Stock</span>
              ) : isLowStock ? (
                <span className={styles.lowStock}>Only {product.stock} left!</span>
              ) : (
                <span className={styles.inStock}>In Stock ({product.stock} available)</span>
              )}
            </div>

            <div className={styles.descriptionSection}>
              <h3>Description</h3>
              <div className={styles.description}>
                {product.description?.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>

            {!isOutOfStock && (
              <div className={styles.quantitySection}>
                <label>Quantity:</label>
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
                    onChange={(e) => handleQuantityChange(Number(e.target.value))}
                    min={1}
                    max={product.stock}
                    className={styles.quantityInput}
                  />
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
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
                {isAddingToCart ? 'Adding...' : addedToCart ? 'Added!' : 'Add to Cart'}
              </Button>
              <Button
                onClick={handleBuyNow}
                disabled={isOutOfStock || isAddingToCart}
                className={styles.buyNowButton}
              >
                Buy Now
              </Button>
            </div>

            <div className={styles.productMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>SKU:</span>
                <span className={styles.metaValue}>{product.id}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Category:</span>
                <span className={styles.metaValue}>{product.category || 'Uncategorized'}</span>
              </div>
            </div>
          </div>
        </div>

        {reviews.length > 0 && (
          <div className={styles.reviewsSection}>
            <h2>Customer Reviews</h2>
            <div className={styles.reviewsList}>
              {reviews.map((review) => (
                <Card key={review.id} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewRating}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={star <= review.rating ? styles.starFilled : styles.starEmpty}>
                          ★
                        </span>
                      ))}
                    </div>
                    {review.isVerifiedPurchase && (
                      <span className={styles.verifiedBadge}>Verified Purchase</span>
                    )}
                  </div>
                  {review.comment && (
                    <p className={styles.reviewComment}>{review.comment}</p>
                  )}
                  <div className={styles.reviewDate}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
