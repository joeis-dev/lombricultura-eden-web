import React from 'react';
import { Card } from '@components/common';
import styles from './Register.module.css';

const Register: React.FC = () => {
  return (
    <div className={styles.registerPage}>
      <div className="container">
        <Card>
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <h1>Register</h1>
            <p>Registration page coming soon...</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;