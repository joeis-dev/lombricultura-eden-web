import React from 'react';
import { Card } from '@components/common';
import styles from './OrderTracking.module.css';

const OrderTracking: React.FC = () => {
  return (
    <div className={styles.orderTrackingPage}>
      <div className="container">
        <Card>
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <h1>Order Tracking</h1>
            <p>Order tracking information coming soon...</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderTracking;