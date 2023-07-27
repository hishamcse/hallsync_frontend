import type { NextPage } from 'next'
import type {NextPageWithLayout}  from './_app'
import { ReactElement, useState } from 'react'
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
  const router = useRouter();
  const [login, {error , loading, data}] = useMutation(
    LOGIN
  , {
    onError : ()=>{},
    onCompleted : ()=>{
      router.push('./application/newApplication');
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
        {error && <div className={styles.errorTextContainer}> {error.message} </div>}
        {loading && <div className={styles.loadingTextContainer}> Loading </div>}

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
