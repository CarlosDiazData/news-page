import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'

export default function Noticia({ params }: { params: { slug: string } }) {
    const file = path.join(process.cwd(), 'content/noticias', `${params.slug}.md`)
    const raw = fs.readFileSync(file, 'utf8')
    const { data, content } = matter(raw)

    return (
        <article className="max-w-2xl mx-auto p-6">
            <span className="text-xs text-blue-600 uppercase">{data.category}</span>
            <h1 className="text-3xl font-bold mt-2 mb-4">{data.title}</h1>
            {data.image && <img src={data.image} className="w-full rounded mb-6" />}
            <p className="text-sm text-gray-400 mb-8">
                {new Date(data.date).toLocaleDateString('es-MX')}
            </p>
            <div className="prose">
                <MDXRemote source={content} />
            </div>
        </article>
    )
}

export async function generateStaticParams() {
    const files = fs.readdirSync(path.join(process.cwd(), 'content/noticias'))
    return files.map(f => ({ slug: f.replace('.md', '') }))
}