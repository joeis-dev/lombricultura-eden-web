import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          {/* Main Footer Sections */}
          <div className={styles.footerSections}>
            {/* Company Info */}
            <div className={styles.footerSection}>
              <h3 className={styles.footerTitle}>Lombricultura Edén</h3>
              <p className={styles.footerDescription}>
                Tu plataforma de confianza para productos de lombricultura de alta calidad.
              </p>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink} aria-label="Facebook">
                  📘
                </a>
                <a href="#" className={styles.socialLink} aria-label="Twitter">
                  🐦
                </a>
                <a href="#" className={styles.socialLink} aria-label="Instagram">
                  📷
                </a>
                <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                  💼
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.footerSection}>
              <h4 className={styles.sectionTitle}>Enlaces Rápidos</h4>
              <ul className={styles.linkList}>
                <li>
                  <a href="/products" className={styles.footerLink}>Todos los Productos</a>
                </li>
                <li>
                  <a href="/manuales" className={styles.footerLink}>Manuales</a>
                </li>
                <li>
                  <a href="/acerca-de" className={styles.footerLink}>Acerca de Nosotros</a>
                </li>
                <li>
                  <a href="/contacto" className={styles.footerLink}>Contacto</a>
                </li>
                <li>
                  <a href="/faq" className={styles.footerLink}>Preguntas Frecuentes</a>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className={styles.footerSection}>
              <h4 className={styles.sectionTitle}>Servicio al Cliente</h4>
              <ul className={styles.linkList}>
                <li>
                  <a href="/shipping" className={styles.footerLink}>Información de Envío</a>
                </li>
                <li>
                  <a href="/returns" className={styles.footerLink}>Devoluciones y Cambios</a>
                </li>
                <li>
                  <a href="/size-guide" className={styles.footerLink}>Guía de Tallas</a>
                </li>
                <li>
                  <a href="/track-order" className={styles.footerLink}>Rastrear Pedido</a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className={styles.footerSection}>
              <h4 className={styles.sectionTitle}>Legal</h4>
              <ul className={styles.linkList}>
                <li>
                  <a href="/privacy" className={styles.footerLink}>Política de Privacidad</a>
                </li>
                <li>
                  <a href="/terms" className={styles.footerLink}>Términos del Servicio</a>
                </li>
                <li>
                  <a href="/cookie-policy" className={styles.footerLink}>Política de Cookies</a>
                </li>
                <li>
                  <a href="/accessibility" className={styles.footerLink}>Accesibilidad</a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className={styles.footerSection}>
              <h4 className={styles.sectionTitle}>Mantente Actualizado</h4>
              <p className={styles.newsletterDescription}>
                Suscríbete para recibir ofertas especiales y novedades
              </p>
              <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className={styles.newsletterInput}
                  required
                />
                <button type="submit" className={styles.newsletterButton}>
                  Suscribirme
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className={styles.footerBottom}>
            <div className={styles.footerBottomContent}>
              <p className={styles.copyright}>
                © {currentYear} Lombricultura Edén. Todos los derechos reservados.
              </p>
              
              <div className={styles.footerBottomLinks}>
                <a href="/privacy" className={styles.bottomLink}>Privacidad</a>
                <a href="/terms" className={styles.bottomLink}>Términos</a>
                <a href="/sitemap" className={styles.bottomLink}>Mapa del Sitio</a>
              </div>
              
              <div className={styles.paymentMethods}>
                <span className={styles.paymentLabel}>Métodos de Pago Aceptados:</span>
                <div className={styles.paymentIcons}>
                  <span className={styles.paymentIcon} title="Visa">💳</span>
                  <span className={styles.paymentIcon} title="Mastercard">💳</span>
                  <span className={styles.paymentIcon} title="American Express">💳</span>
                  <span className={styles.paymentIcon} title="PayPal">💳</span>
                  <span className={styles.paymentIcon} title="Stripe">💳</span>
                </div>
              </div>
            </div>

            {/* Developer Credit */}
            <div className={styles.footerCredit}>
              <p>
                Desarrollado con ❤️ por <a href="https://github.com/joeis-dev" target="_blank" rel="noopener noreferrer" className={styles.creditLink}>Joe</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;