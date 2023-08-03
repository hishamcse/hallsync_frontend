import Link from 'next/link'
import sideBarStyles from '../styles/sidebar.module.scss'
import { checkRouteContains } from './utilities'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { userContext } from '../pages/_app'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_INFO } from '../graphql/operations'
import { MyButton } from './button'


export function SideBarIcon(
    props : {
        src : string
    }
){
    return (
        <div className={sideBarStyles.icon} >
            <img src = {props.src} />
        </div>
    )
}

function ListItem(props : {
    text : string,
    imgPath : string,
    active : boolean,
    href : string
}){
     return (
        <li className={props.active ? sideBarStyles.focus : ''} > 
            <SideBarIcon src={props.imgPath} />
            <Link href={props.href}> 
                {props.text} 
            </Link> 
        </li>
     )
}

export function NavBar(){
    const {user, setUser} = useContext(userContext);
    const [notLoggedIn ,setNotLoggedIn] = useState(false);
    let [query ,{data , error, loading}] = useLazyQuery(
        GET_INFO
    )
    const router = useRouter();

    useEffect(()=>{
        let item = localStorage.getItem('token');
        console.log(item)
        if(item){
            query({
                onCompleted : (data)=>{
                    setUser(data.selfInfo);
                },
                onError : (err)=>{
                    setNotLoggedIn(true);
                }
                
            });
        }
        else{
            setNotLoggedIn(true);
        }
    }, [])
    return(
        <div className={sideBarStyles.sidebar}>
            {user && user.authority && <AuthorityNabBar />}
            {user && user.student && <StudentNavBar />}
            {notLoggedIn &&
            <div className={sideBarStyles.loginContainer}>
                <MyButton onClick={()=>{
                    router.push('/')
                }} text='Login' type='submit'  />
            </div>
             }
        </div>
    )
}

export function StudentNavBar(){

    const routes = {
        app : "application/newApplication",
        mess : 'mess'
    }
    const imgPaths = {
        app : "/application.svg",
        mess : '/mess.svg'
    }
    const texts = {
        app : 'Application',
        mess : 'Mess'
    }
    const router = useRouter();

    return(
        <ul  >
            <ListItem active = {checkRouteContains(router,routes.app)} href={'/' + routes.app} imgPath={imgPaths.app} text={texts.app} />
            <ListItem active = {checkRouteContains(router,routes.mess)} href={'/' + routes.mess} imgPath={imgPaths.mess} text={texts.mess} />
            <li> <SideBarIcon src="/payments.svg" />  Payments</li>
            <li> <SideBarIcon src="/info.svg" /> Info</li>
            <li> <SideBarIcon src="/feAngry1.svg" /> Complaints</li>
            <li> <SideBarIcon src="/feAngry2.svg" /> Personal Info</li>
        </ul>
    )
}

export function AuthorityNabBar(){
    const routes = {
        app : "seatManagement",
        mess : 'mess'
    }
    const imgPaths = {
        app : "/application.svg",
        mess : '/mess.svg'
    }
    const texts = {
        app : 'Seat Management',
        mess : 'Mess Management'
    }
    const router = useRouter();

    return(
        <ul >
            <ListItem active = {checkRouteContains(router,routes.app)} href={'/' + routes.app} imgPath={imgPaths.app} text={texts.app} />
            <ListItem active = {checkRouteContains(router,routes.mess)} href={'/' + routes.mess} imgPath={imgPaths.mess} text={texts.mess} />
            <li> <SideBarIcon src="/info.svg" /> Info</li>
            <li> <SideBarIcon src="/feAngry1.svg" /> Complaints</li>
        </ul>
    )
}
