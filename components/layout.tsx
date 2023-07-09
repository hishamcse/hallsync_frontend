import topBarStyles from "../styles/topbar.module.scss"
import sideBarStyles from '../styles/sidebar.module.scss'

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
            <li className={sideBarStyles.focus} > <SideBarIcon src="/application.svg" />  Application</li>
            <li>  <SideBarIcon src="/mess.svg" />  Mess</li>
            <li> <SideBarIcon src="/payments.svg" />  Payments</li>
            <li> <SideBarIcon src="/info.svg" /> Info</li>
            <li> <SideBarIcon src="/feAngry1.svg" /> Complaints</li>
            <li> <SideBarIcon src="/feAngry2.svg" /> Personal Info</li>
        </ul>
    )
}

function Tabs(){
    return(
        <ul className={topBarStyles.tabs} >
            <li>
                {/* <div className={topBarStyles.liInsideDiv} > */}
                    <div className={topBarStyles.tabBackGround + " " + topBarStyles.active} >
                        <img src="/tabActiveRect.svg" />
                    </div>
                    <div className={topBarStyles.tabBackGround + " " + topBarStyles.active} >
                        <img src="/tabActive.svg" />
                    </div>
                    
                    <div className={topBarStyles.tabText + " " + topBarStyles.active} >
                        New Application 
                    </div>
                {/* </div> */}
                
            </li>
            <li>
                {/* <div className={topBarStyles.liInsideDiv} > */}
                    <div className={topBarStyles.tabBackGround} >
                        <img src="/tabActiveRect.svg" />
                    </div>
                    <div className={topBarStyles.tabBackGround} >
                        <img src="/tabActive.svg" />
                    </div>
                    
                    <div className={topBarStyles.tabText} >
                        Previous Application 
                    </div>
                {/* </div> */}

            </li>
        </ul>
    )
}


export function TopBar(){
    return (
        <div  className={topBarStyles.root}>
            <div className={topBarStyles.logoSection}>
                <div className={topBarStyles.logoCircle} />
                HallSync
            </div>
            <div className={topBarStyles.tabSection}>
                <Tabs />
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