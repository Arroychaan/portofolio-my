import { useSettings } from '../context/SettingsContext';
import { 
  SiNextdotjs, SiTypescript, SiTailwindcss, SiPostgresql, SiCplusplus 
} from 'react-icons/si';
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaJava } from 'react-icons/fa';

const techStack = [
  { name: 'HTML5', icon: <FaHtml5 className="text-lg" /> },
  { name: 'CSS3', icon: <FaCss3Alt className="text-lg" /> },
  { name: 'React.js', icon: <FaReact className="text-lg" /> },
  { name: 'Next.js', icon: <SiNextdotjs className="text-lg" /> },
  { name: 'TypeScript', icon: <SiTypescript className="text-lg" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-lg" /> },
  { name: 'Node.js', icon: <FaNodeJs className="text-lg" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql className="text-lg" /> },
  { name: 'Java', icon: <FaJava className="text-lg" /> },
  { name: 'C++', icon: <SiCplusplus className="text-lg" /> }
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
        <div className="flex flex-wrap gap-4">
          {techStack.map((tech) => (
            <div 
              key={tech.name} 
              className="flex items-center gap-3 px-5 py-3 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--text-muted)] transition-all cursor-default font-sans shadow-sm"
            >
              {tech.icon}
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
