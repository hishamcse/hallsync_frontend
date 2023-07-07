import type { AppProps } from 'next/app'
import { StudentNavBar, TopBar } from '../components/layout'
import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <div style={{
        height : "130px"
      }} >
        <TopBar />
      </div>
      <div>
        <StudentNavBar />
      </div>
      <div>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
