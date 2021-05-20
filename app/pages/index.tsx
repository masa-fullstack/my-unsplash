import Layout from '../components/Layout'
import { MyUnsplash } from '../components/MyUnsplash'
import { ModalProvider } from 'react-modal-hook'

export const Home = (): JSX.Element => {
  return (
    <ModalProvider>
      <Layout title="My Unsplash">
        <MyUnsplash />
      </Layout>
    </ModalProvider>
  )
}

export default Home
