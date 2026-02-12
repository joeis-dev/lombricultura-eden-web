import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';
import { useCartStore } from '@store/cartStore';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalItems = getTotalItems();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleLogout = async () => {
    logout();
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <img 
              src="/logo.svg" 
              alt="Lombricultura Edén" 
              className={styles.logoImage}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <span className={styles.logoText}>Lombricultura Edén</span>
          </Link>

          {/* Navigation */}
          <nav className={styles.nav}>
            <Link 
              to="/" 
              className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
            >
              Inicio
            </Link>
            
            <Link 
              to="/products" 
              className={`${styles.navLink} ${isActive('/products') ? styles.active : ''}`}
            >
              Productos
            </Link>
            
            {isAuthenticated && (
              <>
                <Link 
                  to="/profile" 
                  className={`${styles.navLink} ${isActive('/profile') ? styles.active : ''}`}
                >
                  Mi Cuenta
                </Link>
                
                <Link 
                  to="/order-history" 
                  className={`${styles.navLink} ${isActive('/order-history') ? styles.active : ''}`}
                >
                  Pedidos
                </Link>
                
                <Link 
                  to="/order-tracking" 
                  className={`${styles.navLink} ${isActive('/order-tracking') ? styles.active : ''}`}
                >
                  Rastrear
                </Link>
                
                {user?.role === 'SELLER' && (
                  <>
                    <Link 
                      to="/seller" 
                      className={`${styles.navLink} ${isActive('/seller') ? styles.active : ''}`}
                    >
                      Panel Vendedor
                    </Link>
                    
                    <Link 
                      to="/seller/products" 
                      className={`${styles.navLink} ${isActive('/seller/products') ? styles.active : ''}`}
                    >
                      Gestionar Productos
                    </Link>
                  </>
                )}
                
                {user?.role === 'ADMIN' && (
                  <Link 
                    to="/admin" 
                    className={`${styles.navLink} ${isActive('/admin') ? styles.active : ''}`}
                    >
                    Admin
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* Actions */}
          <div className={styles.headerActions}>
            {/* Search */}
            <div className={styles.searchContainer}>
              <input
                type="search"
                placeholder="Buscar productos..."
                className={styles.searchInput}
                onChange={(e) => {
                  // TODO: Implement search functionality
                  console.log('Search:', e.target.value);
                }}
              />
              <button className={styles.searchButton} aria-label="Buscar">
                🔍
              </button>
            </div>

            {/* Cart */}
            <Link to="/cart" className={styles.cartButton}>
              🛒
              {totalItems > 0 && (
                <span className={styles.cartBadge}>{totalItems > 99 ? '99+' : totalItems}</span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className={styles.userMenu}>
                <button className={styles.userButton}>
                  👤 {user?.firstName || user?.email?.split('@')[0] || 'Usuario'}
                </button>
                <div className={styles.userDropdown}>
                  <Link to="/profile" className={styles.dropdownItem}>
                    Perfil
                  </Link>
                  <Link to="/profile/orders" className={styles.dropdownItem}>
                    Mis Pedidos
                  </Link>
                  <Link to="/profile/addresses" className={styles.dropdownItem}>
                    Direcciones
                  </Link>
                  <hr className={styles.dropdownSeparator} />
                  <button onClick={handleLogout} className={styles.dropdownItem}>
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.authButtons}>
                <Link to="/login" className={`${styles.authButton} ${styles.authButtonSecondary}`}>
                  Iniciar Sesión
                </Link>
                <Link to="/register" className={`${styles.authButton} ${styles.authButtonPrimary}`}>
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className={styles.mobileMenuToggle} aria-label="Toggle menu">
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;