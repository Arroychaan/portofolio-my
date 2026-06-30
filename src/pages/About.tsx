import { useSettings } from '../context/SettingsContext';

const techStack = [
  'HTML5', 'CSS3', 'React.js', 'Next.js', 'TypeScript', 
  'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Java', 'C++'
];

export default function About() {
  const { t } = useSettings();

  return (
    <div className="max-w-[800px] w-full mx-auto px-6 py-20 md:py-32">
      <div className="mb-20">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text)] mb-8">{t('about.title')}</h1>
        <div className="space-y-6 text-lg text-[var(--text-muted)] leading-relaxed">
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-[var(--text)] mb-6">{t('about.tech')}</h2>
        <div className="flex flex-wrap gap-3">
          {techStack.map((tech) => (
            <span key={tech} className="px-4 py-2 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-lg text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--text-muted)] transition-colors cursor-default font-mono">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
