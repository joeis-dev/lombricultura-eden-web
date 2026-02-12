import React from 'react';
import { Card } from '@components/common';
import styles from './Profile.module.css';

const Profile: React.FC = () => {
  return (
    <div className={styles.profilePage}>
      <div className="container">
        <Card>
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <h1>User Profile</h1>
            <p>Profile management coming soon...</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;