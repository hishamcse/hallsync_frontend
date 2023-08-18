import { useQuery } from "@apollo/client"
import { GET_ASSINGED_MESS_MANAGERS } from "../graphql/operations"
import { AssingedMessManagersQuery } from "../graphql/__generated__/graphql"
import MyCard from "./card"
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from '../styles/components.module.scss'
import { getDayAndMonthAndYearString } from "./utilities";


function MessManager(props : {
    messManager : AssingedMessManagersQuery['assingedMessManagers'][0]
}){
    return (
        <div className={styles.messManagerRoot}>
            <div className={styles.picAndInfoRoot}>
                <div>
                    <AccountCircleIcon sx = {{
                        fontSize : 100
                    }} />
                </div>
                <div className={styles.infoRoot}>
                    <div>
                        Name : {props.messManager.residency.student.name}
                    </div>
                    <div>
                        Phone : {props.messManager.residency.student.phone}
                    </div>
                    <div>
                        Email : {props.messManager.residency.student.email}
                    </div>
                    <div>
                        id : {props.messManager.residency.student.student9DigitId}
                    </div>
                </div>
            </div>
            <div className={styles.timeRangeContainer}>
                {getDayAndMonthAndYearString(props.messManager.from)} to {getDayAndMonthAndYearString(props.messManager.to)}
            </div>
        </div>
    )
}

export function MessManagerList(){

    let {data, loading, error} = useQuery(
        GET_ASSINGED_MESS_MANAGERS
    )


    


    return (
            <MyCard title={"Assigned Mess Managers"} content={
                <div>
                    {
                        data?.assingedMessManagers.map(manager =>(
                            <MessManager messManager={manager} />
                        ))
                    }
                </div>
            } style={{
                marginRight : 10,
            }} />
    )
}