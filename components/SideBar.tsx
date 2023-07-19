import Link from 'next/link'
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
