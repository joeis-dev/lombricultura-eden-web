import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@components/common';
import styles from './PromotionsCarousel.module.css';

interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage?: string;
  badge?: string;
}

const promotions: Promotion[] = [
  {
    id: '1',
    title: 'HUMUS DE LOMBriz PREMIUM',
    subtitle: 'Nutrición 100% Orgánica',
    description: 'Transforma tu jardín con el mejor fertilizante natural. Rico en nutrientes esenciales para plantas saludables.',
    buttonText: 'Comprar Ahora',
    buttonLink: '/products?category=Humus%20de%20Lombriz',
    badge: 'MÁS VENDIDO'
  },
  {
    id: '2',
    title: 'LOMBRICES CALIFORNIANAS',
    subtitle: 'Criadero 100% Mexicano',
    description: 'Lombrices rojas californianas de alta calidad para compostaje doméstico y comercial.',
    buttonText: 'Ver Lombrices',
    buttonLink: '/products?category=Lombrices',
    badge: 'ENVÍO GRATIS'
  },
  {
    id: '3',
    title: 'KIT DE COMPOSTAJE',
    subtitle: 'Inicia tu Huerto Hoy',
    description: 'Todo lo que necesitas para comenzar a compostar en casa. Incluye lombrices, humus y guía completa.',
    buttonText: 'Ver Kit',
    buttonLink: '/products?category=Kits%20de%20Compostaje',
    badge: '20% OFF'
  },
  {
    id: '4',
    title: 'ABONO ORGÁNICO',
    subtitle: 'Para Agricultura Sustentable',
    description: 'Humus de lombriz especial para agricultura. Mejora la estructura del suelo y aumenta rendimientos.',
    buttonText: 'Cotizar',
    buttonLink: '/products?category=Abono%20Orgánico'
  }
];

const PromotionsCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % promotions.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + promotions.length) % promotions.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume autoplay after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentPromotion = promotions[currentSlide];

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carousel}>
        {promotions.map((promo, index) => (
          <div
            key={promo.id}
            className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
              opacity: index === currentSlide ? 1 : 0
            }}
          >
            <div className={styles.slideContent}>
              {promo.badge && (
                <span className={styles.badge}>{promo.badge}</span>
              )}
              <h2 className={styles.subtitle}>{promo.subtitle}</h2>
              <h1 className={styles.title}>{promo.title}</h1>
              <p className={styles.description}>{promo.description}</p>
              <Button 
                size="lg" 
                onClick={() => window.location.href = promo.buttonLink}
                className={styles.ctaButton}
              >
                {promo.buttonText}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        className={`${styles.navButton} ${styles.prevButton}`}
        onClick={() => {
          prevSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 5000);
        }}
        aria-label="Anterior"
      >
        ←
      </button>
      <button 
        className={`${styles.navButton} ${styles.nextButton}`}
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 5000);
        }}
        aria-label="Siguiente"
      >
        →
      </button>

      {/* Dots Indicator */}
      <div className={styles.dotsContainer}>
        {promotions.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir a promoción ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionsCarousel;
