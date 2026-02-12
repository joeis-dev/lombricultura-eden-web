import React from 'react';
import { Card } from '@components/common';
import styles from './OrderHistory.module.css';

const OrderHistory: React.FC = () => {
  return (
    <div className={styles.orderHistoryPage}>
      <div className="container">
        <Card>
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <h1>Order History</h1>
            <p>Your order history will appear here...</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderHistory;