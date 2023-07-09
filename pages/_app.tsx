import type { AppProps } from 'next/app'
import { StudentNavBar, TopBar } from '../components/layout'
import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div style={{
      backgroundColor : "green"
    }}>
      <div style={{
        height : "80px"
      }} >
        <TopBar />
      </div>
      <div style={{
        backgroundColor : "yellow"
      }}>
          <StudentNavBar />
        <div style={{
          backgroundColor : "blue",
        }}>
          <Component {...pageProps} />
        </div>
      </div>
      
    </div>
  )
}

export default MyApp
