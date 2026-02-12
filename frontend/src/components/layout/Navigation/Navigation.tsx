import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

export interface NavigationItem {
  path: string;
  label: string;
  icon?: string;
  badge?: number | string;
  children?: NavigationItem[];
}

export interface NavigationProps {
  items: NavigationItem[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  items,
  orientation = 'horizontal',
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const isActive = (item: NavigationItem) => {
    return location.pathname === item.path || 
           location.pathname.startsWith(item.path + '/') ||
           (item.children?.some(child => 
             location.pathname === child.path || location.pathname.startsWith(child.path + '/')
           ));
  };

  const toggleExpanded = (path: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const renderItem = (item: NavigationItem, depth: number = 0) => {
    const active = isActive(item);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.path);

    const itemClassNames = [
      styles.navItem,
      styles[`navItem--${variant}`],
      styles[`navItem--${size}`],
      active && styles['navItem--active'],
      depth > 0 && styles['navItem--nested']
    ].filter(Boolean).join(' ');

    const linkContent = (
      <>
        {item.icon && <span className={styles.navIcon}>{item.icon}</span>}
        <span className={styles.navLabel}>{item.label}</span>
        {item.badge && (
          <span className={styles.navBadge}>
            {typeof item.badge === 'number' && item.badge > 99 ? '99+' : item.badge}
          </span>
        )}
        {hasChildren && (
          <span className={`${styles.navArrow} ${isExpanded ? styles['navArrow--expanded'] : ''}`}>
            ▼
          </span>
        )}
      </>
    );

    return (
      <li key={item.path} className={itemClassNames}>
        {hasChildren ? (
          <button
            className={`${styles.navButton} ${active ? styles['navButton--active'] : ''}`}
            onClick={() => toggleExpanded(item.path)}
            aria-expanded={isExpanded}
            aria-haspopup={hasChildren}
          >
            {linkContent}
          </button>
        ) : (
          <Link
            to={item.path}
            className={`${styles.navLink} ${active ? styles['navLink--active'] : ''}`}
          >
            {linkContent}
          </Link>
        )}
        
        {hasChildren && isExpanded && (
          <ul className={styles.navSubmenu}>
            {item.children!.map(child => renderItem(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  const navigationClassNames = [
    styles.navigation,
    styles[`navigation--${orientation}`],
    styles[`navigation--${variant}`],
    styles[`navigation--${size}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <nav className={navigationClassNames} role="navigation">
      <ul className={styles.navList}>
        {items.map(item => renderItem(item))}
      </ul>
    </nav>
  );
};

export default Navigation;