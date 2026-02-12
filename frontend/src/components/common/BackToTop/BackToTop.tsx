import React, { useState, useEffect } from 'react';
import styles from './BackToTop.module.css';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <button
        className={`${styles.backToTopButton} ${isVisible ? styles.visible : ''}`}
        onClick={scrollToTop}
        aria-label="Volver arriba"
        title="Volver arriba"
      >
        ↑
      </button>
    </>
  );
};

export default BackToTop;