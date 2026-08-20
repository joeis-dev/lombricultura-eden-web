import React from 'react';
import { Card, Button, Input } from '@components/common';
import styles from './Contacto.module.css';

const WHATSAPP_NUMBER = '523731863639';
const PHONE_DISPLAY = '373 186 3639';

interface ContactMethod {
  id: string;
  title: string;
  value: string;
  href?: string;
  icon: string;
}

const contactMethods: ContactMethod[] = [
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    value: PHONE_DISPLAY,
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: '💬'
  },
  {
    id: 'phone',
    title: 'Teléfono',
    value: PHONE_DISPLAY,
    href: `tel:${WHATSAPP_NUMBER}`,
    icon: '📞'
  },
  {
    id: 'email',
    title: 'Correo',
    value: 'contacto@lombriculturaeden.mx',
    href: 'mailto:contacto@lombriculturaeden.mx',
    icon: '✉️'
  },
  {
    id: 'hours',
    title: 'Horario',
    value: 'Lunes a Sábado, 9:00 - 18:00',
    icon: '🕘'
  }
];

const Contacto: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted');
  };

  return (
    <div className={styles.contactoPage}>
      <section className={styles.heroSection}>
        <div className="container">
          <h1 className={styles.heroTitle}>Contacto</h1>
          <p className={styles.heroSubtitle}>
            Estamos para ayudarte. Escríbenos y te responderemos a la brevedad
          </p>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactLayout}>
            <div className={styles.methodsColumn}>
              <h2 className={styles.methodsTitle}>Medios de contacto</h2>
              <div className={styles.methodsGrid}>
                {contactMethods.map((method) => (
                  <Card key={method.id} className={styles.methodCard}>
                    <div className={styles.methodIcon}>{method.icon}</div>
                    <div className={styles.methodInfo}>
                      <h3 className={styles.methodTitle}>{method.title}</h3>
                      {method.href ? (
                        <a
                          href={method.href}
                          target={method.href.startsWith('http') ? '_blank' : undefined}
                          rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className={styles.methodValue}
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className={styles.methodValue}>{method.value}</p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Card padding="xl" className={styles.formCard}>
              <h2 className={styles.formTitle}>Envíanos un mensaje</h2>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                  <label htmlFor="nombre">Nombre</label>
                  <Input id="nombre" placeholder="Tu nombre" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">Correo electrónico</label>
                  <Input id="email" type="email" placeholder="tucorreo@ejemplo.com" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="mensaje">Mensaje</label>
                  <textarea
                    id="mensaje"
                    className={styles.textarea}
                    placeholder="¿En qué podemos ayudarte?"
                    required
                  />
                </div>
                <Button type="submit" size="lg">Enviar mensaje</Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacto;