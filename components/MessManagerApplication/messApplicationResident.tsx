import { useMutation, useQuery } from "@apollo/client"
import { APPLY_FOR_MESS_MANAGER, GET_PREV_CALLS_STUDENT } from "../../graphql/operations"
import { PrevCallsStudentQuery } from "../../graphql/__generated__/graphql"
import MyCard from "../card"
import { getDayAndMonthAndYearString } from "../utilities"
import styles from '../../styles/components.module.scss'
import { MyButton } from "../button"


export function FromToComp(props : {
    from : string,
    to : string
}){
    return (
        <div className={styles.fromToContainer}>
            <div>
                <span>From</span> <span> {getDayAndMonthAndYearString(props.from)} </span>
            </div>
            
            <div>
                <span>To</span> <span> {getDayAndMonthAndYearString(props.to)} </span>
            </div>
        </div>
    )
}

function Call(props : {
    call : PrevCallsStudentQuery['prevCallsWithAppOfResident'][0]['call'],
    app : PrevCallsStudentQuery['prevCallsWithAppOfResident'][0]['application'],
    onClick : ()=>void,
    loading : boolean

}){
    return (
        <div className = {styles.callContainerStudentView}>
            <FromToComp from={props.call.from} to = {props.call.to} />
            {
                props.app && 

                <div className={styles.applicationContainer}>
                    <span>Application Status: </span>
                    <span className={props.app.status}>{props.app.status}</span>
                    
                </div>
            }
            {
                !props.app && 

                <div className={styles.applyContainer}>
                    <MyButton buttonProps={{ disabled : props.loading}} text="Apply" type="submit" onClick={props.onClick} />
                </div>
            }
            
                

        </div>
    )
}

export function CallsAndApply(){

    let {data,refetch} = useQuery(
        GET_PREV_CALLS_STUDENT,
        {
            onCompleted : (d)=>{
                console.log("data" , d);
            },
            onError : (err)=>{
                console.log(err);
            }
        }
    )

    let [applyMutation, {loading, error}] = useMutation(
        APPLY_FOR_MESS_MANAGER
    )

    function apply(callId : number){
        applyMutation({
            variables : {
                callId : callId
            },
            onCompleted : data =>{
                refetch();
            }
        })
    }

    return (
        <div>
            <MyCard title={"Application Calls"} style={{
                // display : "block",
                marginRight : 10
            }}>
                <div>
                    {
                    data?.prevCallsWithAppOfResident.map(d =>(
                    <Call 
                    loading = {loading}
                    onClick={()=>apply(d.call.callId)} 
                    key={d.call.callId} 
                    app={d.application} 
                    call={d.call} />
                    ))}
                </div>
            </MyCard>
        </div>
    )
}