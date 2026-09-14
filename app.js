class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="text-center max-w-md w-full card p-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <div className="icon-triangle-alert text-3xl text-red-600"></div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Ups, terjadi kesalahan</h1>
            <p className="text-gray-600 mb-6">Aplikasi mengalami kendala teknis saat memproses data.</p>
            <button onClick={() => window.location.reload()} className="btn btn-primary w-full">
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [view, setView] = React.useState('generator'); // generator, history
  const [config, setConfig] = React.useState({
    value: 'https://trickle.so',
    size: 300,
    fgColor: '#000000',
    bgColor: '#ffffff',
    margin: 4,
    level: 'M',
    type: 'url',
    wifi: { ssid: '', password: '', encryption: 'WPA' },
    vcard: { name: '', phone: '', email: '', company: '' }
  });

  const [qrUrl, setQrUrl] = React.useState('');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const generateQR = async (save = false) => {
    try {
      let finalValue = config.value;
      if (config.type === 'wifi') {
        finalValue = `WIFI:S:${config.wifi.ssid};T:${config.wifi.encryption};P:${config.wifi.password};;`;
      } else if (config.type === 'vcard') {
        finalValue = `BEGIN:VCARD\nVERSION:3.0\nN:${config.vcard.name}\nORG:${config.vcard.company}\nTEL:${config.vcard.phone}\nEMAIL:${config.vcard.email}\nEND:VCARD`;
      }

      const url = await QRCode.toDataURL(finalValue, {
        width: config.size,
        margin: config.margin,
        color: { dark: config.fgColor, light: config.bgColor },
        errorCorrectionLevel: config.level
      });
      
      setQrUrl(url);

      if (save) {
        await trickleCreateObject('qr_history', {
          type: config.type,
          content: finalValue,
          fgColor: config.fgColor,
          bgColor: config.bgColor,
          qrDataUrl: url
        });
      }
    } catch (err) {
      console.error('Error generating QR:', err);
    }
  };

  React.useEffect(() => {
    generateQR();
  }, [config]);

  const updateConfig = (newParams) => {
    setConfig(prev => ({ ...prev, ...newParams }));
  };

  const handleSave = () => {
    generateQR(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-main)]" data-name="app-container">
      <Header onMenuClick={() => setIsSidebarOpen(true)} onViewChange={setView} currentView={view} />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onViewChange={setView} 
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {view === 'generator' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 order-2 lg:order-1">
              <Controls config={config} updateConfig={updateConfig} />
            </div>
            <div className="lg:col-span-4 order-1 lg:order-2">
              <div className="sticky top-24">
                <QRCodeDisplay qrUrl={qrUrl} config={config} onSave={handleSave} />
              </div>
            </div>
          </div>
        ) : (
          <QRHistory onBack={() => setView('generator')} />
        )}
      </main>

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);