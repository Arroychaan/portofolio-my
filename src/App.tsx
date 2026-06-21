import React, { useState } from 'react';
import githubIcon from './assets/github-logo-png_seeklogo-304612.png';
import linkedinIcon from './assets/linkedin.png';
import instagramIcon from './assets/instagram.png';
import aboutPhoto from './assets/fotobawah.jpg';

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

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Async Web3Forms handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus('success');
        e.currentTarget.reset();
        setTimeout(() => setFormStatus('idle'), 3500);
      } else {
        setFormStatus('error');
        alert(data.message || 'Gagal mengirim pesan. Silakan coba lagi.');
        setTimeout(() => setFormStatus('idle'), 3500);
      }
    } catch (error) {
      setFormStatus('error');
      alert('Terjadi kesalahan koneksi. Silakan periksa koneksi internet Anda.');
      setTimeout(() => setFormStatus('idle'), 3500);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1c1917] font-sans antialiased selection:bg-black selection:text-white">
      {/* 1. FIXED TOP NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf9] border-b-4 border-black">
        <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
          <a href="#" className="font-black text-2xl tracking-tighter uppercase select-none">
            ARR&CO.
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-10 font-mono text-sm font-bold uppercase">
            <li>
              <a href="#projects" className="relative py-1 group">
                PROYEK
                <span className="absolute left-0 bottom-0 w-full h-[3px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
              </a>
            </li>
            <li>
              <a href="#about" className="relative py-1 group">
                TENTANG
                <span className="absolute left-0 bottom-0 w-full h-[3px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
              </a>
            </li>
            <li>
              <a href="#contact" className="relative py-1 group">
                KONTAK
                <span className="absolute left-0 bottom-0 w-full h-[3px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
              </a>
            </li>
          </ul>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden flex flex-col gap-1.5 justify-center items-end w-8 h-8 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className="w-8 h-1 bg-black"></span>
            <span className="w-6 h-1 bg-black"></span>
            <span className="w-7 h-1 bg-black"></span>
          </button>
        </div>

        {/* Mobile Fullscreen Overlay Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between p-8 animate-fade-in">
            <div className="flex justify-between items-center">
              <span className="font-black text-2xl tracking-tighter uppercase">
                ARR&CO.
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-3xl font-mono focus:outline-none hover:text-zinc-400"
                aria-label="Close Menu"
              >
                ✕
              </button>
            </div>
            <ul className="flex flex-col gap-8 text-center font-mono text-3xl font-extrabold uppercase tracking-wider my-auto">
              <li>
                <a
                  href="#projects"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:line-through hover:text-zinc-400"
                >
                  PROYEK
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:line-through hover:text-zinc-400"
                >
                  TENTANG
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:line-through hover:text-zinc-400"
                >
                  KONTAK
                </a>
              </li>
            </ul>
            <div className="text-center font-mono text-xs text-zinc-500">
              © 2026 ACHMAD ROYCHAN. ALL RIGHTS RESERVED.
            </div>
          </div>
        )}
      </nav>

      {/* GLOBAL WRAPPER */}
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-16">

        {/* 2. HERO SECTION */}
        <header className="min-h-[75vh] md:min-h-[80vh] flex flex-col md:flex-row items-center justify-between gap-12 border-b-4 border-black pb-16 mb-16 relative">
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter">
              HELLO! <br />
              <span className="inline-block bg-black text-white px-4 py-2 mt-2 select-none border-2 border-black shadow-[4px_4px_0_0_#a8a29e]">
                I'M ROYCHAN.
              </span>
            </h1>
            <p className="font-mono text-base md:text-lg text-stone-600 border-l-4 border-black pl-4 py-2 max-w-xl uppercase bg-stone-100">
              A multidisciplinary developer with a focus on core web performance, solid architecture, and clean technical execution.
            </p>
          </div>

          <div className="flex-1 flex justify-center md:justify-end w-full md:w-auto">
            {/* Avatar Frame - No Rounded Corners, Hard Block Shadow */}
            <div
              className="w-64 h-64 md:w-80 md:h-80 border-4 border-black bg-stone-300 relative select-none"
              style={{ boxShadow: '12px 12px 0 0 #000' }}
            >
              <img
                src="/profil.jpeg"
                alt="Achmad Roychan"
                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300 pointer-events-none"
              />
              <div className="absolute top-2 left-2 bg-black text-white font-mono text-[10px] px-2 py-0.5 border border-white">
                SYS: ACTIVE
              </div>
            </div>
          </div>

          {/* Down Bouncing Scroll Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-500 animate-pulse">
              SCROLL DOWN
            </span>
            <svg
              className="w-6 h-6 animate-bounce text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </header>

        {/* 3. NOTES BANNER */}
        <div className="mb-6 flex justify-between items-center">
          <p className="hidden md:block font-mono text-sm font-bold uppercase text-stone-500 bg-stone-100 px-3 py-1 border border-zinc-300">
            [+] Hover over any project to learn more
          </p>
          <p className="block md:hidden font-mono text-sm font-bold uppercase text-stone-500 bg-stone-100 px-3 py-1 border border-zinc-300 w-full text-center">
            [+] Tap any project to learn more
          </p>
        </div>

        {/* 4. PROJECTS SECTION */}
        <section id="projects" className="space-y-12 mb-24">
          {/* ROW 1: Project 1 (60%) and Project 2 (37%) */}
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">

            {/* Project 1: Nutrify (60% Width) */}
            <div
              className="group relative w-full md:w-[60%] h-[350px] md:h-[400px] border-4 border-black bg-stone-900 overflow-hidden cursor-pointer shadow-[8px_8px_0_0_#000]"
            >
              {/* Technical Drawing Blueprint Layer */}
              <div className="absolute inset-0 flex items-center justify-center p-8 select-none overflow-hidden transition-transform duration-500 group-hover:scale-105">
                <svg className="w-full h-full text-stone-700 opacity-40 font-mono" viewBox="0 0 400 300">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  <circle cx="200" cy="150" r="80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                  <path d="M 50 150 L 350 150 M 200 50 L 200 250" stroke="currentColor" strokeWidth="1" />
                  <text x="60" y="80" fill="currentColor" className="text-[12px] font-bold">SYS_DIAG: NUTRIFY_TRACKER</text>
                  <path d="M 80 220 Q 150 120 200 180 T 320 100" fill="none" stroke="#fff" strokeWidth="3" />
                  <text x="210" y="240" fill="currentColor" className="text-[10px]">MACRO CALIBRATION: ACTIVE</text>
                </svg>
              </div>

              {/* Instant Hover Overlay */}
              <div className="absolute inset-0 bg-black text-white flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-1">
                  NUTRIFY
                </h3>
                <p className="font-mono text-xs md:text-sm uppercase text-stone-400 mb-6 border-b border-stone-800 pb-2 w-[80%] text-center">
                  Aplikasi Pelacakan Nutrisi & Kesehatan
                </p>

                <ul className="flex flex-wrap justify-center gap-2 mb-8 font-mono text-xs">
                  <li className="border border-stone-700 bg-stone-900 text-stone-300 px-3 py-1">REACT.JS</li>
                  <li className="border border-stone-700 bg-stone-900 text-stone-300 px-3 py-1">TAILWIND CSS</li>
                  <li className="border border-stone-700 bg-stone-900 text-stone-300 px-3 py-1">VERCEL</li>
                  <li className="border border-stone-700 bg-stone-900 text-stone-300 px-3 py-1">CHARTS.JS</li>
                </ul>

                <div className="flex gap-4">
                  <a
                    href="https://nutrify-app-sigma.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="border-2 border-white bg-white text-black hover:bg-stone-200 px-5 py-2 font-mono text-sm font-bold uppercase transition-colors"
                  >
                    LIVE DEMO ↗
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="border-2 border-white bg-transparent text-white hover:bg-stone-900 px-5 py-2 font-mono text-sm font-bold uppercase transition-colors"
                  >
                    CODE ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2: Kubu App (37% Width) */}
            <div
              className="group relative w-full md:w-[37%] h-[350px] md:h-[400px] border-4 border-black bg-stone-900 overflow-hidden cursor-pointer shadow-[8px_8px_0_0_#000]"
            >
              {/* Technical Drawing Blueprint Layer */}
              <div className="absolute inset-0 flex items-center justify-center p-6 select-none overflow-hidden transition-transform duration-500 group-hover:scale-105">
                <svg className="w-full h-full text-stone-700 opacity-40 font-mono" viewBox="0 0 300 300">
                  <rect width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1" />
                  {/* Kanban Outline Columns */}
                  <rect x="20" y="40" width="70" height="220" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="110" y="40" width="70" height="220" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="200" y="40" width="70" height="220" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <text x="25" y="30" fill="currentColor" className="text-[10px] font-bold">TODO</text>
                  <text x="115" y="30" fill="currentColor" className="text-[10px] font-bold">WIP</text>
                  <text x="205" y="30" fill="currentColor" className="text-[10px] font-bold">DONE</text>

                  {/* Mini Cards inside columns */}
                  <rect x="25" y="50" width="60" height="40" fill="none" stroke="currentColor" strokeWidth="1" />
                  <line x1="30" y1="65" x2="80" y2="65" stroke="currentColor" strokeWidth="1" />
                  <line x1="30" y1="75" x2="65" y2="75" stroke="currentColor" strokeWidth="1" />

                  <rect x="115" y="50" width="60" height="55" fill="none" stroke="currentColor" strokeWidth="1" />
                  <line x1="120" y1="65" x2="170" y2="65" stroke="currentColor" strokeWidth="1" />
                  <line x1="120" y1="75" x2="160" y2="75" stroke="currentColor" strokeWidth="1" />
                  <line x1="120" y1="85" x2="145" y2="85" stroke="currentColor" strokeWidth="1" />

                  <rect x="205" y="50" width="60" height="30" fill="none" stroke="currentColor" strokeWidth="1" />
                  <line x1="210" y1="65" x2="255" y2="65" stroke="#fff" strokeWidth="2" />
                </svg>
              </div>

              {/* Instant Hover Overlay */}
              <div className="absolute inset-0 bg-black text-white flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <h3 className="text-3xl font-black uppercase tracking-tight mb-1 text-center">
                  KUBU APP
                </h3>
                <p className="font-mono text-xs uppercase text-stone-400 mb-6 border-b border-stone-800 pb-2 w-[85%] text-center">
                  Aplikasi sosial media dengan polling
                </p>

                <ul className="flex flex-wrap justify-center gap-1.5 mb-8 font-mono text-xs">
                  <li className="border border-stone-700 bg-stone-900 text-stone-300 px-2.5 py-1">NEXT.JS</li>
                  <li className="border border-stone-700 bg-stone-900 text-stone-300 px-2.5 py-1">TYPESCRIPT</li>
                  <li className="border border-stone-700 bg-stone-900 text-stone-300 px-2.5 py-1">POSTGRES</li>
                </ul>

                <div className="flex gap-3">
                  <a
                    href="https://kubu-app.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="border-2 border-white bg-white text-black hover:bg-stone-200 px-4 py-2 font-mono text-xs font-bold uppercase transition-colors"
                  >
                    LIVE DEMO ↗
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="border-2 border-white bg-transparent text-white hover:bg-stone-900 px-4 py-2 font-mono text-xs font-bold uppercase transition-colors"
                  >
                    CODE ↗
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* ROW 2: Project 3 (37%) and Project 4 (60%) */}
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">

            {/* Project 3: Aether Compiler (37% Width) */}
            <div
              className="group relative w-full md:w-[37%] h-[350px] md:h-[400px] border-4 border-black bg-stone-900 overflow-hidden cursor-pointer shadow-[8px_8px_0_0_#000]"
            >
              {/* Technical Drawing Blueprint Layer */}
              <div className="absolute inset-0 flex items-center justify-center p-6 select-none overflow-hidden transition-transform duration-500 group-hover:scale-105">
                <svg className="w-full h-full text-stone-700 opacity-40 font-mono" viewBox="0 0 300 300">
                  <rect x="10" y="10" width="280" height="280" fill="none" stroke="currentColor" strokeWidth="1" />
                  {/* IDE-like Lines */}
                  <text x="25" y="40" fill="currentColor" className="text-[9px] font-bold">1: import compiler from 'aether-core';</text>
                  <text x="25" y="55" fill="currentColor" className="text-[9px] font-bold">2: const source = readFileSync('./src.ae');</text>
                  <text x="25" y="70" fill="currentColor" className="text-[9px] font-bold">3: </text>
                  <text x="25" y="85" fill="currentColor" className="text-[9px] font-bold">4: export function compile(ast) &#123;</text>
                  <text x="25" y="100" fill="currentColor" className="text-[9px] font-bold">5:   const tokens = compiler.tokenize(ast);</text>
                  <text x="25" y="115" fill="currentColor" className="text-[9px] font-bold">6:   const binary = compiler.codegen(tokens);</text>
                  <text x="25" y="130" fill="currentColor" className="text-[9px] font-bold">7:   return binary;</text>
                  <text x="25" y="145" fill="currentColor" className="text-[9px] font-bold">8: &#125;</text>

                  {/* Terminal block at bottom */}
                  <rect x="20" y="180" width="260" height="90" fill="currentColor" opacity="0.1" />
                  <rect x="20" y="180" width="260" height="90" fill="none" stroke="currentColor" strokeWidth="1" />
                  <text x="30" y="200" fill="#fff" className="text-[8px] font-bold">AETHER COMPILER CLI v1.2.0</text>
                  <text x="30" y="220" fill="currentColor" className="text-[8px]">{'>>'} Tokenizing source: Done. (45ms)</text>
                  <text x="30" y="235" fill="currentColor" className="text-[8px]">{'>>'} Optimizing AST layout: 104 nodes.</text>
                  <text x="30" y="250" fill="currentColor" className="text-[8px]">{'>>'} Output: ./bin/main.wasm (14.2kb)</text>
                </svg>
              </div>

              {/* Instant Hover Overlay */}
              <div className="absolute inset-0 bg-black text-white flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <h3 className="text-3xl font-black uppercase tracking-tight mb-1 text-center">
                  AETHER TOOL
                </h3>
                <p className="font-mono text-xs uppercase text-stone-400 mb-6 border-b border-stone-800 pb-2 w-[85%] text-center">
                  Kompiler WebAssembly Kustom & CLI
                </p>

                <ul className="flex flex-wrap justify-center gap-1.5 mb-8 font-mono text-xs">
                  <li className="border border-stone-700 bg-stone-900 text-stone-300 px-2.5 py-1">RUST</li>
                  <li className="border border-stone-700 bg-stone-900 text-stone-300 px-2.5 py-1">WASM</li>
                  <li className="border border-stone-700 bg-stone-900 text-stone-300 px-2.5 py-1">NODEJS</li>
                </ul>

                <div className="flex gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="border-2 border-white bg-white text-black hover:bg-stone-200 px-4 py-2 font-mono text-xs font-bold uppercase transition-colors"
                  >
                    LIHAT CODE ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Project 4: Omni Dashboard (60% Width) */}
            <div
              className="group relative w-full md:w-[60%] h-[350px] md:h-[400px] border-4 border-black bg-stone-900 overflow-hidden cursor-pointer shadow-[8px_8px_0_0_#000]"
            >
              {/* Technical Drawing Blueprint Layer */}
              <div className="absolute inset-0 flex items-center justify-center p-8 select-none overflow-hidden transition-transform duration-500 group-hover:scale-105">
                <svg className="w-full h-full text-stone-700 opacity-40 font-mono" viewBox="0 0 400 300">
                  <defs>
                    <pattern id="grid-large" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-large)" />
                  {/* Grid Layout Cards */}
                  <rect x="20" y="30" width="160" height="110" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="200" y="30" width="180" height="110" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="20" y="160" width="360" height="110" fill="none" stroke="currentColor" strokeWidth="1.5" />

                  {/* Visual charts inside */}
                  <circle cx="100" cy="85" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M 100 55 A 30 30 0 0 1 130 85" stroke="#fff" strokeWidth="3" fill="none" />

                  <line x1="220" y1="110" x2="220" y2="60" stroke="currentColor" strokeWidth="4" />
                  <line x1="250" y1="110" x2="250" y2="50" stroke="currentColor" strokeWidth="4" />
                  <line x1="280" y1="110" x2="280" y2="80" stroke="currentColor" strokeWidth="4" />
                  <line x1="310" y1="110" x2="310" y2="40" stroke="currentColor" strokeWidth="4" />

                  {/* Waves in bottom grid */}
                  <path d="M 30 240 Q 90 180 150 220 T 270 190 T 370 230" fill="none" stroke="currentColor" strokeWidth="2" />
                  <text x="35" y="175" fill="currentColor" className="text-[10px] font-bold">SERVER METRICS ANALYSIS</text>
                </svg>
              </div>

              {/* Instant Hover Overlay */}
              <div className="absolute inset-0 bg-black text-white flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-1">
                  OMNI DASH
                </h3>
                <p className="font-mono text-xs md:text-sm uppercase text-stone-400 mb-6 border-b border-stone-800 pb-2 w-[80%] text-center">
                  Sistem Analytics & Visualisasi Data Real-Time
                </p>

                <ul className="flex flex-wrap justify-center gap-2 mb-8 font-mono text-xs">
                  <li className="border border-stone-700 bg-stone-900 text-stone-300 px-3 py-1">REACT.JS</li>
                  <li className="border border-stone-700 bg-stone-900 text-stone-300 px-3 py-1">D3.JS</li>
                  <li className="border border-stone-700 bg-stone-900 text-stone-300 px-3 py-1">WEBSOCKETS</li>
                  <li className="border border-stone-700 bg-stone-900 text-stone-300 px-3 py-1">DOCKER</li>
                </ul>

                <div className="flex gap-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="border-2 border-white bg-white text-black hover:bg-stone-200 px-5 py-2 font-mono text-sm font-bold uppercase transition-colors"
                  >
                    LIVE DEMO ↗
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="border-2 border-white bg-transparent text-white hover:bg-stone-900 px-5 py-2 font-mono text-sm font-bold uppercase transition-colors"
                  >
                    CODE ↗
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 5. ABOUT ME SECTION */}
        <section id="about" className="border-t-4 border-black pt-16 mb-24">
          <div className="flex flex-col md:flex-row justify-between gap-12">

            {/* Bio text (60%) */}
            <div className="flex-[3] space-y-6">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter relative inline-block select-none">
                ABOUT ME
                <span className="absolute left-0 bottom-0.5 w-full h-[6px] bg-stone-300 -z-10"></span>
              </h2>
              <p className="font-mono text-stone-600 leading-relaxed text-sm md:text-base uppercase bg-stone-50 p-4 border-l-4 border-black">
                Saya adalah pengembang perangkat lunak yang berfokus pada efisiensi baris kode, arsitektur data yang kokoh, dan pengalaman pengguna yang intuitif. Memiliki ketertarikan tinggi pada performa website modern, optimalisasi backend, dan desain antarmuka yang presisi.
              </p>
              <p className="font-mono text-stone-600 leading-relaxed text-sm md:text-base uppercase">
                Dengan pengalaman mengintegrasikan berbagai framework web modern dan arsitektur database, saya berkomitmen menciptakan aplikasi berkinerja tinggi yang andal, aman, dan mudah dikelola.
              </p>
            </div>

            {/* About Photo Panel (30%) */}
            <div className="flex-[2] flex items-center justify-center w-full">
              <div
                className="w-full max-w-[280px] aspect-square border-4 border-black bg-stone-100 relative select-none"
                style={{ boxShadow: '8px 8px 0 0 #000' }}
              >
                <img
                  src={aboutPhoto}
                  alt="Tentang Achmad"
                  className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300 pointer-events-none"
                />
                <div className="absolute top-2 left-2 bg-black text-white font-mono text-[10px] px-2 py-0.5 border border-white">
                  SYS: INFO_SEC
                </div>
              </div>
            </div>

          </div>

          {/* Full-width Toolkit Grid */}
          <div className="mt-20 border-t-2 border-dashed border-stone-300 pt-16">
            <h3 className="font-mono text-xs font-black uppercase text-stone-500 mb-10 tracking-wider">
              Tool Yang Saya Pakai:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-12 gap-x-6 text-center select-none">

              {/* HTML */}
              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 flex items-center justify-center border-2 border-transparent group-hover:border-black transition-all p-2 bg-transparent shadow-none group-hover:shadow-[4px_4px_0_0_#000]">
                  <img src={htmlLogo} alt="HTML Logo" className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <span className="mt-3 font-mono text-[11px] font-bold uppercase text-stone-700 group-hover:text-black tracking-wider transition-colors duration-300">HTML</span>
              </div>

              {/* CSS */}
              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 flex items-center justify-center border-2 border-transparent group-hover:border-black transition-all p-2 bg-transparent shadow-none group-hover:shadow-[4px_4px_0_0_#000]">
                  <img src={cssLogo} alt="CSS Logo" className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <span className="mt-3 font-mono text-[11px] font-bold uppercase text-stone-700 group-hover:text-black tracking-wider transition-colors duration-300">CSS</span>
              </div>

              {/* React.js */}
              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 flex items-center justify-center border-2 border-transparent group-hover:border-black transition-all p-2 bg-transparent shadow-none group-hover:shadow-[4px_4px_0_0_#000]">
                  <img src={reactLogo} alt="React.js Logo" className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <span className="mt-3 font-mono text-[11px] font-bold uppercase text-stone-700 group-hover:text-black tracking-wider transition-colors duration-300">React.js</span>
              </div>

              {/* Next.js */}
              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 flex items-center justify-center border-2 border-transparent group-hover:border-black transition-all p-2 bg-transparent shadow-none group-hover:shadow-[4px_4px_0_0_#000]">
                  <img src={nextjsLogo} alt="Next.js Logo" className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <span className="mt-3 font-mono text-[11px] font-bold uppercase text-stone-700 group-hover:text-black tracking-wider transition-colors duration-300">Next.js</span>
              </div>

              {/* TypeScript */}
              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 flex items-center justify-center border-2 border-transparent group-hover:border-black transition-all p-2 bg-transparent shadow-none group-hover:shadow-[4px_4px_0_0_#000]">
                  <img src={typescriptLogo} alt="TypeScript Logo" className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <span className="mt-3 font-mono text-[11px] font-bold uppercase text-stone-700 group-hover:text-black tracking-wider transition-colors duration-300">TypeScript</span>
              </div>

              {/* Tailwind CSS */}
              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 flex items-center justify-center border-2 border-transparent group-hover:border-black transition-all p-2 bg-transparent shadow-none group-hover:shadow-[4px_4px_0_0_#000]">
                  <img src={tailwindLogo} alt="Tailwind CSS Logo" className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <span className="mt-3 font-mono text-[11px] font-bold uppercase text-stone-700 group-hover:text-black tracking-wider transition-colors duration-300">Tailwind CSS</span>
              </div>

              {/* Node.js */}
              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 flex items-center justify-center border-2 border-transparent group-hover:border-black transition-all p-2 bg-transparent shadow-none group-hover:shadow-[4px_4px_0_0_#000]">
                  <img src={nodejsLogo} alt="Node.js Logo" className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <span className="mt-3 font-mono text-[11px] font-bold uppercase text-stone-700 group-hover:text-black tracking-wider transition-colors duration-300">Node.js</span>
              </div>

              {/* PostgreSQL */}
              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 flex items-center justify-center border-2 border-transparent group-hover:border-black transition-all p-2 bg-transparent shadow-none group-hover:shadow-[4px_4px_0_0_#000]">
                  <img src={postgresqlLogo} alt="PostgreSQL Logo" className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <span className="mt-3 font-mono text-[11px] font-bold uppercase text-stone-700 group-hover:text-black tracking-wider transition-colors duration-300">PostgreSQL</span>
              </div>

              {/* Java */}
              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 flex items-center justify-center border-2 border-transparent group-hover:border-black transition-all p-2 bg-transparent shadow-none group-hover:shadow-[4px_4px_0_0_#000]">
                  <img src={javaLogo} alt="Java Logo" className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <span className="mt-3 font-mono text-[11px] font-bold uppercase text-stone-700 group-hover:text-black tracking-wider transition-colors duration-300">Java</span>
              </div>

              {/* C++ */}
              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 flex items-center justify-center border-2 border-transparent group-hover:border-black transition-all p-2 bg-transparent shadow-none group-hover:shadow-[4px_4px_0_0_#000]">
                  <img src={cppLogo} alt="C++ Logo" className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <span className="mt-3 font-mono text-[11px] font-bold uppercase text-stone-700 group-hover:text-black tracking-wider transition-colors duration-300">C++</span>
              </div>
            </div>
          </div>

        </section>

      </div>

      {/* 6. CONTACT SECTION */}
      <section id="contact" className="border-t-4 border-black bg-stone-200 py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">

          {/* Left Column (30%) - Connect */}
          <div className="flex-[2] space-y-6">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter inline-block relative select-none">
              HUBUNGI SAYA
              <span className="absolute left-0 bottom-0.5 w-full h-[6px] bg-white -z-10"></span>
            </h2>

            <p className="font-mono text-sm text-stone-600 uppercase">
              Tertarik bekerja sama atau memiliki pertanyaan? Hubungi saya secara langsung melalui form di samping atau temukan saya di kanal media sosial berikut.
            </p>

            <div className="space-y-3 pt-4 font-mono text-sm">

              <a
                href="https://github.com/Arroychaan"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 border-2 border-black bg-white hover:bg-black hover:text-white p-3 font-bold transition-all w-full md:max-w-xs shadow-[4px_4px_0_0_#000] hover:shadow-none translate-y-0 active:translate-y-1"
              >
                <img src={githubIcon} alt="" className="w-5 h-5 object-contain group-hover:invert transition-all duration-200" />
                <span>GITHUB PROFILE</span>
              </a>
              <a
                href="https://www.linkedin.com/in/achmad-roychan-87459724b/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 border-2 border-black bg-white hover:bg-black hover:text-white p-3 font-bold transition-all w-full md:max-w-xs shadow-[4px_4px_0_0_#000] hover:shadow-none translate-y-0 active:translate-y-1"
              >
                <img src={linkedinIcon} alt="" className="w-5 h-5 object-contain group-hover:invert transition-all duration-200" />
                <span>LINKEDIN PROFILE</span>
              </a>
              <a
                href="https://www.instagram.com/ar.roychan/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 border-2 border-black bg-white hover:bg-black hover:text-white p-3 font-bold transition-all w-full md:max-w-xs shadow-[4px_4px_0_0_#000] hover:shadow-none translate-y-0 active:translate-y-1"
              >
                <img src={instagramIcon} alt="" className="w-5 h-5 object-contain group-hover:invert transition-all duration-200" />
                <span>INSTAGRAM PROFILE</span>
              </a>
            </div>
          </div>

          <div className="flex-[3] bg-[#fafaf9] border-4 border-black p-6 md:p-8 shadow-[8px_8px_0_0_#000]">
            <form onSubmit={handleSubmit} className="space-y-6 font-mono text-sm">
              {/* Web3Forms Configurations */}
              <input type="hidden" name="access_key" value="c8399c3d-17c5-49c2-9432-d09aab289e5c" />
              <input type="hidden" name="subject" value="Pesan Baru dari Portofolio arrnco.com" />
              <input type="hidden" name="from_name" value="Kontak Portofolio" />

              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Nama Anda
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="ACHMAD ROYCHAN"
                  className="w-full border-2 border-black p-3 bg-stone-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-400 placeholder-stone-400 text-stone-900 font-bold uppercase rounded-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Alamat Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="USER@DOMAIN.COM"
                  className="w-full border-2 border-black p-3 bg-stone-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-400 placeholder-stone-400 text-stone-900 font-bold uppercase rounded-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Pesan Anda
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="TULISKAN DETAIL PROYEK ATAU PESAN..."
                  className="w-full border-2 border-black p-3 bg-stone-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-400 placeholder-stone-400 text-stone-900 font-bold uppercase rounded-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className={`w-full border-2 border-black p-4 font-bold uppercase transition-all shadow-[4px_4px_0_0_#78716c] hover:shadow-none translate-y-0 active:translate-y-1 ${formStatus === 'submitting'
                  ? 'bg-stone-300 text-stone-600 cursor-not-allowed shadow-none translate-y-1'
                  : formStatus === 'success'
                    ? 'bg-green-600 text-white border-green-700'
                    : 'bg-black text-white hover:bg-stone-100 hover:text-black'
                  }`}
              >
                {formStatus === 'submitting'
                  ? 'MENGIRIM...'
                  : formStatus === 'success'
                    ? 'TERKIRIM ✓'
                    : 'KIRIM PESAN ↗'}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-black text-[#fafaf9] py-8 px-6 border-t-4 border-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-stone-400">
          <div className="text-center md:text-left font-bold uppercase">
            ARR&CO. / PORTFOLIO v2.6.0
          </div>
          <div className="text-center md:text-right">
            © 2026 ACHMAD ROYCHAN. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
