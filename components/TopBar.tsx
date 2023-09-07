import Link from "next/link";
import topBarStyles from "../styles/topbar.module.scss"
import { useRouter } from "next/router"
import { checkRouteContains } from "./utilities";
import { CSSProperties, RefObject, useContext, useEffect, useRef, useState } from "react";
import { notificationContext, userContext } from "../pages/_app";
import { useLazyQuery } from "@apollo/client";
import { GET_NOTIFICATIONS } from "../graphql/operations";
import NotificationsList from "./notification";
import useResidencyStatus from "../hooks/useResidencyStatus";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge } from "@mui/material";

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
        prevApp : 'prevApplication',
    }

    // console.log(router.pathname);

    return(
        <ul className={topBarStyles.tabs} >
            <Tab href={"/application/" + routes.newApp} isActive = {checkRouteContains(router, routes.newApp)} name="New Application" />
            <Tab href={"/application/" + routes.prevApp} isActive = {checkRouteContains(router, routes.prevApp)} name = "Previous Application" />
        </ul>
    )
}

function MessTabs() {
    
    const router = useRouter();
    const routes = {
      meals: "meals",
      application: "messApplication",
      announcement: "announcement",
      feedbacks: "feedbacks",
      stats : "stats"
    };
    
    let {messManager, authority, resident} = useResidencyStatus()

    return (
      <ul className={topBarStyles.tabs}>
        <Tab href={"/mess/" + routes.application} isActive={checkRouteContains(router, routes.application)} name="Application" />
          {
              (messManager || resident) &&
              <Tab href={"/mess/" + routes.meals} isActive={checkRouteContains(router, routes.meals)} name="Meals" />
          }
        <Tab href={"/mess/" + routes.announcement} isActive={checkRouteContains(router, routes.announcement)} name="Announcement" />
        <Tab href={"/mess/" + routes.feedbacks} isActive={checkRouteContains(router, routes.feedbacks)} name="Feedbacks" />
        {   
            (messManager || authority) &&
            <Tab href={"/mess/" + routes.stats} isActive={checkRouteContains(router, routes.stats)} name="Stats" />
        }

      </ul>
    );
  }

function InfoTabs() {

    const router = useRouter();
    const routes = {
        rooms: "rooms",
        students: "students"
    };

    return (
        <ul className={topBarStyles.tabs}>
            <Tab href={"/infoSearch/" + routes.rooms} isActive={checkRouteContains(router, routes.rooms)} name="Rooms" />
            <Tab href={"/infoSearch/" + routes.students} isActive={checkRouteContains(router, routes.students)} name="Students" />
        </ul>
    );
}

function ComplaintsTabs() {

    const router = useRouter();
    const routes = {
        complaints: "complaints"
    };

    return (
        <ul className={topBarStyles.tabs}>
            <Tab href={"/complaints/" + routes.complaints} isActive={checkRouteContains(router, routes.complaints)} name="Complaints" />
        </ul>
    );
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
    let {showNotification, setShowNotification} = useContext(notificationContext);
    const divRef = useRef<HTMLDivElement>(null);
    const [unseecCount, setUnseenCount] = useState(0);

    let [query , {data, loading}] = useLazyQuery(
        GET_NOTIFICATIONS
    )

    useEffect(()=>{
        query({
            onCompleted : (d)=>{
                console.log(d);
                setUnseenCount(d.notifications.unseenCount);
            },
            onError : (err)=>console.log(err)
        });

    }, [user?.student?.studentId]);

    return (
        <div  className={topBarStyles.root}>
            <Logo containerClassName={topBarStyles.logoSection} />
            <div className={topBarStyles.tabSection}>
                {
                    router.pathname.includes('application') &&
                    <Tabs />
                }
                {
                    router.pathname.includes('mess/') &&
                    <MessTabs />
                }
                {
                    router.pathname.includes('infoSearch/') &&
                    <InfoTabs />
                }

                {
                    router.pathname.includes('complaints/') &&
                    <ComplaintsTabs />
                }
            </div>
            <div className={topBarStyles.notSection}>
                <Icon active = {showNotification} img={
                     <Badge badgeContent={(data?.notifications.notifications.filter(d => !d.seen ).length) ?? 0} color="error">
                         <NotificationsIcon style={{
                             color : "yellow",
                             fontSize : 30
                         }}/>
                     </Badge>
                } onClick={()=>{
                    console.log("lkjasdf", showNotification);
                    setShowNotification(!showNotification)
                }} refForDiv = {divRef} />
                <Icon active = {false} img = {<img src = '/avatar.svg' />} />
            </div>
            {
                data && showNotification &&
                <div className={topBarStyles.notificationContainer} style={{
                    // left : divRef.current?.offsetLeft,
                    // top :  divRef.current?.offsetHeight
                }} >
                    <notificationContext.Provider value={{
                        showNotification : showNotification,
                        setShowNotification : setShowNotification
                    }}>
                        <NotificationsList notifications={data.notifications} />
                    </notificationContext.Provider>
                </div>
            }
        </div>
    )
}

function Icon(props : {
    img : React.ReactNode,
    active : boolean,
    onClick? : ()=>void,
    refForDiv? : RefObject<HTMLDivElement>
}){
    return (
        <div className={topBarStyles.icon + ' ' + (
            props.active ? topBarStyles.activeIcon : ''
        )} onClick={ (e) =>{
            e.stopPropagation();
            if(props.onClick) props.onClick();
        }} ref={props.refForDiv}>
            <div>
                {
                    props.img
                }
            </div>
        </div>
    )
}