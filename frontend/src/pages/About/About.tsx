import React from 'react';
import { Card } from '@components/common';
import styles from './About.module.css';

const About: React.FC = () => {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.heroSection}>
        <div className="container">
          <h1 className={styles.heroTitle}>Acerca de Nosotros</h1>
          <p className={styles.heroSubtitle}>
            Lombricultura Edén, tu aliado para una agricultura sustentable
          </p>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className="container">
          <Card className={styles.storyCard}>
            <h2 className={styles.storyTitle}>Nuestra historia</h2>
            <p className={styles.storyText}>
              Lombricultura Edén nació con la misión de acercar la lombricultura y el
              compostaje a hogares y productores, ofreciendo lombrices, humus líquido y
              humus sólido 100% orgánicos. Creemos que el equilibrio con el suelo es la
              base de un futuro más verde.
            </p>
          </Card>

          <div className={styles.valuesGrid}>
            <Card className={styles.valueCard}>
              <div className={styles.valueIcon}>🌱</div>
              <h3 className={styles.valueTitle}>Sustentabilidad</h3>
              <p className={styles.valueText}>
                Fomentamos el reciclaje de residuos orgánicos y el cuidado del medio ambiente.
              </p>
            </Card>
            <Card className={styles.valueCard}>
              <div className={styles.valueIcon}>🤝</div>
              <h3 className={styles.valueTitle}>Calidad</h3>
              <p className={styles.valueText}>
                Productos seleccionados y revisados para garantizar los mejores resultados.
              </p>
            </Card>
            <Card className={styles.valueCard}>
              <div className={styles.valueIcon}>📚</div>
              <h3 className={styles.valueTitle}>Educación</h3>
              <p className={styles.valueText}>
                Compartimos manuales y asesoría para que aproveches al máximo cada producto.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;