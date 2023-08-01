import { useQuery } from "@apollo/client";
import { APPLICATIONS, FILTERS_DATA, SORT_DATA } from "../../graphql/operations";
import MyCard from "../../components/card";
import MyDropDown from "../../components/dropdown";
import {useEffect, useState} from "react";
import styles from '../../styles/seatManagementIndex.module.scss'
import {ApplicationsQuery, Student} from "../../graphql/__generated__/graphql";
import { MyButton } from "../../components/button";
import { MyInput } from "../../components/input";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Skeleton from "@mui/material/Skeleton";
import MultipleSelectCheckmarks from "../../components/MUIMultiSelectCheckbox";
import NewSeatP from "../../components/ProvostSeat/NewSeatP";
import TempSeatP from "../../components/ProvostSeat/TempSeatP";
import RoomChangeP from "../../components/ProvostSeat/RoomChangeP";

function Filters(
    props : {
        batch : string[],
        setBatch : (s:string[])=>void,
        
        dept : string[],
        setDept : (s:string[])=>void,
        
        status : string[],
        setStatus : (s:string[])=>void,
        
        type : string[],
        setType : (s:string[])=>void,

        lt : string[],
        setLt : (s:string[])=>void,


        resetOnClick : ()=> void,
        applyOnClick : ()=> void
    }
) {

    let {batch, setBatch, dept,
         setDept, status, setStatus, type, setType, resetOnClick,applyOnClick,
        lt, setLt} = props;

    const { data, loading } = useQuery(
        FILTERS_DATA,
        {
            onCompleted : (data)=>{
                if(data)
                    props.setStatus(data.applicationStatus.filter(s=>s.select).map(v => v.status))
            }
        }
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
                <MultipleSelectCheckmarks 
                    items={data.batches.map(b=>b.year)} 
                    placeHolder="Batch"
                    setVal={setBatch} 
                    val={batch} 
                />

                <MultipleSelectCheckmarks 
                    items={data.departments.map(d=>d.shortName)} 
                    placeHolder="Dept"
                    setVal={setDept} 
                    val={dept} 
                />
                
            </div>
            <div className={styles.filtersRow}>

                <MultipleSelectCheckmarks 
                    items={data.applicationStatus.map(v => v.status)} 
                    placeHolder="Status"
                    setVal={setStatus} 
                    val={status} 
                />

                <MultipleSelectCheckmarks 
                    items={data.applicationTypes} 
                    placeHolder="Type"
                    setVal={setType} 
                    val={type} 
                />

                
            </div>
            <div className={styles.filtersRow}>
                <MultipleSelectCheckmarks 
                    items={data.levelTerms.map(l =>l.label)} 
                    placeHolder="LevelTerm"
                    setVal={setLt} 
                    val={lt} 
                />

                {/* <MyDropDown items={data.levelTerms.map(d=>d.label)}
                    onSelect={(v) => setLt(v)} toggleStyle={{ width: "170px" }}
                    selectedVal={lt ?? 'LevelTerm'} /> */}
            </div>
            <div className={styles.filterButtonContainer}>
                <MyButton onClick={resetOnClick} text="Apply" type="submit"  />
                <MyButton onClick={resetOnClick} text="Clear" type="cancel"  />
            </div>
            
            <div>
                {/* <MultipleSelectCheckmarks /> */}
            </div>
        </div>
    );

    return <MyCard title={"Filters"} content={content ?? <div></div>} />
}
export type application = ApplicationsQuery['applications']['applications'][0];
export type student = Student;

// type application = ApplicationsQuery['applications'][0];


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

function PaginationControlled(props : {
    page : number,
    setPage : (v : number)=> void,
    count : number
}) {
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      props.setPage(value);
    };
  
    return (
      <Stack spacing={2}>
        <Pagination count={props.count} page={props.page} onChange={handleChange} />
      </Stack>
    );
  }

function Applications() {

    const [batch, setBatch] = useState<string[]>([]);
    const [dept, setDept] = useState<string[]>([]);
    const [status, setStatus] = useState<string[]>([]);
    const [type, setType] = useState<string[]>([]);
    const [lt, setLt] = useState<string[]>([]);
    const [orderBy, setOrderBy] = useState<string | undefined>();
    const [order, setOrder] = useState<string>('Newest');
    const [search, setSearch] = useState<string>('');
    const [searchGT3, setSearchGT3] = useState<string>('');
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    const [view, setView] = useState('');
    const [application, setApplication] = useState<application | undefined>();

    let skeletonHeight = 80;

    const { loading, data, error } = useQuery(
        APPLICATIONS,{
            variables : {
                filters : {
                    batch : batch,
                    dept : dept,
                    status : status,
                    type : type,
                    lt : lt
                },
                sort : {
                    order : order,
                    orderBy : orderBy
                },
                search : {
                    searchBy : searchGT3
                },
                page : page
            },
            onCompleted : (data)=>{
                setCount(Math.floor(data.applications.count / 10))
            }
        }
    )

    useEffect(()=>{
        if(data){
            setCount(Math.floor(data.applications.count / 10))
        }
    }, [])

    const handleViewChange = (e: React.MouseEvent<HTMLDivElement>, a: application) => {
        console.log(a);
        if(a.newApplication){
            setView('new seat');
            setApplication(a);
        } else if(a.roomChangeApplication){
            setView('room change');
            setApplication(a);
        } else if(a.tempApplication){
            setView('temp seat');
            setApplication(a);
        } else {
            setView('');
            setApplication(undefined)
        }
    }

    function pageReset(s : (s : string[])=>void){
        return (v : string[])=>{
            s(v);
            setPage(1);
        }
    }

    function setSearch_(s : string){
        setSearch(s);
        if(s.trim().length >= 3){
            setSearchGT3(s);
            setPage(1);
        }
        else{
            setSearchGT3('');
        }
    }

    function filterResetOnClick(){
        setBatch([]);
        setDept([]);
        setStatus([]);
        setType([]);
        setLt([]);
    }
    function sortResetOnClick(){
        setOrder('Newest');
        setOrderBy(undefined);
    }

    function resetView(){
        setView('');
        setApplication(undefined);
    }

    return (
        <div>
            {!application &&
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
                            setBatch={pageReset(setBatch)}
                            setDept={pageReset(setDept)}
                            setStatus={pageReset(setStatus)}
                            setType={pageReset(setType)}
                            setLt={pageReset(setLt)}
                            resetOnClick={filterResetOnClick}
                            applyOnClick={() => {
                            }}
                        />
                    </div>
                    <div>
                        <SortBy
                            orderBy={orderBy}
                            order={order}
                            setOrderBy={setOrderBy}
                            setOrder={setOrder}
                            resetOnClick={sortResetOnClick}
                            applyOnClick={() => {
                            }}
                        />
                    </div>
                </div>
                <div>

                    {
                        <div className={styles.applicationListRoot}>
                            <div className={styles.applicationListSearchBarContainer}>
                                <div className={styles.searchBarIconContainer}>
                                    <img src="/search.svg"/>
                                </div>
                                <MyInput className={styles.applicationListSearchBar} placeHolder="Search by Name or Id"
                                         onChange={setSearch_} type="text" value={search}/>
                            </div>
                            <div className={styles.paginationConrainer}>

                                {
                                    <PaginationControlled page={page} setPage={setPage} count={count}/>
                                }
                            </div>
                            {
                                loading &&
                                [1, 2, 3, 4, 5, 6, 7].map(v => (
                                    <div key={v} className={styles.loadingSkeletonContainer}>
                                        <Skeleton variant="rectangular" height={skeletonHeight}/>
                                    </div>
                                ))
                            }

                            {
                                data &&
                                data.applications.applications.map(a => (
                                    <div key={a.applicationId} onClick={(e) => handleViewChange(e, a)}>
                                        <Application application={a} key={a.applicationId}/>
                                    </div>))
                            }


                        </div>
                    }
                </div>
            </div>
            }

            {/*{*/}
            {/*    application && application.newApplication &&*/}
            {/*    <div  className={"contentRoot"}>*/}
            {/*        <NewSeatP application={application} resetHandler={resetView}/>*/}
            {/*    </div>*/}
            {/*}*/}

            {
                application && application.newApplication &&
                <div  className={"contentRoot"}>
                    <TempSeatP application={application} resetHandler={resetView}/>
                </div>
            }

            {
                application && application.roomChangeApplication &&
                <div  className={"contentRoot"}>
                   <RoomChangeP application={application} />
                </div>
            }
        </div>
    )
}

export default Applications;