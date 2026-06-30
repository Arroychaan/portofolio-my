import { useState } from 'react';
import initialProjects from '../data/projects.json';
import { useSettings } from '../context/SettingsContext';

export default function AdminDashboard() {
  const { t } = useSettings();
  const [token, setToken] = useState(() => localStorage.getItem('github_pat') || '');
  const [tempToken, setTempToken] = useState('');
  const [isEditingToken, setIsEditingToken] = useState(!token);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [statusInput, setStatusInput] = useState('completed');
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
        demoUrl: demoUrl,
        status: statusInput
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
      setStatusInput('completed');
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
    <div style={{ cursor: 'auto' }} className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans antialiased p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl bg-white border border-[#EAEAEA] p-6 md:p-8 rounded-xl shadow-sm">
        <div className="flex justify-between items-center border-b border-[#EAEAEA] pb-4 mb-6">
          <h1 className="text-xl font-bold tracking-tight">{t('admin.title')}</h1>
          <a
            href="/"
            style={{ cursor: 'pointer' }}
            className="border border-[#EAEAEA] bg-white hover:bg-black hover:text-white px-3 py-1 font-mono text-xs font-bold transition-colors rounded"
          >
            {t('admin.back')}
          </a>
        </div>

        <div className="border border-[#EAEAEA] p-4 mb-6 bg-gray-50 rounded-lg font-mono text-xs">
          <h2 className="font-bold mb-2">GitHub Token</h2>
          {isEditingToken ? (
            <form onSubmit={handleSaveToken} className="space-y-3">
              <p className="text-gray-500 text-[10px]">
                Masukkan Personal Access Token (PAT) GitHub dengan izin 'repo'. Tersimpan secara lokal.
              </p>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="ghp_xxxxxxxxxxxxxxxx"
                  value={tempToken}
                  onChange={(e) => setTempToken(e.target.value)}
                  style={{ cursor: 'text' }}
                  className="flex-1 border border-[#EAEAEA] p-2 bg-white focus:outline-none rounded"
                  required
                />
                <button
                  type="submit"
                  style={{ cursor: 'pointer' }}
                  className="bg-black text-white hover:bg-gray-800 px-4 py-2 font-bold rounded"
                >
                  SIMPAN
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-between items-center">
              <span className="font-bold text-green-600">✓ TOKEN TERSIMPAN</span>
              <button
                onClick={handleClearToken}
                style={{ cursor: 'pointer' }}
                className="border border-[#EAEAEA] bg-white text-black hover:bg-gray-200 px-2 py-1 font-bold text-[10px] rounded"
              >
                HAPUS TOKEN
              </button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Nama Proyek</label>
            <input type="text" required placeholder="CONTOH: NUTRIFY" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isEditingToken || status === 'loading'} style={{ cursor: 'text' }} className="w-full border border-[#EAEAEA] p-3 bg-gray-50 focus:outline-none focus:bg-white focus:border-black rounded-lg" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Deskripsi Proyek (Subtitle)</label>
            <input type="text" required placeholder="CONTOH: APLIKASI PELACAK NUTRISI" value={description} onChange={(e) => setDescription(e.target.value)} disabled={isEditingToken || status === 'loading'} style={{ cursor: 'text' }} className="w-full border border-[#EAEAEA] p-3 bg-gray-50 focus:outline-none focus:bg-white focus:border-black rounded-lg" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Link Proyek (Demo URL)</label>
            <input type="url" required placeholder="CONTOH: HTTPS://NUTRIFY.VERCEL.APP" value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} disabled={isEditingToken || status === 'loading'} style={{ cursor: 'text' }} className="w-full border border-[#EAEAEA] p-3 bg-gray-50 focus:outline-none focus:bg-white focus:border-black rounded-lg" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Teknologi / Stack (Pisahkan koma)</label>
            <input type="text" placeholder="CONTOH: REACT.JS, TAILWIND CSS, VERCEL" value={technologies} onChange={(e) => setTechnologies(e.target.value)} disabled={isEditingToken || status === 'loading'} style={{ cursor: 'text' }} className="w-full border border-[#EAEAEA] p-3 bg-gray-50 focus:outline-none focus:bg-white focus:border-black rounded-lg" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Status Proyek</label>
            <select 
              value={statusInput} 
              onChange={(e) => setStatusInput(e.target.value)} 
              disabled={isEditingToken || status === 'loading'} 
              style={{ cursor: 'pointer' }} 
              className="w-full border border-[#EAEAEA] p-3 bg-gray-50 focus:outline-none focus:bg-white focus:border-black rounded-lg"
            >
              <option value="completed">Selesai (Completed)</option>
              <option value="in-progress">Sedang Dikerjakan (In Progress)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">Gambar Proyek</label>
            <input id="project-image" type="file" accept="image/*" required onChange={(e) => { if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]); }} disabled={isEditingToken || status === 'loading'} style={{ cursor: 'pointer' }} className="w-full border border-[#EAEAEA] p-3 bg-gray-50 focus:outline-none focus:bg-white text-xs rounded-lg" />
          </div>

          {status !== 'idle' && (
            <div className={`p-3 text-xs font-bold rounded-lg ${
              status === 'loading' ? 'bg-amber-50 text-amber-900 border border-amber-200' :
              status === 'success' ? 'bg-green-50 text-green-900 border border-green-200' :
              'bg-red-50 text-red-900 border border-red-200'
            }`}>
              {status === 'loading' ? '⏳ ' : status === 'success' ? '✓ ' : '✕ '}
              {statusMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isEditingToken || status === 'loading'}
            style={{ cursor: isEditingToken || status === 'loading' ? 'not-allowed' : 'pointer' }}
            className={`w-full p-4 font-bold transition-colors rounded-lg ${
              isEditingToken || status === 'loading'
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {status === 'loading' ? 'PROSES SUBMIT...' : 'TAMBAHKAN PORTFOLIO'}
          </button>
        </form>
      </div>
    </div>
  );
}
