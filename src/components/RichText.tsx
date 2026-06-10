import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g
const linkClass =
  'font-medium text-primary-dark underline decoration-1 underline-offset-2 transition-colors hover:text-primary'

/**
 * Renders a copy string, turning [label](/path) into crawlable links.
 * Internal links (starting with "/") become router <Link>s; external links
 * become <a target="_blank">. Returns inline nodes, so wrap in <p>, <li> etc.
 */
export function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let key = 0
  let match: RegExpExecArray | null
  LINK_RE.lastIndex = 0

  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>)
    }
    const [, label, href] = match
    if (href.startsWith('/')) {
      nodes.push(
        <Link key={key++} to={href} className={linkClass}>
          {label}
        </Link>,
      )
    } else {
      nodes.push(
        <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {label}
        </a>,
      )
    }
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>)
  }

  return <>{nodes}</>
}
