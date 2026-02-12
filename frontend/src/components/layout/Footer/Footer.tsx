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
              <h3 className={styles.footerTitle}>Shop</h3>
              <p className={styles.footerDescription}>
                Your trusted e-commerce platform for quality products and excellent service.
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
              <h4 className={styles.sectionTitle}>Quick Links</h4>
              <ul className={styles.linkList}>
                <li>
                  <a href="/products" className={styles.footerLink}>All Products</a>
                </li>
                <li>
                  <a href="/about" className={styles.footerLink}>About Us</a>
                </li>
                <li>
                  <a href="/contact" className={styles.footerLink}>Contact</a>
                </li>
                <li>
                  <a href="/faq" className={styles.footerLink}>FAQ</a>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className={styles.footerSection}>
              <h4 className={styles.sectionTitle}>Customer Service</h4>
              <ul className={styles.linkList}>
                <li>
                  <a href="/shipping" className={styles.footerLink}>Shipping Info</a>
                </li>
                <li>
                  <a href="/returns" className={styles.footerLink}>Returns & Exchanges</a>
                </li>
                <li>
                  <a href="/size-guide" className={styles.footerLink}>Size Guide</a>
                </li>
                <li>
                  <a href="/track-order" className={styles.footerLink}>Track Order</a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className={styles.footerSection}>
              <h4 className={styles.sectionTitle}>Legal</h4>
              <ul className={styles.linkList}>
                <li>
                  <a href="/privacy" className={styles.footerLink}>Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms" className={styles.footerLink}>Terms of Service</a>
                </li>
                <li>
                  <a href="/cookie-policy" className={styles.footerLink}>Cookie Policy</a>
                </li>
                <li>
                  <a href="/accessibility" className={styles.footerLink}>Accessibility</a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className={styles.footerSection}>
              <h4 className={styles.sectionTitle}>Stay Updated</h4>
              <p className={styles.newsletterDescription}>
                Subscribe to get special offers and updates
              </p>
              <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={styles.newsletterInput}
                  required
                />
                <button type="submit" className={styles.newsletterButton}>
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className={styles.footerBottom}>
            <div className={styles.footerBottomContent}>
              <p className={styles.copyright}>
                © {currentYear} Shop. All rights reserved.
              </p>
              
              <div className={styles.footerBottomLinks}>
                <a href="/privacy" className={styles.bottomLink}>Privacy</a>
                <a href="/terms" className={styles.bottomLink}>Terms</a>
                <a href="/sitemap" className={styles.bottomLink}>Sitemap</a>
              </div>

              <div className={styles.paymentMethods}>
                <span className={styles.paymentLabel}>Accepted Payments:</span>
                <div className={styles.paymentIcons}>
                  <span className={styles.paymentIcon} title="Visa">💳</span>
                  <span className={styles.paymentIcon} title="Mastercard">💳</span>
                  <span className={styles.paymentIcon} title="American Express">💳</span>
                  <span className={styles.paymentIcon} title="PayPal">💳</span>
                  <span className={styles.paymentIcon} title="Stripe">💳</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;