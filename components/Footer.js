function Footer() {
  const currentYear = 2026;
  return (
    <footer className="bg-white border-t border-gray-100 py-12" data-name="footer">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="icon-qr-code text-white text-lg"></div>
              </div>
              <h2 className="text-xl font-bold">QRGen Pro</h2>
            </div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Solusi modern untuk kebutuhan kode QR profesional. Dibuat dengan cinta untuk efisiensi digital Anda.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-gray-900">Produk</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors">API Generator</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Solusi Bisnis</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Harga Premium</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-gray-900">Dukungan</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Pusat Bantuan</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Kontak Kami</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Kebijakan Privasi</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} QRGen Pro. Hak Cipta Dilindungi.
          </p>
          <p className="text-gray-400 text-sm">
            Created by Abdul Kahar Mudzakkar
          </p>
          <div className="flex items-center gap-6">
            <a href="https://x.com/Trickle_HQ" target="_blank" className="text-gray-400 hover:text-blue-400 transition-colors">
              <div className="icon-twitter text-xl"></div>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
              <div className="icon-github text-xl"></div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}