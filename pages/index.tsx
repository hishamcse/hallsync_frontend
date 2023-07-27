import type { NextPage } from 'next'
import type {NextPageWithLayout}  from './_app'
import { ReactElement, useState } from 'react'
import styles from '../styles/index.module.scss'
import { Logo } from '../components/TopBar'
import MyCard from '../components/card'
import { MyInput } from '../components/input'
import { MyButton } from '../components/button'



function Login(){
  const [id, setId] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const content = (
    <div>
      <div>
        <div className={styles.inputContainer}> <MyInput value={id} onChange={setId} placeHolder='Id or username'/> </div>
        <div className={styles.inputContainer}>  <MyInput value={pass} onChange={setPass} placeHolder='password'/> </div>
      </div>
      <div className={styles.buttonContainer}>
        <MyButton type='submit' text='login' className={styles.loginSubmitButton} />
        {/* <MyButton type='cancel' text='cancel' /> */}

      </div>
    </div>
  )
  return (
    <MyCard title={ <div className={styles.logoContainer}> <Logo /> </div>} 
    content={content}   />

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
