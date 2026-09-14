function QRHistory({ onBack }) {
  const [history, setHistory] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await trickleListObjects('qr_history', 20, true);
      setHistory(res.items || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (objectId) => {
    if (confirm('Apakah Anda yakin ingin menghapus riwayat ini?')) {
      try {
        await trickleDeleteObject('qr_history', objectId);
        setHistory(history.filter(item => item.objectId !== objectId));
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const downloadHistoryQR = (dataUrl, id) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `qrcode-history-${id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="icon-loader text-4xl text-blue-600 animate-spin mb-4"></div>
        <p className="text-gray-500">Memuat riwayat Anda...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-name="history-view">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <div className="icon-clock text-blue-600"></div>
          Riwayat Pembuatan QR
        </h2>
        <button onClick={onBack} className="btn btn-secondary text-sm">
          Kembali ke Generator
        </button>
      </div>

      {history.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="icon-file-question text-3xl text-gray-300"></div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Belum Ada Riwayat</h3>
          <p className="text-gray-500 mb-6">Mulai buat kode QR pertama Anda untuk melihatnya di sini.</p>
          <button onClick={onBack} className="btn btn-primary mx-auto">
            Buat QR Sekarang
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {history.map((item) => (
            <div key={item.objectId} className="card p-5 group hover:shadow-md transition-all">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-white border border-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={item.objectData.qrDataUrl} 
                    alt="QR Thumbnail" 
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">
                      {item.objectData.type}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 truncate mb-3">
                    {item.objectData.content}
                  </p>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => downloadHistoryQR(item.objectData.qrDataUrl, item.objectId)}
                      className="p-2 bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                      title="Unduh"
                    >
                      <div className="icon-download text-sm"></div>
                    </button>
                    <button 
                      onClick={() => handleDelete(item.objectId)}
                      className="p-2 bg-gray-50 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <div className="icon-trash text-sm"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}