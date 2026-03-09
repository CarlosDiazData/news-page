export default function Navbar() {
    return (
        <header className="bg-red-700 text-white">
            {/* Barra superior con fecha */}
            <div className="bg-red-900 text-xs text-red-200 px-6 py-1 flex justify-between">
                <span>Lunes, 9 de marzo de 2026</span>
                <span>Puebla, México</span>
            </div>

            {/* Logo y nombre */}
            <div className="max-w-7xl mx-auto px-6 py-4">
                <h1 className="text-4xl font-black tracking-tight">MI NOTICIAS</h1>
                <p className="text-red-200 text-sm">Información que importa</p>
            </div>

            {/* Categorías nav */}
            <nav className="bg-red-800">
                <div className="max-w-7xl mx-auto px-6">
                    <ul className="flex gap-0 overflow-x-auto">
                        {['Inicio', 'Política', 'Deportes', 'Tecnología', 'Local', 'Cultura'].map(cat => (
                            <li key={cat}>
                                <a href="#"
                                    className="block px-4 py-3 text-sm font-semibold hover:bg-red-600 
                              whitespace-nowrap transition-colors">
                                    {cat}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    )
}
