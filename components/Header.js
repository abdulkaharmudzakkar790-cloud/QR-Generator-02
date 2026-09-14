function Header({ onMenuClick, onViewChange, currentView }) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50" data-name="header">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <button 
          onClick={() => onViewChange('generator')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <div className="icon-qr-code text-white text-2xl"></div>
          </div>
          <div className="text-left">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              QR GENERATOR
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Modern Generator</p>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => onViewChange('generator')}
            className={`text-sm font-medium transition-colors ${currentView === 'generator' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
          >
            Generator
          </button>
          <button 
            onClick={() => onViewChange('history')}
            className={`text-sm font-medium transition-colors ${currentView === 'history' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
          >
            Riwayat
          </button>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Harga</a>
          <button onClick={() => onViewChange('generator')} className="btn btn-primary text-sm py-2 px-5">Mulai Gratis</button>
        </nav>
        
        <button 
          onClick={onMenuClick}
          className="md:hidden text-gray-600 text-2xl hover:bg-gray-50 p-2 rounded-lg transition-colors"
        >
          <div className="icon-menu"></div>
        </button>
      </div>
    </header>
  );
}