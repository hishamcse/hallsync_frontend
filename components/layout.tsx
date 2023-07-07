import topBarStyles from "../styles/topbar.module.scss"
export function StudentNavBar(){

    return(
        <ul>
            <li>Application</li>
            <li>Mess</li>
            <li>Payments</li>
            <li>Info</li>
            <li>Complaints</li>
            <li>Personal Info</li>
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
                tab section
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