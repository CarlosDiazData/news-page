import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Navbar from '../../components/Navbar'
import Link from 'next/link'

export default async function Noticia({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const file = path.join(process.cwd(), 'content/noticias', `${slug}.md`)
    const raw = fs.readFileSync(file, 'utf8')
    const { data, content } = matter(raw)

    return (
        <>
            <Navbar />
            <main className="max-w-3xl mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="text-sm text-white mb-4">
                    <Link href="/" className="hover:text-red-600">Inicio</Link>
                    <span className="mx-2">›</span>
                    <span className="capitalize">{data.category}</span>
                </div>

                {/* Header artículo */}
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                    {data.category}
                </span>
                <h1 className="text-4xl font-black leading-tight mt-3 mb-2 text-white">
                    {data.title}
                </h1>
                <p className="text-xl text-white mb-4">{data.excerpt}</p>

                {/* Meta */}
                <div className="flex items-center gap-3 border-y border-gray-200 py-3 mb-6 text-sm text-gray-500">
                    <span>📅 {new Date(data.date).toLocaleDateString('es-MX', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                    })}</span>
                </div>

                {/* Imagen */}
                {data.image && (
                    <img src={data.image} alt={data.title}
                        className="w-full rounded-lg mb-8 max-h-96 object-cover" />
                )}

                {/* Contenido */}
                <div className="prose prose-lg prose-invert prose-headings:font-black prose-a:text-red-600 max-w-none">
                    <MDXRemote source={content} />
                </div>

                {/* Volver */}
                <div className="mt-12 pt-6 border-t">
                    <Link href="/" className="bg-red-600 text-white px-6 py-2 rounded font-bold hover:bg-red-700 transition-colors">
                        ← Volver a portada
                    </Link>
                </div>
            </main>
        </>
    )
}

export async function generateStaticParams() {
    const files = fs.readdirSync(path.join(process.cwd(), 'content/noticias'))
    return files.map(f => ({ slug: f.replace('.md', '') }))
}
