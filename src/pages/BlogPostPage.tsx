import { useParams } from 'react-router-dom'
import { getPost } from '@/data/blog'
import { BlogPost } from './BlogPost'
import NotFound from './NotFound'

export default function BlogPostPage() {
  const { slug = '' } = useParams()
  const post = getPost(slug)
  if (!post) return <NotFound />
  return <BlogPost post={post} />
}
