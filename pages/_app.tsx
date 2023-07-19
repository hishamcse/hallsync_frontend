import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import { TopBar } from '../components/TopBar'
import { StudentNavBar } from '../components/SideBar'
import '../styles/global.scss'
import styles from '../styles/_app.module.scss'
import React from "react";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";


export const link = createHttpLink({
  uri: "http://localhost:3000/graphql"
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <div>
        <StudentNavBar />
        <div className = {styles.topBarContainer} >
          <TopBar />
        </div>
        <div>
          <Component {...pageProps} />
        </div>
      </div>
    </ApolloProvider>
  )
}

export default MyApp
