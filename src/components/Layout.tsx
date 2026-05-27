import { Link, Outlet, useLocation } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import { agent } from '../data/agent';
import Logo from './Logo';

export default function Layout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/listings', label: 'Listings' },
    { to: '/contact', label: 'Contact' },
  ];

  // Focus trap + return focus on mobile menu close
  useEffect(() => {
    if (!mobileOpen) return;
    const menu = mobileMenuRef.current;
    if (!menu) return;
    const focusable = menu.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen && hamburgerRef.current) {
      hamburgerRef.current.focus();
    }
  }, [mobileOpen]);

  return (
    <div className="relative min-h-screen flex flex-col bg-paper font-body">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:text-sm"
      >
        Skip to main content
      </a>

      {/* N5 Floating Pill Nav */}
      <header className="fixed top-[var(--space-md)] left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[720px]">
        <nav
          className="flex items-center justify-between gap-4 px-5 py-3 rounded-full bg-paper/80 backdrop-blur-md border border-rule shadow-sm"
          aria-label="Primary"
        >
          <Link to="/" className="shrink-0 hover:opacity-80 transition-opacity flex items-center">
            <Logo variant="dark" height={32} />
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                aria-current={location.pathname === item.to ? 'page' : undefined}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  location.pathname === item.to
                    ? 'bg-ink text-paper'
                    : 'text-ink-2 hover:text-ink hover:bg-paper-2'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full bg-ink text-paper hover:bg-ink/90 transition-colors"
          >
            Get in Touch
          </Link>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="sm:hidden relative w-8 h-8 flex items-center justify-center text-ink rounded-full hover:bg-paper-2 transition-colors"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            id="mobile-nav"
            ref={mobileMenuRef}
            className="sm:hidden mt-2 rounded-2xl bg-paper border border-rule shadow-lg overflow-hidden"
          >
            <div className="p-2 space-y-1">
              {navLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  aria-current={location.pathname === item.to ? 'page' : undefined}
                  className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                    location.pathname === item.to
                      ? 'bg-ink text-paper'
                      : 'text-ink hover:bg-paper-2'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl font-semibold bg-ink text-paper text-center"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed nav */}
      <div className="h-28" />

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      {/* Ft2 Inline single-line footer */}
      <footer className="border-t border-rule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink-2">
            <div className="flex items-center gap-3">
              <Logo variant="dark" height={24} />
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">Tulsa real estate, done right.</span>
            </div>
            <div className="flex items-center gap-3">
              <span>{agent.office}</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">{agent.address}</span>
            </div>
            <div className="text-xs">
              &copy; {new Date().getFullYear()} {agent.name} Realty. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
