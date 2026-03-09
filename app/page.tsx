import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

export default function Home() {
  const folder = path.join(process.cwd(), 'content/noticias')
  const files = fs.readdirSync(folder)

  const noticias = files
    .map(file => {
      const content = fs.readFileSync(path.join(folder, file), 'utf8')
      const { data } = matter(content)
      return { ...data, slug: file.replace('.md', '') }
    })
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Mi Sitio de Noticias</h1>
      {noticias.map((n: any) => (
        <Link href={`/noticias/${n.slug}`} key={n.slug}>
          <div className="border-b py-4 hover:bg-gray-50 cursor-pointer">
            <span className="text-xs text-blue-600 uppercase">{n.category}</span>
            <h2 className="text-xl font-semibold">{n.title}</h2>
            <p className="text-gray-600">{n.excerpt}</p>
            <p className="text-sm text-gray-400">{new Date(n.date).toLocaleDateString('es-MX')}</p>
          </div>
        </Link>
      ))}
    </main>
  )
}
