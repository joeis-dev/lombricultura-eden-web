import React from 'react';
import { Card } from '@components/common';
import styles from './FAQ.module.css';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: 'envio',
    question: '¿Cuánto tarda el envío?',
    answer:
      'Realizamos envíos a todo México con entrega estimada de 24 a 48 horas después de confirmar tu pedido, dependiendo de tu ubicación.'
  },
  {
    id: 'lombrices-vivas',
    question: '¿Cómo llegan las lombrices vivas?',
    answer:
      'Las lombrices se empacan en contenedores con sustrato húmedo y ventilación adecuada para garantizar que lleguen sanas y en condiciones de humedad y temperatura óptimas.'
  },
  {
    id: 'humus-aplicacion',
    question: '¿Cómo aplico el humus líquido y el sólido?',
    answer:
      'El humus líquido se diluye en agua y se aplica por riego o aspersión foliar. El humus sólido se usa como sustrato, enmienda orgánica o mezclado con el suelo antes de sembrar.'
  },
  {
    id: 'dosis',
    question: '¿Qué cantidad de humus debo usar?',
    answer:
      'Depende del cultivo y tamaño de la planta. Te sugerimos comenzar con dosis pequeñas e incrementar gradualmente; en nuestra sección de Manuales encontrarás guías detalladas.'
  },
  {
    id: 'pagos',
    question: '¿Qué métodos de pago aceptan?',
    answer:
      'Aceptamos tarjetas de crédito y débito, así como transferencias bancarias a través de pasarelas de pago seguras.'
  },
  {
    id: 'devoluciones',
    question: '¿Puedo solicitar un reembolso?',
    answer:
      'Sí. Si tu producto llegó en mal estado o no cumple lo prometido, contáctanos dentro de los primeros 7 días y gestionaremos un cambio o reembolso.'
  }
];

const FAQ: React.FC = () => {
  return (
    <div className={styles.faqPage}>
      <section className={styles.heroSection}>
        <div className="container">
          <h1 className={styles.heroTitle}>Preguntas Frecuentes</h1>
          <p className={styles.heroSubtitle}>
            Resolvemos las dudas más comunes sobre nuestros productos
          </p>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <Card key={faq.id} className={styles.faqItem}>
                <details className={styles.faqDetails}>
                  <summary className={styles.faqQuestion}>{faq.question}</summary>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </details>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;