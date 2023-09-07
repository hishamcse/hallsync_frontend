import { useLazyQuery, useQuery } from "@apollo/client";
import { APPLICATIONS, FILTERS_DATA } from "../../graphql/operations";
import {useEffect, useState} from "react";
import styles from '../../styles/seatManagementIndex.module.scss'
import {Student} from "../../graphql/__generated__/graphql";
import { MyInput } from "../../components/input";

import { useRouter } from "next/router";
import { Filters } from "../../components/Seat/ProvostSeat/ApplicationsList/filters";
import { application } from "../../components/Seat/ProvostSeat/ApplicationsList/seatApplication";
import { SortBy } from "../../components/Seat/ProvostSeat/ApplicationsList/sortby";
import { ApplicationList } from "../../components/Seat/ProvostSeat/ApplicationsList/seatApplicationsList";
import PaginationControlled from "../../components/Pagination";

export type student = Student;

function Applications() {

    const [batch, setBatch] = useState<string[]>([]);
    const [dept, setDept] = useState<string[]>([]);
    const [status, setStatus] = useState<string[]>([]);
    const [type, setType] = useState<string[]>([]);
    const [lt, setLt] = useState<string[]>([]);
    const [orderBy, setOrderBy] = useState<string>('Time');
    const [order, setOrder] = useState<string>('Newest');
    const [search, setSearch] = useState<string>('');
    const [searchGT3, setSearchGT3] = useState<string>('');
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    const [options, setOptions] = useState<string[][]>([[],[],[],[],[]]);

    const router = useRouter()

    let queryVars  = {
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
    }


    const { loading, data, error, refetch } = useQuery(
        APPLICATIONS,{
            variables : queryVars,
            onCompleted : (data)=>{
                setCount(Math.ceil(data.applications.count / 10))
            }
        }
    )


    const [query , {data : optionsData}] = useLazyQuery(
        FILTERS_DATA
    )

    useEffect(()=>{
        query({
            onCompleted : (data)=>{
                if(data){
                    let arr : string[][] = [];
                    arr.push(data.batches.map(b => b.year))
                    arr.push(data.departments.map(d => d.shortName))
                    arr.push(data.applicationStatus.map(a => a.status))
                    arr.push(data.applicationTypes)
                    arr.push(data.levelTerms.map(lt => lt.label))
                    setOptions(arr);
                    InitialStatusSelectReset(data.applicationStatus.filter(s=>s.select).map(v => v.status))
                }
            }
        });
    }, [])



    function InitialStatusSelectReset(v : string[]){
        refetch({
            ... queryVars
        });
        setStatus(v);
    }
        
    useEffect(()=>{
        console.log("use effect");
        if(data){
            setCount(Math.floor(data.applications.count / 10))
        }
        console.log(status);
        
    }, [])


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
        setOrderBy('Time');
    }


    return (
        <div className={"contentRoot"} >
            <div className={styles.filterSortContainer}>
                <Filters
                    items={options}
                    setVals={[setBatch, setDept, setStatus, setType, setLt]}
                    placeHolders={['Batch', 'Dept', 'Status', 'Type','LevelTerm']}
                    vals={[batch, dept, status, type, lt]}
                    resetOnClick={filterResetOnClick}
                
                />
                <SortBy
                    items={[['Time', 'Batch'], ['Newest', 'Oldest']]}
                    setVals={[setOrderBy, setOrder]}
                    vals={[orderBy, order]}
                    resetOnClick={sortResetOnClick}
                />
            </div>
                
                <ApplicationList 
                loading = {loading} 
                applications={data ? data.applications.applications : undefined}
                itemOnClickHandler={(a : application)=>{
                    router.push('./seatManagement/newApplication/' + a.applicationId )
                }}
                search={
                    <MyInput className={styles.applicationListSearchBar} placeHolder="Search by Name or Id"
                    onChange={setSearch_} type="text" value={search}/>
                }
                pagintaion={<PaginationControlled page={page} setPage={setPage} count={count}/>}
                />
        </div>

    )
}

export default Applications;