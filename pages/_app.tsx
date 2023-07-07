import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      top bar
      <Component {...pageProps} />

    </div>
  )
}

export default MyApp
