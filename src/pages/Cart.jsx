import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import "./Cart.css";

export default function Cart() {
  return (
    <div className="cart-page">
      <Navbar />

      <main className="cart-main">
        <div className="cart-container">

          {/* Page header */}
          <div className="cart-heading">
            <div className="cart-heading-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3.5 4h2l1.8 10.1a2 2 0 0 0 2 1.7h7.9a2 2 0 0 0 1.9-1.5L21 7H7" />
                <circle cx="9.5" cy="19" r="1.2" />
                <circle cx="17" cy="19" r="1.2" />
              </svg>
            </div>

            <div>
              <h1>Savat</h1>

              <p>
                Xarid qilish uchun tanlagan mahsulotlaringiz shu yerda
                ko‘rsatiladi.
              </p>
            </div>
          </div>


          {/* Temporary empty cart */}
          <section className="cart-empty">

            <div className="cart-empty-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3.5 4h2l1.8 10.1a2 2 0 0 0 2 1.7h7.9a2 2 0 0 0 1.9-1.5L21 7H7" />
                <circle cx="9.5" cy="19" r="1.2" />
                <circle cx="17" cy="19" r="1.2" />
              </svg>
            </div>

            <h2>Savatingiz hozircha bo‘sh</h2>

            <p>
              Mahsulotlarni tanlang va savatga qo‘shing.
              Eng yaxshi narxlarni topish uchun xaridni boshlang.
            </p>

            <a
              href="/"
              className="cart-empty-button"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>

              <span>Xarid qilishni boshlash</span>
            </a>

          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}