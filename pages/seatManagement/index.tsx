import { useQuery } from "@apollo/client";
import { APPLICATIONS, FILTERS_DATA, SORT_DATA } from "../../graphql/operations";
import MyCard from "../../components/card";
import MyDropDown from "../../components/dropdown";
import { useReducer, useState } from "react";
import styles from '../../styles/seatManagementIndex.module.scss'
import { ApplicationStatus, ApplicationsQuery } from "../../graphql/__generated__/graphql";
import { MyButton } from "../../components/button";
import { MyInput } from "../../components/input";

function Filters(
    props : {
        batch : string | undefined,
        setBatch : (s:string)=>void,
        
        dept : string | undefined,
        setDept : (s:string)=>void,
        
        status : string | undefined,
        setStatus : (s:string)=>void,
        
        type : string | undefined,
        setType : (s:string)=>void,

        lt : string | undefined,
        setLt : (s:string)=>void,


        resetOnClick : ()=> void,
        applyOnClick : ()=> void
    }
) {

    let {batch, setBatch, dept,
         setDept, status, setStatus, type, setType, resetOnClick,applyOnClick,
        lt, setLt} = props;

    const { data, loading } = useQuery(
        FILTERS_DATA
    )

    // function resetOnClick(){
    //     setBatch(undefined);
    //     setDept(undefined);
    //     setStatus(undefined);
    //     setType(undefined);
    // }

    const content = (
        data &&
        <div className={styles.filtersContainer}>

            <div className={styles.filtersRow}>

                <MyDropDown items={data.batches.map(b => b.year)}
                    onSelect={(v) => setBatch(v)} toggleStyle={{ width: "170px" }}
                    selectedVal={batch ?? 'Batch'} />

                <MyDropDown items={data.departments.map(d => d.shortName)}
                    onSelect={(v) => setDept(v)} toggleStyle={{ width: "170px" }}
                    selectedVal={dept ?? 'Dept'} />
            </div>
            <div className={styles.filtersRow}>

                <MyDropDown items={data.applicationStatus}
                    onSelect={(v) => setStatus(v)} toggleStyle={{ width: "170px" }}
                    selectedVal={status ?? 'Status'} />

                <MyDropDown items={data.applicationTypes}
                    onSelect={(v) => setType(v)} toggleStyle={{ width: "170px" }}
                    selectedVal={type ?? 'Type'} />
            </div>
            <div className={styles.filtersRow}>

                <MyDropDown items={data.applicationStatus}
                    onSelect={(v) => setLt(v)} toggleStyle={{ width: "170px" }}
                    selectedVal={lt ?? 'LevelTerm'} />
            </div>
            <div className={styles.filterButtonContainer}>
                <MyButton onClick={resetOnClick} text="Apply" type="submit"  />
                <MyButton onClick={resetOnClick} text="Clear" type="cancel"  />
            </div>
        </div>
    );

    return <MyCard title={"Filters"} content={content ?? <div></div>} />
}

type application = ApplicationsQuery['applications'][0];

function getApplicaitonType(application: application) {
    if (application.newApplication)
        return 'new seat';
    else if (application.roomChangeApplication) {
        return 'room change';
    }
    return 'temp seat';
}

function Application(props: {
    application: application
}) {
    let { student } = props.application;
    let statusClassMap: any = {
        'PENDING': styles.pending,
        'ACCEPTED': styles.accepted,
        'REJECTED': styles.rejected,
    }
    return (
        <div className={styles.applicationRoot}>
            <div className={styles.applicationRow}>
                <div>  {student.name} </div>
                <div> Department: {student.department.shortName} </div>
                <div> Batch: {student.batch.year} </div>
                <div> L/T:  {student.levelTerm.label} </div>
            </div>
            <div className={styles.applicationRow}>
                <div>
                    {student.student9DigitId}
                </div>

                <div>
                    Date : {new Date(props.application.createdAt).toLocaleDateString()}
                </div>
                <div>
                    {getApplicaitonType(props.application)} application
                </div>
                <div >
                    status : <span className={statusClassMap[props.application.status]}>{props.application.status}</span>
                </div>
            </div>
        </div>
    )
}

function SortBy(
    props : {
        orderBy : string | undefined,
        setOrderBy : (s:string)=>void,
        
        order : string,
        setOrder : (s:string)=>void,

        resetOnClick : ()=> void,
        applyOnClick : ()=> void
    }
) {
    let {orderBy, setOrderBy, order, setOrder, resetOnClick,applyOnClick} = props;

    const content = (
        <div className={styles.filtersContainer}>

            <div className={styles.filtersRow}>

                <MyDropDown items={['Batch', 'Time']}
                    onSelect={(v) => setOrderBy(v)} toggleStyle={{ width: "170px" }}
                    selectedVal={orderBy ?? 'Sort By'} />

                <MyDropDown items={['Newest', 'Oldest']}
                    onSelect={(v) => setOrder(v)} toggleStyle={{ width: "170px" }}
                    selectedVal={order} />
            </div>

            <div className={styles.filterButtonContainer}>
                <MyButton onClick={applyOnClick} text="Apply" type="submit"  />
                <MyButton onClick={resetOnClick} text="Clear" type="cancel"  />
            </div>
        </div>
    )

    return (
        <MyCard title={"Sort By"} content={content ?? <div></div>} />
    )

}

function Applications() {


    const [batch, setBatch] = useState<string | undefined>();
    const [dept, setDept] = useState<string | undefined>();
    const [status, setStatus] = useState<string | undefined>();
    const [type, setType] = useState<string | undefined>();
    const [lt, setLt] = useState<string | undefined>();
    const [orderBy, setOrderBy] = useState<string | undefined>();
    const [order, setOrder] = useState<string>('Newest');
    const [search, setSearch] = useState<string>('');
    const [searchGT3, setSearchGT3] = useState<string>('');

    const { loading, data, error } = useQuery(
        APPLICATIONS,{
            variables : {
                filters : {
                    batch : batch,
                    dept : dept,
                    status : status,
                    type : type
                },
                sort : {
                    order : order,
                    orderBy : orderBy
                },
                search : {
                    searchBy : searchGT3
                }
            }
        }
    )

    function setSearch_(s : string){
        setSearch(s);
        if(s.trim().length >= 3){
            setSearchGT3(s);
        }
    }

    function filterResetOnClick(){
        setBatch(undefined);
        setDept(undefined);
        setStatus(undefined);
        setType(undefined);
        setLt(undefined);
    }
    function sortResetOnClick(){
        setOrder('Newest');
        setOrderBy(undefined);
    }

    return (
        <div className={"contentRoot"} style={{
            color: "white"
        }}>
            <div className={styles.filterSortContainer}>
                <div>
                    <Filters
                    batch={batch}
                    dept={dept}
                    status={status}
                    type={type}
                    lt={lt}
                    setBatch={setBatch}
                    setDept={setDept}
                    setStatus={setStatus}
                    setType={setType}
                    setLt={setLt}
                    resetOnClick={filterResetOnClick}
                    applyOnClick={()=>{}}
                    />
                </div>
                <div>
                <SortBy
                    orderBy={orderBy}
                    order={order}
                    setOrderBy={setOrderBy}
                    setOrder={setOrder}
                    resetOnClick={sortResetOnClick}
                    applyOnClick={()=>{}}
                    />
                </div>
            </div>
            <div>
                
                {
                    <div className={styles.applicationListRoot}>
                        <div className={styles.applicationListSearchBarContainer}>
                            <div className={styles.searchBarIconContainer}>
                                <img src="/search.svg" />
                            </div>
                            <MyInput className={styles.applicationListSearchBar} placeHolder="Search by Name or Id" onChange={setSearch_} type="text" value={search} />
                        </div>

                        {
                            data && 
                            data.applications.map(a => (<Application application={a} key={a.applicationId} />))
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Applications;