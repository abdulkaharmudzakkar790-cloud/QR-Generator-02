function Sidebar({ isOpen, onClose, onViewChange }) {
  try {
    const navLinks = [
      { label: 'Generator', icon: 'icon-house', action: () => onViewChange('generator') },
      { label: 'Riwayat QR', icon: 'icon-clock', action: () => onViewChange('history') },
      { label: 'Template', icon: 'icon-layout-template', action: () => {} },
      { label: 'Pengaturan', icon: 'icon-settings', href: '#' },
      { label: 'Bantuan', icon: 'icon-circle-help', href: '#' },
    ];

    return (
      <>
        {/* Backdrop */}
        <div 
          className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={onClose}
          data-name="sidebar-backdrop"
        ></div>

        {/* Sidebar Panel */}
        <aside 
          className={`fixed top-0 left-0 h-full w-80 bg-white z-[70] shadow-2xl transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
          data-name="sidebar-panel"
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <div className="icon-qr-code text-white text-lg"></div>
                </div>
                <span className="font-bold text-lg">QR GENERATOR</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              >
                <div className="icon-x text-xl"></div>
              </button>
            </div>

            <nav className="flex-grow space-y-2">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    link.action();
                    onClose();
                  }}
                  className="w-full flex items-center gap-4 px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all group"
                >
                  <div className={`${link.icon} text-xl text-gray-400 group-hover:text-blue-600`}></div>
                  <span className="font-medium">{link.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-100">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="font-bold mb-1">Upgrade ke Pro</h4>
                  <p className="text-xs text-blue-100 mb-4 leading-relaxed">Dapatkan format SVG, kustom logo, dan tanpa batasan.</p>
                  <button className="w-full py-2 bg-white text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors">
                    Pelajari Selengkapnya
                  </button>
                </div>
                {/* Decorative circle */}
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </aside>
      </>
    );
  } catch (error) {
    console.error('Sidebar component error:', error);
    return null;
  }
}