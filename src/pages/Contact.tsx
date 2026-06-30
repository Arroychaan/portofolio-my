import { useState, useCallback } from 'react';
import { useSettings } from '../context/SettingsContext';

export default function Contact() {
  const { t } = useSettings();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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

  return (
    <div className="max-w-[800px] w-full mx-auto px-6 py-20 md:py-32">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text)] mb-4">{t('contact.title')}</h1>
        <p className="text-[var(--text-muted)] text-lg">
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-12">
        {/* Contact Form */}
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input type="hidden" name="access_key" value="c8399c3d-17c5-49c2-9432-d09aab289e5c" />
            <input type="hidden" name="subject" value="Pesan Baru dari Portofolio roychan501.tech" />
            <input type="hidden" name="from_name" value="Kontak Portofolio" />

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-[var(--text-muted)]">{t('contact.name')}</label>
              <input
                type="text" id="name" name="name" required placeholder="John Doe"
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] placeholder-[var(--border-light)] focus:outline-none focus:border-[var(--text)] transition-colors"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-[var(--text-muted)]">{t('contact.email')}</label>
              <input
                type="email" id="email" name="email" required placeholder="john@example.com"
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] placeholder-[var(--border-light)] focus:outline-none focus:border-[var(--text)] transition-colors"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-[var(--text-muted)]">{t('contact.message')}</label>
              <textarea
                id="message" name="message" rows={5} required placeholder="..."
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] placeholder-[var(--border-light)] focus:outline-none focus:border-[var(--text)] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={formStatus === 'submitting'}
              className={`mt-2 font-medium rounded-lg px-6 py-3 transition-colors ${
                formStatus === 'submitting'
                  ? 'bg-[var(--border)] text-[var(--text-muted)] cursor-wait'
                  : formStatus === 'success'
                    ? 'bg-green-600 text-white'
                    : 'bg-[var(--text)] text-[var(--bg)] hover:opacity-80'
              }`}
            >
              {formStatus === 'submitting' ? t('contact.sending') : formStatus === 'success' ? t('contact.success') : t('contact.send')}
            </button>
          </form>
        </div>

        {/* Social Links */}
        <div className="md:col-span-2 flex flex-col gap-8">
          <div>
            <h3 className="text-sm font-medium text-[var(--text-muted)] mb-4">Email</h3>
            <a href="mailto:achmadroychan@gmail.com" className="text-[var(--text)] hover:text-[var(--text-muted)] transition-colors">
              achmadroychan@gmail.com
            </a>
          </div>
          <div>
            <h3 className="text-sm font-medium text-[var(--text-muted)] mb-4">Socials</h3>
            <div className="flex flex-col gap-3 font-mono text-sm">
              <a href="https://github.com/Arroychaan" target="_blank" rel="noreferrer" className="text-[var(--text)] hover:text-[var(--text-muted)] transition-colors">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/achmad-roychan-87459724b/" target="_blank" rel="noreferrer" className="text-[var(--text)] hover:text-[var(--text-muted)] transition-colors">LinkedIn ↗</a>
              <a href="https://www.instagram.com/ar.roychan/" target="_blank" rel="noreferrer" className="text-[var(--text)] hover:text-[var(--text-muted)] transition-colors">Instagram ↗</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
