import type { NextPage } from 'next'
import {userContext, type NextPageWithLayout}  from './_app'
import { ReactElement, useContext, useState } from 'react'
import styles from '../styles/index.module.scss'
import { Logo } from '../components/TopBar'
import MyCard from '../components/card'
import { MyInput } from '../components/input'
import { MyButton } from '../components/button'
import { useMutation, useQuery } from '@apollo/client'
import { LOGIN } from '../graphql/operations'
import { useRouter } from 'next/router'

// function loginOnSubmit(id : string, pass : string){
//   const { loading, data } = useQuery(
//     LOGIN,
//     {variables : {
//       loginId : id,
//       password : pass
//     }}
//   );
//   console.log(data);

// }

function Login(){
  const [id, setId] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const {user, setUser} = useContext(userContext);
  const router = useRouter();
  const [login, {error , loading, data}] = useMutation(
    LOGIN
  , {
    onError : ()=>{},
    onCompleted : (data)=>{
      // console.log(data);
      setUser(data.login);
      localStorage.setItem("token", data.login.token);
      if(data.login.student)
        router.push('./application/newApplication');
      else
        router.push('./seatManagement')
    }
  })

  const title = (
    <div className={styles.logoContainer}> 
      <Logo /> 
    </div>
  )
  // console.log(error);
  const content = (
    <div>
      <div>
        <div className={styles.inputContainer}> 
          <MyInput type='text' value={id} onChange={setId} placeHolder='Id or username'/> 
        </div>
        <div className={styles.inputContainer}>
          <MyInput type='password' value={pass} onChange={setPass} placeHolder='password'/> 
        </div>
        <div className={styles.messageContainer}>
          {error && <span className={styles.errorTextContainer}> {error.message} </span>}
          {loading && <span className={styles.loadingTextContainer}> Loading </span>}
        </div>

      </div>
      <div className={styles.buttonContainer}>
        <MyButton onClick={()=>login({variables : {
          loginId : id,
          password : pass
        }})} type='submit' text='login' className={styles.loginSubmitButton} />
      </div>
      <div>
      </div>
    </div>
  )
  return (
    // <div>
    //   {content}
    // </div>
    <MyCard title={title} content={content}   />

  )
}

const Home: NextPageWithLayout  = () => {
  return (
    <div className = {styles.root}>
      <Login  />
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
      page
  )
}


export default Home
