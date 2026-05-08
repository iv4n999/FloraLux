import { useState } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../useStore';

export default function AnnouncementBar() {
  const { siteSettings } = useStore();
  const [dismissed, setDismissed] = useState(false);

  if (!siteSettings.announcementEnabled || dismissed) return null;

  return (
    <div className="text-white text-center py-2.5 px-4 text-sm font-medium relative" style={{ background: 'linear-gradient(90deg, #e11d48, #db2777, #9333ea)' }}>
      <span>{siteSettings.announcementBar}</span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-white/20 rounded-full p-1 transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}
