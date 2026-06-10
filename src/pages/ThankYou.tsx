import { useEffect } from 'react'
import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { absUrl } from '@/lib/seo'
import { Container } from '@/components/Container'

/**
 * /thank-you redirects to /home. We use a meta refresh so the redirect works
 * without JavaScript, a client-side replace for instant navigation, and a
 * canonical pointing at /home so search engines consolidate on the homepage.
 */
export default function ThankYou() {
  useEffect(() => {
    window.location.replace('/home')
  }, [])

  return (
    <>
      <Head>
        <title>Thank You | Beauty Nails Spa</title>
        <meta httpEquiv="refresh" content="0; url=/home" />
        <link rel="canonical" href={absUrl('/home')} />
      </Head>
      <Container className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="text-3xl text-charcoal">Thank you</h1>
        <p className="mt-4 text-muted-foreground">
          Redirecting you to our homepage. If you are not redirected,{' '}
          <Link to="/home" className="font-medium text-primary-dark underline underline-offset-2">
            click here
          </Link>
          .
        </p>
      </Container>
    </>
  )
}
