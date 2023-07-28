import { useQuery } from "@apollo/client";
import { APPLICATIONS, FILTERS_DATA } from "../../graphql/operations";
import MyCard from "../../components/card";
import MyDropDown from "../../components/dropdown";
import { useState } from "react";
import styles from '../../styles/seatManagementIndex.module.scss'
import { ApplicationsQuery } from "../../graphql/__generated__/graphql";

function Filters(){

    const [batch, setBatch] = useState<string|undefined>();
    const [dept, setDept] = useState<string|undefined>();
    const [status, setStatus] = useState<string|undefined>();
    const [type, setType] = useState<string|undefined>();
    const {data, loading} = useQuery(
        FILTERS_DATA
    )

    const content = (

        <div>
            {loading && <div> Loading </div>}
            {
                data &&
                <div className={styles.filtersContainer}>
                    
                    <div className={styles.filtersRow}>

                        <MyDropDown items={data.batches.map(b=>b.year)} 
                        onSelect={(v)=>setBatch(v)} toggleStyle={{width : "170px"}} 
                        selectedVal={batch ?? 'Batch'}/>

                        <MyDropDown items={data.departments.map(d=>d.shortName)} 
                        onSelect={(v)=>setDept(v)} toggleStyle={{width : "170px"}}
                        selectedVal={dept ?? 'Dept'}/>
                    </div>
                    <div className={styles.filtersRow}>

                        <MyDropDown items={data.applicationStatus} 
                        onSelect={(v)=>setStatus(v)} toggleStyle={{width : "170px"}} 
                        selectedVal={status ?? 'Status'}/>
                        
                        <MyDropDown items={data.applicationTypes} 
                        onSelect={(v)=>setType(v)}  toggleStyle={{width : "170px"}}
                        selectedVal={type ?? 'Type'}/>
                    </div>
                </div>
            }
        </div>
    );

    return <MyCard title={"Filters"} content={content} />
}

type application =  ApplicationsQuery['applications'][0];

function getApplicaitonType(application : application){
     if(application.newApplication)
        return 'new seat';
    else if(application.roomChangeApplication){
        return 'room change';
    }
    return 'temp seat';
}

function Application(props : {
    application : application
}){
    let {student} = props.application;
    let statusClassMap : any  = {
        'PENDING' : styles.pending,
        'ACCEPTED' : styles.accepted,
        'REJECTED' : styles.rejected,
    }
    return(
        <div className={styles.applicationRoot}>
            <div className={styles.applicationRow}>
                <div>  {student.name} </div>
                <div> Department: {student.department.shortName} </div>
                <div> Batch: {student.batch.year} </div>
                <div> L/T:  {student.levelTerm.label} </div>
            </div>
            <div className={styles.applicationRow}>
                <div>
                    Date : {new Date(props.application.createdAt).toLocaleDateString()}
                </div>
                <div>
                    {getApplicaitonType(props.application)} application
                </div>
                <div></div>
                <div >
                    status : <span className={statusClassMap[props.application.status]}>{props.application.status}</span> 
                </div>
            </div>
        </div>
    )
}

function Applications(){

    const {loading, data, error} = useQuery(
        APPLICATIONS
    )

    return (
        <div className={"contentRoot"} style={{
            color : "white"
        }}>
            <Filters />
            {
            data && 
            <div className={styles.applicationListRoot}>
                {data.applications.map(a =>(<Application application={a} key={a.applicationId} />))}
            </div>
            }
            {/* Applications */}
        </div>
    )
}

export default Applications;