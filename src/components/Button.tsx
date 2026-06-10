import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'outline'
type Size = 'md' | 'lg'

interface BaseProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
}

const sizes: Record<Size, string> = {
  md: '',
  lg: 'px-7 py-[1.05rem] text-[0.86rem]',
}

function classes(variant: Variant, size: Size, className?: string) {
  return cn('btn', variant === 'primary' ? 'btn-primary' : 'btn-outline', sizes[size], className)
}

interface LinkButtonProps extends BaseProps {
  to: string
}
interface AnchorButtonProps extends BaseProps {
  href: string
  ['aria-label']?: string
}
interface NativeButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>, BaseProps {}

/** Internal router link styled as a button. */
export function Button({ to, children, variant = 'primary', size = 'md', className }: LinkButtonProps) {
  return (
    <Link to={to} className={classes(variant, size, className)}>
      {children}
    </Link>
  )
}

/** External / tel / mailto link styled as a button. */
export function LinkButton({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: AnchorButtonProps) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      className={classes(variant, size, className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}

/** Real <button> for interactive actions. */
export function ActionButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: NativeButtonProps) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  )
}
