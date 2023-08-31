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
  setUser : (s : LoginMutation['login'] | undefined)=>void
}>({
  user : undefined,
  setUser : ()=>{}
})

export const notificationContext = React.createContext<{
  showNotification : boolean,
  setShowNotification : (s : boolean) => void
}>({
  showNotification : false,
  setShowNotification : ()=>{}
})

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const [user, setUser] = useState<LoginMutation['login']>();
  const [showNot, setShowNot] = useState<boolean>(false);
  const ctx = useContext(userContext);
  const value = {user, setUser};
  const notVal = {showNot, setShowNot}
  // let getLayout;
  if (Component.getLayout){
    return (
      <ApolloProvider client={client}>
        <userContext.Provider value = {value}>
          <notificationContext.Provider value = {{
            showNotification : showNot,
            setShowNotification : setShowNot
          }}>
            {Component.getLayout( <Component  {...pageProps} />)}
          </notificationContext.Provider>
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
          <notificationContext.Provider value = {{
            showNotification : showNot,
            setShowNotification : setShowNot
          }}>
            <div onClick={()=>setShowNot(false)}>
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
            </notificationContext.Provider>
          </userContext.Provider>
        </ApolloProvider>
      </ThemeProvider>
  )
}

export default MyApp
