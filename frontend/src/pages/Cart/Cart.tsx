import React from 'react';
import { Card } from '@components/common';
import styles from './Cart.module.css';

const Cart: React.FC = () => {
  return (
    <div className={styles.cartPage}>
      <div className="container">
        <Card>
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <h1>Shopping Cart</h1>
            <p>Your cart items will appear here...</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Cart;