import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
} = ({
  children,
  variant = 'default',
  padding = 'md',
  rounded = 'lg',
  hover = false,
  className = '',
  onClick,
  ...props
}) => {
  const classNames = [
    styles.card,
    styles[`card--${variant}`],
    styles[`card--padding-${padding}`],
    styles[`card--rounded-${rounded}`],
    hover && styles['card--hover'],
    onClick && styles['card--clickable'],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`${styles.cardHeader} ${className}`}>
      {children}
    </div>
  );
};

const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => {
  return (
    <div className={`${styles.cardBody} ${className}`}>
      {children}
    </div>
  );
};

const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={`${styles.cardFooter} ${className}`}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;