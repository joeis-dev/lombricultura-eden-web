import React from 'react';
import { Card } from '@components/common';
import styles from './Checkout.module.css';

const Checkout: React.FC = () => {
  return (
    <div className={styles.checkoutPage}>
      <div className="container">
        <Card>
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <h1>Checkout</h1>
            <p>Checkout process coming soon...</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;