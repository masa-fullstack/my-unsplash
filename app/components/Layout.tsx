import Head from 'next/head'
import { Footer } from './Footer'

type Props = {
  title?: string
}

const Layout: React.FC<Props> = ({ children, title = 'Default title' }) => {
  return (
    <div className="container mx-auto min-h-screen flex flex-col justify-center item-center">
      <Head>
        <title>{title}</title>
      </Head>

      <main className="container mx-auto">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
