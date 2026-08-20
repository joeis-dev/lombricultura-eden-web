import React from 'react';
import { Card } from '@components/common';
import styles from './Manuales.module.css';

interface Manual {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const manuales: Manual[] = [
  {
    id: 'cuidado-lombrices',
    title: 'Cuidado de lombrices',
    description:
      'Aprende a mantener tus lombrices rojas californianas sanas y productivas: alimentación, humedad, temperatura, cosecha de humus y reproducción.',
    icon: '🪱'
  },
  {
    id: 'aplicacion-humus',
    title: 'Aplicación de humus sólido y líquido',
    description:
      'Descubre cómo y cuánto humus de lombriz usar según tu cultivo: dosis recomendadas para el humus líquido (riego y foliar) y el humus sólido (sustrato y enmienda).',
    icon: '🌿'
  }
];

const Manuales: React.FC = () => {
  return (
    <div className={styles.manualesPage}>
      <section className={styles.heroSection}>
        <div className="container">
          <h1 className={styles.heroTitle}>Manuales</h1>
          <p className={styles.heroSubtitle}>
            Guías prácticas para aprovechar al máximo la lombricultura
          </p>
        </div>
      </section>

      <section className={styles.manualesSection}>
        <div className="container">
          <div className={styles.manualesGrid}>
            {manuales.map((manual) => (
              <Card key={manual.id} hover={true} padding="lg" className={styles.manualCard}>
                <div className={styles.manualIcon}>{manual.icon}</div>
                <h2 className={styles.manualTitle}>{manual.title}</h2>
                <p className={styles.manualDescription}>{manual.description}</p>
                <span className={styles.manualTag}>Manual</span>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Manuales;