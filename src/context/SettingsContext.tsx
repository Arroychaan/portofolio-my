import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'en' | 'id';
type Theme = 'pitch-black' | 'slate' | 'mocha' | 'light';
type Font = 'sans' | 'serif' | 'mono';

interface SettingsContextType {
  language: Language;
  theme: Theme;
  font: Font;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  setFont: (font: Font) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.title': 'Software Developer focused on solid architecture.',
    'hero.subtitle': "Hi, I'm Achmad Roychan. I build digital products with a focus on clean code, seamless user experiences, and robust backend systems.",
    'hero.btn.projects': 'View Projects',
    'hero.btn.contact': 'Contact Me',
    'projects.title': 'Selected Works',
    'projects.subtitle': 'A collection of projects showcasing my focus on clean interfaces and solid architecture.',
    'projects.visit': 'Visit Project',
    'status.completed': 'Completed',
    'status.in_progress': 'In Progress',
    'about.title': 'About',
    'about.p1': 'I am a software developer focused on code efficiency, solid data architecture, and intuitive user experiences.',
    'about.p2': 'I have a high interest in modern website performance, backend optimization, and precise interface design. My approach to development always prioritizes functionality and code cleanliness before adding complex visual layers.',
    'about.tech': 'Tech Stack',
    'contact.title': 'Get in touch',
    'contact.subtitle': 'Have a project in mind or just want to say hi? Feel free to reach out.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Sent Successfully ✓',
    'admin.back': '← BACK',
    'admin.title': 'ADMIN DASHBOARD',
  },
  id: {
    'nav.projects': 'Proyek',
    'nav.about': 'Tentang',
    'nav.contact': 'Kontak',
    'hero.title': 'Pengembang Perangkat Lunak dengan arsitektur yang solid.',
    'hero.subtitle': 'Hai, saya Achmad Roychan. Saya membangun produk digital dengan fokus pada kebersihan kode, pengalaman pengguna yang mulus, dan sistem backend yang tangguh.',
    'hero.btn.projects': 'Lihat Proyek',
    'hero.btn.contact': 'Hubungi Saya',
    'projects.title': 'Karya Terpilih',
    'projects.subtitle': 'Koleksi proyek yang menunjukkan fokus saya pada antarmuka bersih dan arsitektur solid.',
    'projects.visit': 'Kunjungi Proyek',
    'status.completed': 'Selesai',
    'status.in_progress': 'Sedang Dikerjakan',
    'about.title': 'Tentang',
    'about.p1': 'Saya adalah pengembang perangkat lunak yang berfokus pada efisiensi baris kode, arsitektur data yang kokoh, dan pengalaman pengguna yang intuitif.',
    'about.p2': 'Memiliki ketertarikan tinggi pada performa website modern, optimalisasi backend, dan desain antarmuka yang presisi. Pendekatan saya terhadap pengembangan selalu mengutamakan fungsionalitas dan kebersihan kode sebelum menambahkan lapisan visual yang kompleks.',
    'about.tech': 'Teknologi',
    'contact.title': 'Hubungi Saya',
    'contact.subtitle': 'Ada proyek yang ingin didiskusikan atau sekadar menyapa? Jangan ragu untuk menghubungi.',
    'contact.name': 'Nama',
    'contact.email': 'Email',
    'contact.message': 'Pesan',
    'contact.send': 'Kirim Pesan',
    'contact.sending': 'Mengirim...',
    'contact.success': 'Terkirim ✓',
    'admin.back': '← KEMBALI',
    'admin.title': 'DASHBOARD ADMIN',
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => 
    (localStorage.getItem('pref_lang') as Language) || 'en'
  );
  const [theme, setThemeState] = useState<Theme>(() => 
    (localStorage.getItem('pref_theme') as Theme) || 'pitch-black'
  );
  const [font, setFontState] = useState<Font>(() => 
    (localStorage.getItem('pref_font') as Font) || 'sans'
  );

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('pref_lang', lang);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('pref_theme', newTheme);
  };

  const setFont = (newFont: Font) => {
    setFontState(newFont);
    localStorage.setItem('pref_font', newFont);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-font', font);
  }, [theme, font]);

  return (
    <SettingsContext.Provider value={{ language, theme, font, setLanguage, setTheme, setFont, t }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
