import { useQuery } from "@apollo/client";
import { APPLICATIONS, FILTERS_DATA } from "../../graphql/operations";
import MyCard from "../../components/card";
import MyDropDown from "../../components/dropdown";
import { useState } from "react";
import styles from '../../styles/seatManagementIndex.module.scss'

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

function Applications(){

    const {loading, data, error} = useQuery(
        APPLICATIONS
    )

    return (
        <div className={"contentRoot"} style={{
            color : "white"
        }}>
            <Filters />
            {/* {data && data.applications.map(a =>(<div key={a.applicationId}> {a.student.name} </div>))} */}
            {/* Applications */}
        </div>
    )
}

export default Applications;