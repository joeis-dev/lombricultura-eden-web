import React from 'react';
import { Card } from '@components/common';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboardPage}>
      <div className="container">
        <Card>
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <h1>Seller Dashboard</h1>
            <p>Seller dashboard coming soon...</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;