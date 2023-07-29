import Link from 'next/link'
import sideBarStyles from '../styles/sidebar.module.scss'
import { checkRouteContains } from './utilities'
import { useRouter } from 'next/router'


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
        <ul className={sideBarStyles.sidebar} >
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
        <ul className={sideBarStyles.sidebar} >
            <ListItem active = {checkRouteContains(router,routes.app)} href={'/' + routes.app} imgPath={imgPaths.app} text={texts.app} />
            <ListItem active = {checkRouteContains(router,routes.mess)} href={'/' + routes.mess} imgPath={imgPaths.mess} text={texts.mess} />
            <li> <SideBarIcon src="/info.svg" /> Info</li>
            <li> <SideBarIcon src="/feAngry1.svg" /> Complaints</li>
        </ul>
    )
}
