import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

export default function Home() {
  const { t } = useSettings();

  return (
    <div className="flex-1 flex flex-col justify-center max-w-[1200px] w-full mx-auto px-6 py-20 md:py-32">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-[var(--text)] mb-6 leading-tight heading-tight">
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl text-[var(--text-muted)] mb-12 max-w-2xl text-balance">
          {t('hero.subtitle')}
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Link 
            to="/projects" 
            className="bg-[var(--text)] text-[var(--bg)] px-6 py-3 rounded-full font-medium hover:opacity-80 transition-opacity"
          >
            {t('hero.btn.projects')}
          </Link>
          <Link 
            to="/contact" 
            className="bg-[var(--bg-elevated)] text-[var(--text)] border border-[var(--border)] px-6 py-3 rounded-full font-medium hover:bg-[var(--border)] transition-colors"
          >
            {t('hero.btn.contact')}
          </Link>
        </div>
      </div>
    </div>
  );
}
