function Controls({ config, updateConfig }) {
  const tabs = [
    { id: 'url', label: 'URL', icon: 'icon-link' },
    { id: 'text', label: 'Teks', icon: 'icon-file-text' },
    { id: 'wifi', label: 'Wi-Fi', icon: 'icon-wifi' },
    { id: 'vcard', label: 'VCard', icon: 'icon-user' },
    { id: 'email', label: 'Email', icon: 'icon-mail' },
  ];

  return (
    <div className="space-y-6" data-name="controls-container">
      {/* Type Selector */}
      <div className="card p-2 flex flex-wrap gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => updateConfig({ type: tab.id })}
            className={`flex-1 min-w-[100px] py-3 rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
              config.type === tab.id 
                ? 'bg-blue-50 text-blue-600 border border-blue-100 shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
            }`}
          >
            <div className={`${tab.icon} text-xl`}></div>
            <span className="text-xs font-semibold">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Input */}
      <div className="card p-6 md:p-8 space-y-6">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <div className="icon-pencil text-blue-600"></div>
          Masukkan Informasi
        </h2>

        {config.type === 'url' && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Tautan Website (URL)</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 icon-globe text-gray-400"></div>
              <input
                type="url"
                className="input-field pl-11"
                placeholder="https://example.com"
                value={config.value}
                onChange={(e) => updateConfig({ value: e.target.value })}
              />
            </div>
          </div>
        )}

        {config.type === 'text' && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Teks Kustom</label>
            <textarea
              className="input-field min-h-[120px]"
              placeholder="Masukkan teks Anda di sini..."
              value={config.value}
              onChange={(e) => updateConfig({ value: e.target.value })}
            />
          </div>
        )}

        {config.type === 'wifi' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nama Wi-Fi (SSID)</label>
              <input
                type="text"
                className="input-field"
                placeholder="My Home WiFi"
                value={config.wifi.ssid}
                onChange={(e) => updateConfig({ wifi: { ...config.wifi, ssid: e.target.value } })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Kata Sandi</label>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={config.wifi.password}
                onChange={(e) => updateConfig({ wifi: { ...config.wifi, password: e.target.value } })}
              />
            </div>
          </div>
        )}

        {/* Customization Options */}
        <div className="border-t border-gray-100 pt-8 mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <div className="icon-palette text-blue-600"></div>
              Pilihan Warna
            </h3>
            <div className="flex gap-6">
              <div className="space-y-2">
                <label className="text-xs text-gray-500 block">Warna QR</label>
                <input
                  type="color"
                  className="w-12 h-12 p-0 border-0 rounded-lg cursor-pointer"
                  value={config.fgColor}
                  onChange={(e) => updateConfig({ fgColor: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-500 block">Latar Belakang</label>
                <input
                  type="color"
                  className="w-12 h-12 p-0 border-0 rounded-lg cursor-pointer"
                  value={config.bgColor}
                  onChange={(e) => updateConfig({ bgColor: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <div className="icon-settings text-blue-600"></div>
              Pengaturan Tambahan
            </h3>
            <div className="space-y-2">
              <label className="text-xs text-gray-500 block">Level Koreksi Kesalahan: {config.level}</label>
              <select
                className="input-field py-2 text-sm"
                value={config.level}
                onChange={(e) => updateConfig({ level: e.target.value })}
              >
                <option value="L">Low (7%)</option>
                <option value="M">Medium (15%)</option>
                <option value="Q">Quartile (25%)</option>
                <option value="H">High (30%)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}