import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <a href="/" className="footer-logo">
            <span className="footer-logo-narx">Narx</span>
            <span className="footer-logo-top">Top</span>
          </a>

          <p className="footer-description">
            O‘zbekistondagi supermarketlar narxlarini
            <br />
            solishtiring va aqlli xarid qiling.
          </p>
        </div>


        {/* Navigation */}
        <div className="footer-column">
          <h3 className="footer-title">
            Navigatsiya
          </h3>

          <a href="/" className="footer-link">
            Bosh sahifa
          </a>

          <a href="/search" className="footer-link">
            Qidirish
          </a>

          <a href="/cart" className="footer-link">
            Savat
          </a>
        </div>


        {/* Categories */}
        <div className="footer-column">
          <h3 className="footer-title">
            Kategoriyalar
          </h3>

          <a href="#products" className="footer-link">
            Ichimliklar
          </a>

          <a href="#products" className="footer-link">
            Sneklar
          </a>

          <a href="#products" className="footer-link">
            Mevalar
          </a>

          <a href="#products" className="footer-link">
            Go‘sht
          </a>
        </div>


        {/* Information */}
        <div className="footer-column">
          <h3 className="footer-title">
            Ma’lumot
          </h3>

          <a href="#" className="footer-link">
            Biz haqimizda
          </a>

          <a href="#" className="footer-link">
            Aloqa
          </a>

          <a href="#" className="footer-link">
            Maxfiylik siyosati
          </a>

          <a href="#" className="footer-link">
            Foydalanish shartlari
          </a>
        </div>


        {/* Social / contact */}
        <div className="footer-column footer-contact">
          <h3 className="footer-title">
            Biz bilan bog‘laning
          </h3>

          <a href="mailto:info@narxtop.uz" className="footer-contact-link">
            <span className="footer-contact-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </span>

            info@narxtop.uz
          </a>

          <a href="#" className="footer-social-link">
            <span className="footer-social-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="4" y="4" width="16" height="16" rx="4" />
                <circle cx="12" cy="12" r="3.5" />
                <circle
                  cx="17.3"
                  cy="6.8"
                  r="0.8"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </span>

            Instagram
          </a>

          <a href="#" className="footer-social-link">
            <span className="footer-social-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21 4-7.2 16-3.6-6.2L4 10.2 21 4Z" />
                <path d="m10.2 13.8 4.3-4.3" />
              </svg>
            </span>

            Telegram
          </a>
        </div>

      </div>


      {/* Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">

          <p>
            © 2026 NarxTop. Barcha huquqlar himoyalangan.
          </p>

          <div className="footer-bottom-links">
            <a href="?lang=uz">
              UZ
            </a>

            <span>·</span>

            <a href="?lang=ru">
              RU
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}