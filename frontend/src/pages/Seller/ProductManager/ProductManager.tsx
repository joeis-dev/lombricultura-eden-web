import React from 'react';
import { Card } from '@components/common';
import styles from './ProductManager.module.css';

const ProductManager: React.FC = () => {
  return (
    <div className={styles.productManagerPage}>
      <div className="container">
        <Card>
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <h1>Product Manager</h1>
            <p>Product management interface coming soon...</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductManager;