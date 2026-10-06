import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">

        {/* Logo */}
        <a href="/" className="navbar-logo">
          <span className="logo-narx">Narx</span>
          <span className="logo-top">Top</span>
        </a>

        {/* Search */}
        <form className="navbar-search" action="/search">
          <input
            type="text"
            name="q"
            placeholder="Mahsulotlarni qidirish"
          />

          <button type="submit" aria-label="Search">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
          </button>
        </form>

        {/* Navigation */}
        <nav className="navbar-menu">
          <a href="/" className="navbar-link active">
            Bosh sahifa
          </a>

          <a href="/search" className="navbar-link">
            Qidirish
          </a>

          <a href="/cart" className="navbar-link">
            Savat
          </a>
        </nav>

        {/* Theme */}
        <button
          type="button"
          className="theme-button"
          aria-label="Theme"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.5 6.5 0 0 0 21 12.8Z" />
          </svg>
        </button>

        {/* Language */}
        <div className="language-switcher">
          <a href="?lang=uz" className="language active">
            UZ
          </a>

          <a href="?lang=ru" className="language">
            RU
          </a>
        </div>

      </div>
    </header>
  );
}