import type { AppProps } from 'next/app'
import { TopBar } from '../components/TopBar'
import { StudentNavBar } from '../components/SideBar'
import '../styles/global.scss'
import styles from '../styles/_app.module.scss'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <StudentNavBar />
      <div className = {styles.topBarContainer} >
        <TopBar />
      </div>
      <div>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
