import topBarStyles from "../styles/topbar.module.scss"
import sideBarStyles from '../styles/sidebar.module.scss'
import Link from 'next/link'
import { NextRouter, useRouter } from "next/router"


function SideBarIcon(
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
export function StudentNavBar(){

    return(
        <ul className={sideBarStyles.sidebar} >
            <li className={sideBarStyles.focus} > 
                <SideBarIcon src="/application.svg" />
                <Link href="/application/newApplication"> 
                    {/* <div> */}
                    Application 
                    {/* </div>  */}
                </Link> 
            </li>
            <li>  <SideBarIcon src="/mess.svg" />  
            <Link href="/mess">
                Mess
            </Link>
            
            </li>
            <li> <SideBarIcon src="/payments.svg" />  Payments</li>
            <li> <SideBarIcon src="/info.svg" /> Info</li>
            <li> <SideBarIcon src="/feAngry1.svg" /> Complaints</li>
            <li> <SideBarIcon src="/feAngry2.svg" /> Personal Info</li>
        </ul>
    )
}

function Tab(
    props :{
    name : string,
    isActive : boolean,
    href : string
}){
    return (
        <li>
            <div className={topBarStyles.tabBackGround + " " + (props.isActive ? topBarStyles.active : '')} >
                <img src="/tabActiveRect.svg" />
            </div>
            <div className={topBarStyles.tabBackGround + " " + (props.isActive ? topBarStyles.active : '')} >
                <img src="/tabActive.svg" />
            </div>
            
            <div className={topBarStyles.tabText + " " + (props.isActive ? topBarStyles.active : '')} >
                <Link href={props.href}>
                    {props.name} 
                </Link>
            </div>
            
        </li>
    )
}

function checkRouteContains(router : NextRouter,str : string){
    return router.pathname.includes(str);
}

function Tabs(){
    const router = useRouter();
    const routes = {
        newApp : "newApplication",
        prevApp : 'prevApplication'
    }

    // console.log(router.pathname);

    return(
        <ul className={topBarStyles.tabs} >
            <Tab href={"./" + routes.newApp} isActive = {checkRouteContains(router, routes.newApp)} name="New Application" />
            <Tab href={"./" + routes.prevApp} isActive = {checkRouteContains(router, routes.prevApp)} name = "Previous Application" />
        </ul>
    )
}


export function TopBar(){
    const router = useRouter();

    return (
        <div  className={topBarStyles.root}>
            <div className={topBarStyles.logoSection}>
                <div className={topBarStyles.logoCircle} />
                HallSync
            </div>
            <div className={topBarStyles.tabSection}>
                {
                    router.pathname.includes('application') &&
                    <Tabs />
                }
                {/* asdf */}
            </div>
            <div className={topBarStyles.notSection}>
                <Icon src="/avatar.svg" />
                <Icon src="/bell.svg" />
            </div>
        </div>
    )
}

function Icon(props : {
    src : string
}){
    return (
        <div className={topBarStyles.icon}>
            <div>
                <img src={props.src}  />

            </div>
        </div>
    )
}