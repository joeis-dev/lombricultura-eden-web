import React from 'react';
import { Card } from '@components/common';
import ThemeSwitcher from '../../../components/common/ThemeSwitcher/ThemeSwitcher';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboardPage}>
      <div className="container">
        {/* Admin Theme Controls */}
        <Card className={styles.themeControls}>
          <h2 className={styles.themeTitle}>Theme Settings</h2>
          <div className={styles.themeDescription}>
            Customize the appearance for your storefront. Changes are applied instantly to all customer views.
          </div>
          <ThemeSwitcher />
        </Card>
        
        {/* Dashboard Content */}
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