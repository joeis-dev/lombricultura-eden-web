import React from 'react';
import styles from './Loading.module.css';

export interface LoadingProps {
  variant?: 'spinner' | 'dots' | 'pulse';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'current';
  text?: string;
  overlay?: boolean;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  text,
  overlay = false,
  className = '',
}) => {
  const loadingClassNames = [
    styles.loading,
    styles[`loading--${variant}`],
    styles[`loading--${size}`],
    styles[`loading--${color}`],
    overlay && styles['loading--overlay'],
    className
  ].filter(Boolean).join(' ');

  const renderSpinner = () => (
    <div className={styles.spinner}>
      <div className={styles.spinnerCircle} />
    </div>
  );

  const renderDots = () => (
    <div className={styles.dots}>
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
    </div>
  );

  const renderPulse = () => (
    <div className={styles.pulse}>
      <div className={styles.pulseBar} />
      <div className={styles.pulseBar} />
      <div className={styles.pulseBar} />
      <div className={styles.pulseBar} />
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'spinner':
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={loadingClassNames}>
      {renderVariant()}
      {text && <span className={styles.loadingText}>{text}</span>}
    </div>
  );
};

export default Loading;