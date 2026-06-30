import { useSettings } from '../context/SettingsContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { language, theme, font, setLanguage, setTheme, setFont } = useSettings();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative w-full max-w-sm bg-[var(--bg)] border-l border-[var(--border)] h-full flex flex-col p-6 shadow-2xl animate-slide-in">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-[var(--border)]">
          <h2 className="text-xl font-bold text-[var(--text)]">Preferences</h2>
          <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
            Close ✕
          </button>
        </div>

        <div className="space-y-8 flex-1 overflow-y-auto">
          {/* Language Settings */}
          <section>
            <h3 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">Language</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setLanguage('en')}
                className={`flex-1 py-2 px-4 rounded border text-sm font-medium transition-colors ${language === 'en' ? 'bg-[var(--text)] text-[var(--bg)] border-[var(--text)]' : 'bg-[var(--bg-elevated)] text-[var(--text)] border-[var(--border)] hover:border-[var(--text-muted)]'}`}
              >
                English
              </button>
              <button 
                onClick={() => setLanguage('id')}
                className={`flex-1 py-2 px-4 rounded border text-sm font-medium transition-colors ${language === 'id' ? 'bg-[var(--text)] text-[var(--bg)] border-[var(--text)]' : 'bg-[var(--bg-elevated)] text-[var(--text)] border-[var(--border)] hover:border-[var(--text-muted)]'}`}
              >
                Indonesia
              </button>
            </div>
          </section>

          {/* Theme Settings */}
          <section>
            <h3 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">Theme</h3>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setTheme('pitch-black')} className={`p-3 rounded border text-left transition-colors flex items-center gap-3 ${theme === 'pitch-black' ? 'border-[var(--text)]' : 'border-[var(--border)] hover:border-[var(--text-muted)]'}`}>
                <span className="w-4 h-4 rounded-full bg-black border border-gray-700 block"></span>
                <span className="text-sm font-medium text-[var(--text)]">Pitch Black</span>
              </button>
              <button onClick={() => setTheme('slate')} className={`p-3 rounded border text-left transition-colors flex items-center gap-3 ${theme === 'slate' ? 'border-[var(--text)]' : 'border-[var(--border)] hover:border-[var(--text-muted)]'}`}>
                <span className="w-4 h-4 rounded-full bg-slate-900 border border-slate-700 block"></span>
                <span className="text-sm font-medium text-[var(--text)]">Slate</span>
              </button>
              <button onClick={() => setTheme('mocha')} className={`p-3 rounded border text-left transition-colors flex items-center gap-3 ${theme === 'mocha' ? 'border-[var(--text)]' : 'border-[var(--border)] hover:border-[var(--text-muted)]'}`}>
                <span className="w-4 h-4 rounded-full bg-[#27221F] border border-[#564B43] block"></span>
                <span className="text-sm font-medium text-[var(--text)]">Mocha</span>
              </button>
              <button onClick={() => setTheme('light')} className={`p-3 rounded border text-left transition-colors flex items-center gap-3 ${theme === 'light' ? 'border-[var(--text)]' : 'border-[var(--border)] hover:border-[var(--text-muted)]'}`}>
                <span className="w-4 h-4 rounded-full bg-[#FAFAFA] border border-[#CCCCCC] block"></span>
                <span className="text-sm font-medium text-[var(--text)]">Alabaster</span>
              </button>
            </div>
          </section>

          {/* Font Settings */}
          <section>
            <h3 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">Typography</h3>
            <div className="flex flex-col gap-3">
              <button onClick={() => setFont('sans')} className={`p-3 rounded border text-left transition-colors flex justify-between items-center ${font === 'sans' ? 'border-[var(--text)]' : 'border-[var(--border)] hover:border-[var(--text-muted)]'}`}>
                <span className="font-sans text-sm font-medium text-[var(--text)]">Inter (Sans)</span>
                {font === 'sans' && <span className="text-[var(--text)]">✓</span>}
              </button>
              <button onClick={() => setFont('serif')} className={`p-3 rounded border text-left transition-colors flex justify-between items-center ${font === 'serif' ? 'border-[var(--text)]' : 'border-[var(--border)] hover:border-[var(--text-muted)]'}`}>
                <span className="font-serif text-sm font-medium text-[var(--text)]">Playfair (Serif)</span>
                {font === 'serif' && <span className="text-[var(--text)]">✓</span>}
              </button>
              <button onClick={() => setFont('mono')} className={`p-3 rounded border text-left transition-colors flex justify-between items-center ${font === 'mono' ? 'border-[var(--text)]' : 'border-[var(--border)] hover:border-[var(--text-muted)]'}`}>
                <span className="font-mono text-sm font-medium text-[var(--text)]">JetBrains (Mono)</span>
                {font === 'mono' && <span className="text-[var(--text)]">✓</span>}
              </button>
            </div>
          </section>
        </div>
      </div>
      
      <style>{`
        .animate-slide-in {
          animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
