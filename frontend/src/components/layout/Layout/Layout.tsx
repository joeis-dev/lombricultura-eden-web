import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  className = '',
}) => {
  return (
    <div className={styles.layout}>
      {showHeader && <Header />}
      
      <main className={`${styles.main} ${className}`}>
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;