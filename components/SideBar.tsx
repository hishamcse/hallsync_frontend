import Link from 'next/link'
import sideBarStyles from '../styles/sidebar.module.scss'
import { checkRouteContains } from './utilities'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { userContext } from '../pages/_app'
import { useLazyQuery } from '@apollo/client'
import { GET_INFO } from '../graphql/operations'
import { MyButton } from './button'
import useResidencyStatus from '../hooks/useResidencyStatus'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export function SideBarIcon(
    props : {
        src : string,
        width? : number,
        icon? : React.ReactNode
    
    }
){
    return (
        <div className={sideBarStyles.icon} >
            {
                !props.icon &&

                <img width={props.width} src = {props.src} />
            }
            {
                props.icon
            }

        </div>
    )
}

function ListItem(props : {
    text : string,
    imgPath : string,
    active : boolean,
    href : string,
    onClick? : ()=>void,
    width? : number,
    icon? : React.ReactNode
}){
     return (
        <li className={props.active ? sideBarStyles.focus : ''} onClick={props.onClick} > 
            {
                <SideBarIcon src={props.imgPath} width={props.width} icon = {props.icon} />
            }
            
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
                },
                fetchPolicy : "no-cache"
            });
        }
        else{
            setNotLoggedIn(true);
        }
    }, [user?.student?.studentId])
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

    let {user, setUser} = useContext(userContext);
    const router = useRouter();

    let {resident} = useResidencyStatus();

    function logOutOnClick(){
        console.log("logged out");
        localStorage.removeItem("token");
        setUser(undefined);
        // router.push('/')
    }

    const routes = {
        profile : "profile/me",
        app : "application/newApplication",
        mess : 'mess/meals',
        info: 'infoSearch/rooms',
        complaints: 'complaints/complaints'
    }
    const imgPaths = {
        profile : "/avatar.svg",
        app : "/application.svg",
        mess : '/mess.svg',
        info : '/info.svg',
        complaints: '/feAngry1.svg'
    }
    const texts = {
        profile : 'Profile',
        app : 'Application',
        mess : 'Mess',
        info: 'InfoSearch',
        complaints: 'Complaints'
    }
    const activeIf = {
        profile : 'profile/',
        app : 'application/',
        mess : 'mess/',
        info: 'infoSearch/',
        complaints: 'complaints/'
    }

    return(
        <ul  >
            <ListItem active = {checkRouteContains(router,activeIf.profile)} href={'/' + routes.profile} imgPath={imgPaths.profile} text={texts.profile} />
            <ListItem active = {checkRouteContains(router,activeIf.app)} href={'/' + routes.app} imgPath={imgPaths.app} text={texts.app} />
            { resident && 
            <ListItem active = {checkRouteContains(router,activeIf.mess)} href={'/' + routes.mess} imgPath={imgPaths.mess} text={texts.mess} />}
            <ListItem active = {checkRouteContains(router,activeIf.info)} href={'/' + routes.info} imgPath={imgPaths.info} text={texts.info} />
            <ListItem active = {checkRouteContains(router,activeIf.complaints)} href={'/' + routes.complaints} imgPath={imgPaths.complaints} text={texts.complaints} />
            <ListItem width={25} href='/' imgPath='/logout.svg' active = {false} text='logout' onClick={logOutOnClick} icon = {<LogoutOutlinedIcon />}  />
        </ul>
    )
}

export function AuthorityNabBar(){
    let {user, setUser} = useContext(userContext);
    const router = useRouter();

    let {messManager, authority, resident} = useResidencyStatus();

    function logOutOnClick(){
        console.log("logged out");
        localStorage.removeItem("token");
        setUser(undefined);
        // router.push('/')
    }
    const routes = {
        app : "seatManagement",
        mess : 'mess/meals',
        messApplication: "mess/messApplication",
        info: 'infoSearch',
        complaints: 'complaints'
    }
    const imgPaths = {
        app : "/application.svg",
        mess : '/mess.svg',
        info : '/info.svg',
        complaints: '/feAngry1.svg'
    }
    const texts = {
        app : 'Seat Management',
        mess : 'Mess Management',
        info: 'InfoSearch',
        complaints: 'Complaints'
    }

    const checkActiveMess = () => {
        return router.pathname.includes('mess');
    }

    return(
        <ul >
            <ListItem active = {checkRouteContains(router,routes.app)} href={'/' + routes.app} imgPath={imgPaths.app} text={texts.app} />
            {
                (messManager || resident) &&
                <ListItem active={checkActiveMess()} href={'/' + routes.mess} imgPath={imgPaths.mess} text={texts.mess}/>
            }
            {
                authority &&
                <ListItem active={checkActiveMess()} href={'/' + routes.messApplication} imgPath={imgPaths.mess} text={texts.mess}/>
            }
            <ListItem active = {checkRouteContains(router,routes.info)} href={'/' + routes.info} imgPath={imgPaths.info} text={texts.info} />
            {/* <li> <SideBarIcon src= /> Complaints</li> */}
            
            {
                // (messManager || resident) &&
                <ListItem active = {checkRouteContains(router,routes.complaints)} href={'/' + routes.complaints} imgPath={imgPaths.complaints} text={texts.complaints} />
            }
            <ListItem width={25} href='/' imgPath='/logout.svg' active = {false} text='logout' onClick={logOutOnClick} icon = {<LogoutOutlinedIcon />}  />
        </ul>
    )
}
