import React from 'react';
import styles from './Input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helper?: string;
  variant?: 'default' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
  variant = 'default',
  size = 'md',
  leftIcon,
  rightIcon,
  fullWidth = true,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const classNames = [
    styles.input,
    styles[`input--${variant}`],
    styles[`input--${size}`],
    error && styles['input--error'],
    fullWidth && styles['input--full-width'],
    leftIcon && styles['input--has-left-icon'],
    rightIcon && styles['input--has-right-icon'],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={`${styles.inputGroup} ${fullWidth ? styles['inputGroup--full-width'] : ''}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      
      <div className={styles.inputWrapper}>
        {leftIcon && (
          <span className={styles.iconLeft}>{leftIcon}</span>
        )}
        
        <input
          id={inputId}
          className={classNames}
          {...props}
        />
        
        {rightIcon && (
          <span className={styles.iconRight}>{rightIcon}</span>
        )}
      </div>
      
      {error && (
        <span className={styles.error}>{error}</span>
      )}
      
      {helper && !error && (
        <span className={styles.helper}>{helper}</span>
      )}
    </div>
  );
};

export default Input;