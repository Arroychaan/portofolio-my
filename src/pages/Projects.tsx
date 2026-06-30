import initialProjects from '../data/projects.json';
import { useSettings } from '../context/SettingsContext';

export default function Projects() {
  const { t } = useSettings();

  return (
    <div className="max-w-[1200px] w-full mx-auto px-6 py-20 md:py-32">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text)] mb-4">{t('projects.title')}</h1>
        <p className="text-[var(--text-muted)] text-lg max-w-2xl">
          {t('projects.subtitle')}
        </p>
      </div>

      <div className="flex flex-col gap-24">
        {initialProjects.map((project, index) => {
          // fallback jika field status belum ada di file json lama
          const status = (project as any).status || 'completed';
          
          return (
            <div key={index} className="flex flex-col md:flex-row gap-8 md:gap-16 group">
              {/* Image Side */}
              <div className="w-full md:w-3/5 rounded-2xl overflow-hidden bg-[var(--bg-elevated)] border border-[var(--border)] transition-colors group-hover:border-[var(--border-light)]">
                <a href={project.demoUrl} target="_blank" rel="noreferrer" className="block aspect-[16/10] w-full relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy" 
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </a>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-2/5 flex flex-col justify-center items-start">
                <div className="font-mono text-xs text-[var(--text-muted)] mb-4 flex w-full justify-between items-center">
                  <span>{String(index + 1).padStart(2, '0')} / {String(initialProjects.length).padStart(2, '0')}</span>
                  
                  {/* Status Badge */}
                  <span className={`status-badge ${status}`}>
                    <span className="dot"></span>
                    {status === 'completed' ? t('status.completed') : t('status.in_progress')}
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-3 tracking-tight">
                  {project.title}
                </h2>
                <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
                  {project.subtitle}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                <div>
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text)] hover:text-[var(--text-muted)] transition-colors"
                  >
                    {t('projects.visit')} 
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H3.5M9.5 2.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
