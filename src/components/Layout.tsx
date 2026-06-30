import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import SettingsModal from './SettingsModal';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';
  const { t } = useSettings();

  if (isAdmin) {
    return <Outlet />;
  }

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col selection:bg-[var(--text)] selection:text-[var(--bg)]">
      {/* ══ NAVBAR ══ */}
      <header className="sticky top-0 z-50 bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold tracking-tight text-[var(--text)] flex items-center gap-2" onClick={closeMenu}>
            <span className="w-4 h-4 bg-[var(--text)] rounded-full"></span>
            Achmad Roychan
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--text-muted)]">
            <Link to="/projects" className="hover:text-[var(--text)] transition-colors">{t('nav.projects')}</Link>
            <Link to="/about" className="hover:text-[var(--text)] transition-colors">{t('nav.about')}</Link>
            <Link to="/contact" className="hover:text-[var(--text)] transition-colors">{t('nav.contact')}</Link>
            
            <div className="w-px h-4 bg-[var(--border)] mx-2"></div>
            
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-2 hover:text-[var(--text)] transition-colors"
              title="Settings"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
            <button 
              className="text-[var(--text-muted)] hover:text-[var(--text)]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-[var(--bg)] z-40 p-6 flex flex-col gap-6 text-xl font-medium border-t border-[var(--border)]">
          <Link to="/projects" onClick={closeMenu} className="text-[var(--text-muted)] hover:text-[var(--text)]">{t('nav.projects')}</Link>
          <Link to="/about" onClick={closeMenu} className="text-[var(--text-muted)] hover:text-[var(--text)]">{t('nav.about')}</Link>
          <Link to="/contact" onClick={closeMenu} className="text-[var(--text-muted)] hover:text-[var(--text)]">{t('nav.contact')}</Link>
        </div>
      )}

      {/* ══ MAIN CONTENT ══ */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* ══ FOOTER ══ */}
      <footer className="border-t border-[var(--border)] py-8 mt-auto bg-[var(--bg)]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} Achmad Roychan.</p>
          <div className="flex gap-4">
            <a href="https://github.com/Arroychaan" target="_blank" rel="noreferrer" className="hover:text-[var(--text)] transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/achmad-roychan-87459724b/" target="_blank" rel="noreferrer" className="hover:text-[var(--text)] transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
