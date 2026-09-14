function QRCodeDisplay({ qrUrl, config, onSave }) {
  const downloadQR = (format) => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `qrcode-${Date.now()}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="card p-8 flex flex-col items-center gap-8" data-name="qr-preview">
      <div className="w-full flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">Pratinjau</h2>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">Aktif</span>
        </div>
      </div>

      <div className="relative group bg-white p-4 rounded-2xl shadow-xl border border-gray-100 transition-transform duration-500 hover:scale-[1.02]">
        {qrUrl ? (
          <img src={qrUrl} alt="QR Code" className="w-64 h-64 object-contain" />
        ) : (
          <div className="w-64 h-64 bg-gray-50 rounded-xl flex items-center justify-center animate-pulse">
            <div className="icon-loader text-3xl text-gray-300 animate-spin"></div>
          </div>
        )}
      </div>

      <div className="w-full space-y-3">
        <button 
          onClick={onSave}
          className="btn btn-primary w-full shadow-blue-500/25 py-4 mb-2"
        >
          <div className="icon-save"></div>
          Simpan ke Riwayat
        </button>

        <button 
          onClick={() => downloadQR('png')}
          className="btn btn-secondary w-full py-4"
        >
          <div className="icon-download"></div>
          Unduh PNG
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => downloadQR('jpg')}
            className="btn btn-secondary text-sm"
          >
            JPEG
          </button>
          <button 
            onClick={() => window.print()}
            className="btn btn-secondary text-sm"
          >
            <div className="icon-printer text-base"></div>
            Cetak
          </button>
        </div>
      </div>

      <div className="w-full pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
          <div className="icon-info text-blue-500"></div>
          <span>Tips Kustomisasi</span>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">
          Gunakan warna kontras tinggi antara QR dan latar belakang untuk pemindaian yang lebih baik oleh perangkat lama.
        </p>
      </div>
    </div>
  );
}