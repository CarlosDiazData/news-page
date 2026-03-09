import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Navbar from './components/Navbar'

export const dynamic = 'force-static'

export default function Home() {
  const folder = path.join(process.cwd(), 'content/noticias')
  const files = fs.readdirSync(folder)

  interface Noticia {
    title: string
    date: string
    category: string
    image?: string
    description?: string
    excerpt?: string
    slug: string
  }

  const noticias: Noticia[] = files
    .map(file => {
      const content = fs.readFileSync(path.join(folder, file), 'utf8')
      const { data } = matter(content)
      return {
        title: data.title ?? '',
        date: data.date ?? '',
        category: data.category ?? '',
        image: data.image,
        description: data.description,
        excerpt: data.excerpt ?? content.slice(0, 120).replace(/\n/g, ' ') + '...',
        slug: file.replace('.md', '')
      } as Noticia
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const [principal, segunda, tercera, ...resto] = noticias

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* HERO: Noticia principal + secundarias */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">

          {/* Noticia principal — ocupa 2/3 */}
          {principal && (
            <Link href={`/noticias/${principal.slug}`}
              className="lg:col-span-2 group relative overflow-hidden rounded-lg bg-gray-900">
              <img
                src={principal.image || '/placeholder.jpg'}
                alt={principal.title}
                className="w-full h-80 object-cover opacity-80 group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-black/60 to-transparent">
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                  {principal.category}
                </span>
                <h2 className="text-white text-2xl font-bold mt-2 leading-tight group-hover:underline">
                  {principal.title}
                </h2>
                <p className="text-gray-300 text-sm mt-1">{principal.excerpt}</p>
              </div>
            </Link>
          )}

          {/* Noticias secundarias — ocupa 1/3 */}
          <div className="flex flex-col gap-4">
            {[segunda, tercera].filter(Boolean).map((n: any) => (
              <Link href={`/noticias/${n.slug}`} key={n.slug}
                className="group flex flex-col rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                <img src={n.image || '/placeholder.jpg'} alt={n.title}
                  className="w-full h-36 object-cover" />
                <div className="p-3 flex-1">
                  <span className="text-red-600 text-xs font-bold uppercase">{n.category}</span>
                  <h3 className="font-bold text-gray-900 leading-snug group-hover:text-red-700 transition-colors mt-1">
                    {n.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* DIVIDER con etiqueta */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-8 bg-red-600 rounded" />
          <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Últimas noticias</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* GRID de noticias restantes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resto.map((n: any) => (
            <Link href={`/noticias/${n.slug}`} key={n.slug}
              className="group flex flex-col border-b pb-4 hover:border-red-600 transition-colors">
              <img src={n.image || '/placeholder.jpg'} alt={n.title}
                className="w-full h-40 object-cover rounded mb-3" />
              <span className="text-red-600 text-xs font-bold uppercase">{n.category}</span>
              <h3 className="font-bold text-gray-900 leading-snug group-hover:text-red-700 transition-colors mt-1">
                {n.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1 line-clamp-2">{n.excerpt}</p>
              <span className="text-gray-400 text-xs mt-2">
                {new Date(n.date).toLocaleDateString('es-MX')}
              </span>
            </Link>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8 mt-16 text-sm">
        <p className="text-white font-bold text-lg mb-1">MI NOTICIAS</p>
        <p>© 2026 · Todos los derechos reservados</p>
      </footer>
    </>
  )
}
