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

import nutrifyImg from './assets/asset-nutrify.png';
import kubuImg from './assets/kubu-asset.png';
import reucImg from './assets/reuc-asset.png';
import anekaJajananImg from './assets/asset-anekajajanan.png';

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
            Roychan501.
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
                Roychan501.
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
                #1
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
              {/* Image Layer */}
              <div className="absolute inset-0 flex items-center justify-center select-none overflow-hidden transition-transform duration-500 group-hover:scale-105 bg-stone-200">
                <img src={nutrifyImg} alt="Nutrify" className="w-full h-full object-cover grayscale" />
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
              {/* Image Layer */}
              <div className="absolute inset-0 flex items-center justify-center select-none overflow-hidden transition-transform duration-500 group-hover:scale-105 bg-stone-200">
                <img src={kubuImg} alt="Kubu App" className="w-full h-full object-cover grayscale" />
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

            {/* Project 3: Reuc (37% Width) */}
            <div
              className="group relative w-full md:w-[37%] h-[350px] md:h-[400px] border-4 border-black bg-stone-900 overflow-hidden cursor-pointer shadow-[8px_8px_0_0_#000]"
            >
              {/* Image Layer */}
              <div className="absolute inset-0 flex items-center justify-center select-none overflow-hidden transition-transform duration-500 group-hover:scale-105 bg-stone-200">
                <img src={reucImg} alt="Reuc" className="w-full h-full object-cover grayscale" />
              </div>

              {/* Instant Hover Overlay */}
              <div className="absolute inset-0 bg-black text-white flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <h3 className="text-3xl font-black uppercase tracking-tight mb-1 text-center">
                  REUC
                </h3>
                <p className="font-mono text-xs uppercase text-stone-400 mb-6 border-b border-stone-800 pb-2 w-[85%] text-center">
                  Website Merchandise Untuk Brand Dengan Sistem Pre-Order
                </p>

                <ul className="flex flex-wrap justify-center gap-1.5 mb-8 font-mono text-xs">
                  <li className="border border-stone-700 bg-stone-900 text-stone-300 px-2.5 py-1">REACT.JS</li>
                  <li className="border border-stone-700 bg-stone-900 text-stone-300 px-2.5 py-1">TAILWIND CSS</li>
                </ul>

                <div className="flex gap-3">
                  <a
                    href="https://reuc.vercel.app/"
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

            {/* Project 4: Aneka Jajanan (60% Width) */}
            <div
              className="group relative w-full md:w-[60%] h-[350px] md:h-[400px] border-4 border-black bg-stone-900 overflow-hidden cursor-pointer shadow-[8px_8px_0_0_#000]"
            >
              {/* Image Layer */}
              <div className="absolute inset-0 flex items-center justify-center select-none overflow-hidden transition-transform duration-500 group-hover:scale-105 bg-stone-200">
                <img src={anekaJajananImg} alt="Aneka Jajanan" className="w-full h-full object-cover grayscale" />
              </div>

              {/* Instant Hover Overlay */}
              <div className="absolute inset-0 bg-black text-white flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-1">
                  ANEKA JAJANAN
                </h3>
                <p className="font-mono text-xs md:text-sm uppercase text-stone-400 mb-6 border-b border-stone-800 pb-2 w-[80%] text-center">
                  Katalog Aneka Jajanan
                </p>

                <ul className="flex flex-wrap justify-center gap-2 mb-8 font-mono text-xs">
                  <li className="border border-stone-700 bg-stone-900 text-stone-300 px-3 py-1">REACT.JS</li>
                  <li className="border border-stone-700 bg-stone-900 text-stone-300 px-3 py-1">TAILWIND CSS</li>
                </ul>

                <div className="flex gap-4">
                  <a
                    href="https://anekajajanan.vercel.app/"
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
                  #2
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
              <input type="hidden" name="subject" value="Pesan Baru dari Portofolio roychan501.tech" />
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
            Roychan501
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
