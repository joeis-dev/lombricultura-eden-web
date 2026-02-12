import React from 'react';
import { Card } from '@components/common';
import styles from './Login.module.css';

const Login: React.FC = () => {
  return (
    <div className={styles.loginPage}>
      <div className="container">
        <Card>
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <h1>Login</h1>
            <p>Login page coming soon...</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;