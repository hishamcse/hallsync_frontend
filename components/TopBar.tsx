import Link from "next/link";
import topBarStyles from "../styles/topbar.module.scss"
import { NextRouter, useRouter } from "next/router"
import { checkRouteContains } from "./utilities";
import { CSSProperties, useContext, useEffect } from "react";
import { userContext } from "../pages/_app";
import { useLazyQuery } from "@apollo/client";
import { GET_NOTIFICATIONS } from "../graphql/operations";

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


function Tabs(){
    const router = useRouter();
    const routes = {
        newApp : "newApplication",
        prevApp : 'prevApplication'
    }

    // console.log(router.pathname);

    return(
        <ul className={topBarStyles.tabs} >
            <Tab href={"/application/" + routes.newApp} isActive = {checkRouteContains(router, routes.newApp)} name="New Application" />
            <Tab href={"/application/" + routes.prevApp} isActive = {checkRouteContains(router, routes.prevApp)} name = "Previous Application" />
        </ul>
    )
}

export function Logo(props : {
    containerStyle? : CSSProperties,
    containerClassName? : string
}){
    return(
        <div className={topBarStyles.logo + ' ' + props.containerClassName}>
            <div className={topBarStyles.logoCircle} />
            HallSync
        </div>
    )
}


export function TopBar(){
    const router = useRouter();
    let {user} = useContext(userContext);

    let [query , {data, loading}] = useLazyQuery(
        GET_NOTIFICATIONS
    )

    useEffect(()=>{
        query({
            onCompleted : (d)=>console.log(d),
            onError : (err)=>console.log(err)
        });

    }, [user?.student]);

    return (
        <div  className={topBarStyles.root}>
            <Logo containerClassName={topBarStyles.logoSection} />
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