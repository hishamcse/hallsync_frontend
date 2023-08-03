import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import { TopBar } from '../components/TopBar'
import { AuthorityNabBar, NavBar, StudentNavBar } from '../components/SideBar'
import '../styles/global.scss'
import styles from '../styles/_app.module.scss'
import React, { ReactElement, ReactNode, useContext, useState } from "react";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { NextPage } from 'next';
import { LoginMutation } from '../graphql/__generated__/graphql';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { setContext } from '@apollo/client/link/context';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export const link = createHttpLink({
  uri: "http://localhost:3000/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});


export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link)
});


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export const userContext = React.createContext<{
  user : LoginMutation['login'] | undefined,
  setUser : (s : LoginMutation['login'])=>void
}>({
  user : undefined,
  setUser : ()=>{}
})

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const [user, setUser] = useState<LoginMutation['login']>();
  const ctx = useContext(userContext);
  const value = {user, setUser};
  // let getLayout;
  if (Component.getLayout){
    return (
      <ApolloProvider client={client}>
        <userContext.Provider value = {value}>
          {Component.getLayout( <Component  {...pageProps} />)}
        </userContext.Provider>
      </ApolloProvider>
    )
  }

  // const getLayout = (((page)=>(
  //     <ApolloProvider client={client}>
  //       <userContext.Provider value = {value}>
  //         <div>
  //           <StudentNavBar />
  //           <div className = {styles.topBarContainer} >
  //             <TopBar />
  //           </div>
  //           <div>
  //             {page}
  //             {/* <Component {...pageProps} /> */}
  //           </div>
  //         </div>
  //       </userContext.Provider>
  //     </ApolloProvider>
  //     )
  // ));

  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <ApolloProvider client={client}>
          <userContext.Provider value = {value}>
            <div>
              <NavBar />
              {/* { value.user && value.user.student && <StudentNavBar />}
              { value.user && value.user.authority && <AuthorityNabBar />} */}
              <div className = {styles.topBarContainer} >
                <TopBar />
              </div>
              <div>
                <Component {...pageProps} />
              </div>
            </div>
          </userContext.Provider>
        </ApolloProvider>
      </ThemeProvider>
  )
}

export default MyApp
