import { useQuery } from "@apollo/client"
import { GET_MESS_MANAGER_EXPERIENCE } from "../../graphql/operations"
import { MessManagingExperiencesQuery } from "../../graphql/__generated__/graphql"
import { FromToComp } from "./messApplicationResident"
import MyCard from "../card"
import styles from '../../styles/components.module.scss'

function Exp(props : {
    exp : MessManagingExperiencesQuery['messManagingExperiences'][0]
}){

    return (
        <div className={styles.prevExpEachRoot}>
            <FromToComp from={props.exp.call.from} to={props.exp.call.to} />
            <div>
                <span>Assigned By:</span>
                <span> {props.exp.call.authority.name} </span>
            </div>
        </div>
    )
}

export function PreviousExp(){

    let {data, loading, error} = useQuery(
        GET_MESS_MANAGER_EXPERIENCE
    )

    return (
        <MyCard title={"Previous Mess Manager Experiences"} content={
            <div className={styles.prevContentRoot}>
                {
                    data && 
                    data.messManagingExperiences.map((exp, index) =>(
                        <Exp key={index + Math.random()} exp={exp} />
                    ))
                }
            </div>
        } style={{
            display : "block",
            marginRight : 10
        }} />
    )
}