import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import { TopBar } from '../components/TopBar'
import { StudentNavBar } from '../components/SideBar'
import '../styles/global.scss'
import styles from '../styles/_app.module.scss'
import React, { ReactElement, ReactNode } from "react";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { NextPage } from 'next';


export const link = createHttpLink({
  uri: "http://localhost:3000/graphql"
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page)=>(
    <ApolloProvider client={client}>
      <div>
        <StudentNavBar />
        <div className = {styles.topBarContainer} >
          <TopBar />
        </div>
        <div>
          {page}
          {/* <Component {...pageProps} /> */}
        </div>
      </div>
    </ApolloProvider>
  ));
  // return getLayout(
  //   <ApolloProvider client={client}>
  //     <div>
  //       <StudentNavBar />
  //       <div className = {styles.topBarContainer} >
  //         <TopBar />
  //       </div>
  //       <div>
  //         <Component {...pageProps} />
  //       </div>
  //     </div>
  //   </ApolloProvider>
  // )
  return getLayout(<Component {...pageProps} />)
}

export default MyApp
