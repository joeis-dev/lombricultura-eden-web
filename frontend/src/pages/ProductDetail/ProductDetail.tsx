import React from 'react';
import { Card } from '@components/common';
import styles from './ProductDetail.module.css';

const ProductDetail: React.FC = () => {
  return (
    <div className={styles.productDetailPage}>
      <div className="container">
        <Card>
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <h1>Product Detail Page</h1>
            <p>Product details coming soon...</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;