import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import githubIcon from './assets/github-logo-png_seeklogo-304612.png';
import linkedinIcon from './assets/linkedin.png';
import instagramIcon from './assets/instagram.png';
import profilVideo from './assets/pengganti-gambar.mp4';

import htmlLogo from './assets/HTML_transparent.png';
import cssLogo from './assets/CSS_transparent.png';
import reactLogo from './assets/logo-react_transparent.png';
import nextjsLogo from './assets/nextjs_transparent.png';
import typescriptLogo from './assets/typescript.png';
import tailwindLogo from './assets/tailwindlogo_transparent.png';
import nodejsLogo from './assets/nodejslogo_transparent.png';
import postgresqlLogo from './assets/postgresql_transparent.png';
import javaLogo from './assets/JAVALOGO_transparent.png';
import cppLogo from './assets/c++.png';

import initialProjects from './data/projects.json';

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════
// ADMIN DASHBOARD (preserved from previous implementation)
// ═══════════════════════════════════════════════════════════════

const AdminDashboard = () => {
  const [token, setToken] = useState(() => localStorage.getItem('github_pat') || '');
  const [tempToken, setTempToken] = useState('');
  const [isEditingToken, setIsEditingToken] = useState(!token);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempToken.trim()) return;
    localStorage.setItem('github_pat', tempToken.trim());
    setToken(tempToken.trim());
    setIsEditingToken(false);
  };

  const handleClearToken = () => {
    localStorage.removeItem('github_pat');
    setToken('');
    setTempToken('');
    setIsEditingToken(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert("Silakan simpan Token GitHub terlebih dahulu!");
      return;
    }
    if (!imageFile) {
      alert("Silakan pilih gambar proyek!");
      return;
    }

    setStatus('loading');
    setStatusMessage('Mengonversi gambar...');

    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          const base64Content = result.split(',')[1];
          resolve(base64Content);
        };
        reader.onerror = reject;
      });
      reader.readAsDataURL(imageFile);
      const base64Image = await base64Promise;

      const fileExt = imageFile.name.split('.').pop();
      const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const filename = `${Date.now()}-${cleanTitle}.${fileExt}`;
      const imagePath = `public/projects/${filename}`;

      setStatusMessage('Mengupload gambar ke GitHub...');
      const uploadImageResponse = await fetch(
        `https://api.github.com/repos/Arroychaan/portofolio-my/contents/${imagePath}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
          },
          body: JSON.stringify({
            message: `Upload project image: ${filename}`,
            content: base64Image,
            branch: 'main'
          })
        }
      );

      if (!uploadImageResponse.ok) {
        const errData = await uploadImageResponse.json();
        throw new Error(`Gagal mengupload gambar: ${errData.message}`);
      }

      setStatusMessage('Mengambil database proyek...');
      const jsonPath = 'src/data/projects.json';
      const getJsonResponse = await fetch(
        `https://api.github.com/repos/Arroychaan/portofolio-my/contents/${jsonPath}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      let currentSha = '';
      let currentProjects: typeof initialProjects = [];

      if (getJsonResponse.ok) {
        const fileData = await getJsonResponse.json();
        currentSha = fileData.sha;
        const decodedContent = atob(fileData.content.replace(/\s/g, ''));
        currentProjects = JSON.parse(decodedContent);
      } else if (getJsonResponse.status === 404) {
        currentProjects = [...initialProjects];
      } else {
        const errData = await getJsonResponse.json();
        throw new Error(`Gagal membaca data proyek: ${errData.message}`);
      }

      const newProject = {
        title: title.toUpperCase(),
        subtitle: description,
        image: `/projects/${filename}`,
        technologies: technologies.split(',').map(tech => tech.trim().toUpperCase()).filter(Boolean),
        demoUrl: demoUrl
      };

      const updatedProjects = [...currentProjects, newProject];
      const updatedJsonString = JSON.stringify(updatedProjects, null, 2);
      const encodedJson = btoa(unescape(encodeURIComponent(updatedJsonString)));

      setStatusMessage('Memperbarui data proyek di GitHub...');
      const updateJsonBody: Record<string, string> = {
        message: `Add project: ${title}`,
        content: encodedJson,
        branch: 'main'
      };
      if (currentSha) {
        updateJsonBody.sha = currentSha;
      }

      const updateJsonResponse = await fetch(
        `https://api.github.com/repos/Arroychaan/portofolio-my/contents/${jsonPath}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
          },
          body: JSON.stringify(updateJsonBody)
        }
      );

      if (!updateJsonResponse.ok) {
        const errData = await updateJsonResponse.json();
        throw new Error(`Gagal memperbarui file JSON: ${errData.message}`);
      }

      setStatus('success');
      setStatusMessage('Proyek berhasil ditambahkan otomatis! Halaman akan di-rebuild oleh Vercel.');
      setTitle('');
      setDescription('');
      setDemoUrl('');
      setTechnologies('');
      setImageFile(null);
      const fileInput = document.getElementById('project-image') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error: unknown) {
      console.error(error);
      setStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'Terjadi kesalahan.');
    }
  };

  return (
    <div style={{ cursor: 'auto' }} className="min-h-screen bg-[#fafaf9] text-[#1c1917] font-sans antialiased p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0_0_#000]">
        <div className="flex justify-between items-center border-b-4 border-black pb-4 mb-6">
          <h1 className="text-2xl font-black uppercase tracking-tight">ADMIN DASHBOARD</h1>
          <a
            href="#"
            style={{ cursor: 'pointer' }}
            className="border-2 border-black bg-white hover:bg-black hover:text-white px-3 py-1 font-mono text-xs font-bold uppercase transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-none"
          >
            ← KEMBALI
          </a>
        </div>

        <div className="border-2 border-black p-4 mb-6 bg-stone-100 font-mono text-xs">
          <h2 className="font-bold uppercase mb-2">GitHub Token</h2>
          {isEditingToken ? (
            <form onSubmit={handleSaveToken} className="space-y-3">
              <p className="text-stone-600 uppercase text-[10px]">
                Masukkan Personal Access Token (PAT) GitHub dengan izin 'repo'. Tersimpan secara lokal.
              </p>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="ghp_xxxxxxxxxxxxxxxx"
                  value={tempToken}
                  onChange={(e) => setTempToken(e.target.value)}
                  style={{ cursor: 'text' }}
                  className="flex-1 border-2 border-black p-2 bg-white focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  style={{ cursor: 'pointer' }}
                  className="border-2 border-black bg-black text-white hover:bg-white hover:text-black px-4 py-2 font-bold uppercase"
                >
                  SIMPAN
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-between items-center">
              <span className="font-bold text-green-700">✓ TOKEN TERSIMPAN</span>
              <button
                onClick={handleClearToken}
                style={{ cursor: 'pointer' }}
                className="border border-black bg-white text-black hover:bg-stone-200 px-2 py-1 font-bold text-[10px]"
              >
                HAPUS TOKEN
              </button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 font-mono text-sm">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Nama Proyek</label>
            <input type="text" required placeholder="CONTOH: NUTRIFY" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isEditingToken || status === 'loading'} style={{ cursor: 'text' }} className="w-full border-2 border-black p-3 bg-stone-50 focus:outline-none focus:bg-white placeholder-stone-400 font-bold uppercase rounded-none" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Deskripsi Proyek (Subtitle)</label>
            <input type="text" required placeholder="CONTOH: APLIKASI PELACAK NUTRISI" value={description} onChange={(e) => setDescription(e.target.value)} disabled={isEditingToken || status === 'loading'} style={{ cursor: 'text' }} className="w-full border-2 border-black p-3 bg-stone-50 focus:outline-none focus:bg-white placeholder-stone-400 font-bold uppercase rounded-none" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Link Proyek (Demo URL)</label>
            <input type="url" required placeholder="CONTOH: HTTPS://NUTRIFY.VERCEL.APP" value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} disabled={isEditingToken || status === 'loading'} style={{ cursor: 'text' }} className="w-full border-2 border-black p-3 bg-stone-50 focus:outline-none focus:bg-white placeholder-stone-400 rounded-none" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Teknologi / Stack (Pisahkan dengan koma)</label>
            <input type="text" placeholder="CONTOH: REACT.JS, TAILWIND CSS, VERCEL" value={technologies} onChange={(e) => setTechnologies(e.target.value)} disabled={isEditingToken || status === 'loading'} style={{ cursor: 'text' }} className="w-full border-2 border-black p-3 bg-stone-50 focus:outline-none focus:bg-white placeholder-stone-400 font-bold uppercase rounded-none" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Gambar Proyek</label>
            <input id="project-image" type="file" accept="image/*" required onChange={(e) => { if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]); }} disabled={isEditingToken || status === 'loading'} style={{ cursor: 'pointer' }} className="w-full border-2 border-black p-3 bg-stone-50 focus:outline-none focus:bg-white text-xs rounded-none" />
          </div>

          {status !== 'idle' && (
            <div className={`border-2 border-black p-3 text-xs uppercase font-bold ${
              status === 'loading' ? 'bg-amber-100 text-amber-900 border-amber-900' :
              status === 'success' ? 'bg-green-100 text-green-900 border-green-900' :
              'bg-red-100 text-red-900 border-red-900'
            }`}>
              {status === 'loading' ? '⏳ ' : status === 'success' ? '✓ ' : '✕ '}
              {statusMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isEditingToken || status === 'loading'}
            style={{ cursor: isEditingToken || status === 'loading' ? 'not-allowed' : 'pointer' }}
            className={`w-full border-2 border-black p-4 font-bold uppercase transition-all shadow-[4px_4px_0_0_#78716c] hover:shadow-none translate-y-0 active:translate-y-1 rounded-none ${
              isEditingToken || status === 'loading'
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none translate-y-1'
                : 'bg-black text-white hover:bg-stone-100 hover:text-black'
            }`}
          >
            {status === 'loading' ? 'PROSES SUBMIT...' : 'TAMBAHKAN PORTFOLIO'}
          </button>
        </form>
      </div>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════
// CUSTOM CURSOR
// ═══════════════════════════════════════════════════════════════

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest('a, button, [data-cursor-hover]')) {
        cursorRef.current?.classList.add('is-hovering');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest('a, button, [data-cursor-hover]')) {
        cursorRef.current?.classList.remove('is-hovering');
      }
    };

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 8}px, ${pos.current.y - 8}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
};


// ═══════════════════════════════════════════════════════════════
// PRELOADER
// ═══════════════════════════════════════════════════════════════

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    const text = "ROYCHAN";
    textRef.current.innerHTML = text
      .split('')
      .map(char => `<span class="char">${char}</span>`)
      .join('');

    const chars = textRef.current.querySelectorAll('.char');

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    tl.to(chars, {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.5,
      ease: 'power3.out',
      delay: 0.3,
    });

    tl.to(chars, {
      opacity: 0,
      y: -30,
      stagger: 0.04,
      duration: 0.3,
      ease: 'power2.in',
      delay: 0.4,
    });
  }, [onComplete]);

  return (
    <div ref={containerRef} className="preloader">
      <div ref={textRef} className="preloader-text" />
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

const techStack = [
  { name: 'HTML', icon: htmlLogo },
  { name: 'CSS', icon: cssLogo },
  { name: 'React.js', icon: reactLogo },
  { name: 'Next.js', icon: nextjsLogo },
  { name: 'TypeScript', icon: typescriptLogo },
  { name: 'Tailwind', icon: tailwindLogo },
  { name: 'Node.js', icon: nodejsLogo },
  { name: 'PostgreSQL', icon: postgresqlLogo },
  { name: 'Java', icon: javaLogo },
  { name: 'C++', icon: cppLogo },
];

const App = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Refs for GSAP animations
  const heroRef = useRef<HTMLElement>(null);
  const heroNameRef = useRef<HTMLHeadingElement>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);
  const projectsTrackRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLParagraphElement>(null);
  const techRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Hash routing
  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isAdmin = currentHash === '#/admin';

  // Initialize Lenis + GSAP after preloader
  useEffect(() => {
    if (isLoading || isAdmin) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback);
    };
  }, [isLoading, isAdmin]);

  // GSAP Animations
  useEffect(() => {
    if (isLoading || isAdmin) return;

    const ctx = gsap.context(() => {
      // ── Hero animation ──
      if (heroNameRef.current) {
        gsap.fromTo(heroNameRef.current, 
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 }
        );
      }

      // Hero subtitle + scroll indicator
      gsap.fromTo('.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.8 }
      );
      gsap.fromTo('.scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 1.2 }
      );

      // Hero parallax on scroll
      if (heroRef.current && heroNameRef.current) {
        gsap.to(heroNameRef.current, {
          y: -150,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // ── Projects horizontal scroll (desktop only) ──
      const mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
        if (projectsSectionRef.current && projectsTrackRef.current) {
          const panels = projectsTrackRef.current.querySelectorAll('.project-panel');
          const totalScroll = (panels.length - 1) * window.innerWidth;

          gsap.to(projectsTrackRef.current, {
            x: -totalScroll,
            ease: 'none',
            scrollTrigger: {
              trigger: projectsSectionRef.current,
              start: 'top top',
              end: `+=${totalScroll}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              onUpdate: (self) => {
                const panelIndex = Math.round(self.progress * (panels.length - 1));
                panels.forEach((panel, i) => {
                  if (i === panelIndex) {
                    panel.classList.add('is-active');
                  } else {
                    panel.classList.remove('is-active');
                  }
                });
              },
            },
          });
        }
      });

      mm.add('(max-width: 768px)', () => {
        // On mobile, reveal projects vertically
        const panels = document.querySelectorAll('.project-panel');
        panels.forEach((panel) => {
          panel.classList.add('is-active');
          gsap.fromTo(panel,
            { opacity: 0, y: 60 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: panel, start: 'top 85%', toggleActions: 'play none none none' },
            }
          );
        });
      });

      // ── About text word-highlight ──
      if (aboutTextRef.current) {
        const words = aboutTextRef.current.querySelectorAll('.word');
        words.forEach((word, i) => {
          gsap.to(word, {
            className: 'word is-highlighted',
            scrollTrigger: {
              trigger: word,
              start: 'top 80%',
              end: 'top 40%',
              scrub: true,
            },
            delay: i * 0.01,
          });
        });
      }

      // ── Section reveals ──
      const revealSections = document.querySelectorAll('.section-reveal');
      revealSections.forEach((section) => {
        gsap.fromTo(section,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [isLoading, isAdmin]);


  // Contact form handler (Web3Forms)
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await response.json();
      if (data.success) {
        setFormStatus('success');
        e.currentTarget.reset();
        setTimeout(() => setFormStatus('idle'), 3500);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 3500);
      }
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3500);
    }
  }, []);


  // ── Admin route ──
  if (isAdmin) {
    return <AdminDashboard />;
  }

  // ── Loading screen ──
  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  // ── About text with word splitting ──
  const aboutContent = "Saya adalah pengembang perangkat lunak yang berfokus pada efisiensi baris kode, arsitektur data yang kokoh, dan pengalaman pengguna yang intuitif. Memiliki ketertarikan tinggi pada performa website modern, optimalisasi backend, dan desain antarmuka yang presisi.";
  const aboutWords = aboutContent.split(' ');

  return (
    <>
      <CustomCursor />

      {/* ══ NAVBAR ══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
          <a href="#" className="font-heading text-sm font-bold uppercase tracking-widest text-white">
            ROYCHAN<span className="text-[var(--accent)]">501</span>
          </a>

          {/* Desktop menu */}
          <ul className="hidden md:flex gap-10 font-mono text-xs font-bold uppercase tracking-widest text-white">
            <li><a href="#projects" className="hover:text-[var(--accent)] transition-colors duration-300">Proyek</a></li>
            <li><a href="#about" className="hover:text-[var(--accent)] transition-colors duration-300">Tentang</a></li>
            <li><a href="#contact" className="hover:text-[var(--accent)] transition-colors duration-300">Kontak</a></li>
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden flex flex-col gap-1.5 w-7 h-7 justify-center"
            aria-label="Toggle Menu"
          >
            <span className="w-7 h-[2px] bg-white" />
            <span className="w-5 h-[2px] bg-white" />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[var(--bg)] flex flex-col justify-center items-center">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-[var(--text)] text-2xl font-mono"
            aria-label="Close Menu"
          >
            ✕
          </button>
          <ul className="flex flex-col gap-8 text-center font-heading text-3xl font-bold uppercase tracking-wide text-[var(--text)]">
            <li><a href="#projects" onClick={() => setIsMenuOpen(false)} className="hover:text-[var(--accent)] transition-colors">Proyek</a></li>
            <li><a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-[var(--accent)] transition-colors">Tentang</a></li>
            <li><a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[var(--accent)] transition-colors">Kontak</a></li>
          </ul>
          <p className="absolute bottom-8 font-mono text-xs text-[var(--text-muted)]">© 2026 ACHMAD ROYCHAN</p>
        </div>
      )}

      {/* ══ HERO ══ */}
      <header ref={heroRef} className="min-h-screen flex flex-col justify-center items-center relative px-6">
        <div className="text-center">
          <h1 ref={heroNameRef} className="hero-name">ROYCHAN</h1>
          <p className="hero-subtitle mt-6">
            Developer&nbsp;&nbsp;·&nbsp;&nbsp;Architect&nbsp;&nbsp;·&nbsp;&nbsp;Creator
          </p>
        </div>

        {/* Profile video — subtle floating element */}
        <div className="absolute bottom-[15vh] right-[8vw] hidden lg:block">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-[var(--border-light)] opacity-40 hover:opacity-80 transition-opacity duration-500">
            <video src={profilVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-12 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="text-[var(--text-muted)]">
            <path d="M8 4L8 20M8 20L2 14M8 20L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </header>

      {/* ══ PROJECTS — HORIZONTAL SCROLL ══ */}
      <section ref={projectsSectionRef} id="projects" className="relative overflow-hidden">
        {/* Section header */}
        <div className="absolute top-6 left-6 md:left-12 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Selected Works
        </div>

        <div ref={projectsTrackRef} className="projects-track md:flex-nowrap flex-wrap md:flex">
          {initialProjects.map((project, index) => (
            <div key={project.title} className="project-panel">
              <div className="project-counter">
                {String(index + 1).padStart(2, '0')} / {String(initialProjects.length).padStart(2, '0')}
              </div>

              <div className="project-image-wrapper" data-cursor-hover>
                <a href={project.demoUrl} target="_blank" rel="noreferrer">
                  <img src={project.image} alt={project.title} loading="lazy" />
                </a>
              </div>

              <div className="project-title-overlay">{project.title}</div>
              <div className="project-subtitle-overlay">{project.subtitle}</div>

              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="project-link-overlay hidden md:block"
              >
                Live Demo ↗
              </a>

              <div className="project-tech-list">
                {project.technologies.map((tech) => (
                  <span key={tech} className="project-tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" className="py-32 md:py-48 px-6 md:px-12 section-reveal">
        <div className="max-w-[1000px] mx-auto">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-12 block">
            About
          </span>
          <p ref={aboutTextRef} className="about-text">
            {aboutWords.map((word, i) => (
              <span key={i} className="word">{word}</span>
            ))}
          </p>
        </div>
      </section>

      {/* ══ TECH STACK ══ */}
      <section ref={techRef} className="py-24 md:py-32 px-6 md:px-12 section-reveal">
        <div className="max-w-[1000px] mx-auto">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-16 block">
            Tech Stack
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-12 md:gap-16">
            {techStack.map((tech) => (
              <div key={tech.name} className="tech-icon-wrapper" data-cursor-hover>
                <img src={tech.icon} alt={tech.name} />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section ref={contactRef} id="contact" className="py-32 md:py-48 px-6 md:px-12 border-t border-[var(--border)]">
        <div className="max-w-[1000px] mx-auto">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-12 block section-reveal">
            Get In Touch
          </span>

          {/* Giant CTA text */}
          <div className="mb-20 section-reveal">
            <a
              href="mailto:achmadroychan@gmail.com"
              className="contact-giant-text block"
              data-cursor-hover
            >
              LET'S WORK<br />TOGETHER
            </a>
          </div>

          {/* Two columns: socials + form */}
          <div className="flex flex-col md:flex-row gap-16 md:gap-24 section-reveal">
            {/* Socials */}
            <div className="flex-[2] space-y-6">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">Connect</h3>
              <div className="space-y-3">
                <a href="https://github.com/Arroychaan" target="_blank" rel="noreferrer" className="flex items-center gap-3 font-mono text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors group" data-cursor-hover>
                  <img src={githubIcon} alt="" className="w-4 h-4 invert opacity-60 group-hover:opacity-100 transition-opacity" />
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/achmad-roychan-87459724b/" target="_blank" rel="noreferrer" className="flex items-center gap-3 font-mono text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors group" data-cursor-hover>
                  <img src={linkedinIcon} alt="" className="w-4 h-4 invert opacity-60 group-hover:opacity-100 transition-opacity" />
                  LinkedIn
                </a>
                <a href="https://www.instagram.com/ar.roychan/" target="_blank" rel="noreferrer" className="flex items-center gap-3 font-mono text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors group" data-cursor-hover>
                  <img src={instagramIcon} alt="" className="w-4 h-4 invert opacity-60 group-hover:opacity-100 transition-opacity" />
                  Instagram
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="flex-[3]">
              <form onSubmit={handleSubmit} className="space-y-6 font-mono text-sm">
                <input type="hidden" name="access_key" value="c8399c3d-17c5-49c2-9432-d09aab289e5c" />
                <input type="hidden" name="subject" value="Pesan Baru dari Portofolio roychan501.tech" />
                <input type="hidden" name="from_name" value="Kontak Portofolio" />

                <div>
                  <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">Nama</label>
                  <input
                    type="text" id="name" name="name" required placeholder="Nama Anda"
                    className="w-full bg-transparent border-b border-[var(--border-light)] focus:border-[var(--accent)] p-3 text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">Email</label>
                  <input
                    type="email" id="email" name="email" required placeholder="email@domain.com"
                    className="w-full bg-transparent border-b border-[var(--border-light)] focus:border-[var(--accent)] p-3 text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">Pesan</label>
                  <textarea
                    id="message" name="message" rows={4} required placeholder="Detail proyek atau pesan..."
                    className="w-full bg-transparent border-b border-[var(--border-light)] focus:border-[var(--accent)] p-3 text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  data-cursor-hover
                  className={`font-mono text-xs uppercase tracking-widest py-4 px-8 border transition-all duration-300 ${
                    formStatus === 'submitting'
                      ? 'border-[var(--text-muted)] text-[var(--text-muted)] cursor-wait'
                      : formStatus === 'success'
                        ? 'border-green-500 text-green-500'
                        : 'border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)]'
                  }`}
                >
                  {formStatus === 'submitting' ? 'MENGIRIM...' : formStatus === 'success' ? 'TERKIRIM ✓' : 'KIRIM PESAN ↗'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="py-8 px-6 md:px-12 border-t border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)]">
          <span>Roychan501</span>
          <span>© 2026 Achmad Roychan. All Rights Reserved.</span>
        </div>
      </footer>
    </>
  );
};

export default App;
