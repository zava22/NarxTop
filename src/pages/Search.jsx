import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import "./Search.css";

export default function Search() {
  return (
    <div className="search-page">
      <Navbar />

      <main className="search-main">

        <div className="search-container">

          {/* Page heading */}
          <div className="search-heading">
            <span className="search-heading-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>
            </span>

            <div>
              <h1>Mahsulotlarni qidirish</h1>

              <p>
                Kerakli mahsulotni toping va turli do‘konlardagi
                narxlarni solishtiring.
              </p>
            </div>
          </div>


          {/* Search box */}
          <form className="search-box">

            <div className="search-input-wrapper">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>

              <input
                type="text"
                placeholder="Masalan: Fanta, Pepsi, Lay's..."
                aria-label="Mahsulot qidirish"
              />
            </div>

            <button type="submit" className="search-submit">
              Qidirish
            </button>

          </form>


          {/* Popular searches */}
          <div className="popular-searches">

            <div className="popular-title">
              Mashhur qidiruvlar
            </div>

            <div className="popular-list">

              <a href="/search?q=fanta">
                Fanta
              </a>

              <a href="/search?q=pepsi">
                Pepsi
              </a>

              <a href="/search?q=lays">
                Lay's
              </a>

              <a href="/search?q=cola">
                Coca-Cola
              </a>

              <a href="/search?q=banan">
                Banan
              </a>

              <a href="/search?q=sut">
                Sut
              </a>

            </div>

          </div>


          {/* Empty state */}
          <div className="search-empty">

            <div className="search-empty-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 5 5" />
                <path d="M8.5 11h5" />
              </svg>
            </div>

            <h2>Mahsulot qidiring</h2>

            <p>
              Yuqoridagi qidiruv maydonidan foydalanib,
              mahsulot nomini kiriting.
            </p>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}