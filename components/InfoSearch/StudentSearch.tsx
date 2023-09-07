import {useEffect, useState} from "react";
import {useLazyQuery, useQuery} from "@apollo/client";
import {FILTERS_STUDENT_DATA, RETRIEVE_STUDENTS} from "../../graphql/operations";
import {Filters} from "../Seat/ProvostSeat/ApplicationsList/filters";
import {SortBy} from "../Seat/ProvostSeat/ApplicationsList/sortby";
import styles from '../../styles/seatManagementIndex.module.scss'
import {MyInput} from "../input";
import StudentList from "./StudentList";
import PaginationControlled from "../Pagination";

const StudentSearch = () => {

    const [batch, setBatch] = useState<string[]>([]);
    const [dept, setDept] = useState<string[]>([]);
    const [residencyStatus, setResidencyStatus] = useState<string[]>([]);
    const [levelTerm, setLevelTerm] = useState<string[]>([]);

    const [orderBy, setOrderBy] = useState<string>('LevelTerm');
    const [order, setOrder] = useState<string>('asc');

    const [search, setSearch] = useState<string>('');
    const [searchGT3, setSearchGT3] = useState<string>('');
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    const [options, setOptions] = useState<string[][]>([[],[],[],[]]);

    let queryVars  = {
        filters : {
            batch : batch,
            dept : dept,
            residencyStatus : residencyStatus,
            levelTerm : levelTerm
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

    const { loading, data, refetch } = useQuery(
        RETRIEVE_STUDENTS,{
            variables : queryVars,
            onCompleted : (data)=> {
                setCount(Math.ceil(data.retrieveStudents.count / 10))
                console.log(data.retrieveStudents)
            }
        }
    )

    const [query] = useLazyQuery(
        FILTERS_STUDENT_DATA
    )

    useEffect(()=>{
        query({
            onCompleted : (data)=>{
                if(data){
                    let arr : string[][] = [];
                    arr.push(data.batches.map(b => b.year))
                    arr.push(data.departments.map(d => d.shortName))
                    arr.push(data.residencyStatus.map(rs => rs.status))
                    arr.push(data.levelTerms.map(lt => lt.label))
                    setOptions(arr);
                    InitialStatusSelectReset(data.residencyStatus
                        .filter(s=>s.select)
                        .map(v => v.status))
                }
            }
        });
    }, [])

    function InitialStatusSelectReset(v : string[]){
        refetch({
            ... queryVars
        });
        setResidencyStatus(v);
    }

    useEffect(()=>{
        if(data){
            setCount(Math.floor(data.retrieveStudents.count / 10))
        }
    }, [])

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
        setResidencyStatus([]);
        setLevelTerm([]);
    }

    function sortResetOnClick(){
        setOrder('asc');
        setOrderBy('Batch');
    }

    return (
        <div style={{marginTop: 20}}>
                <div className={styles.filterSortContainer} style={{justifyContent: 'center'}}>
                    <Filters
                        items={options}
                        setVals={[setBatch, setDept, setResidencyStatus, setLevelTerm]}
                        placeHolders={['Batch', 'Dept', 'ResidencyStatus', 'LevelTerm']}
                        vals={[batch, dept, residencyStatus, levelTerm]}
                        resetOnClick={filterResetOnClick}
                        width={470}
                    />
                    <SortBy
                        items={[['LevelTerm', 'Batch'], ['asc', 'desc']]}
                        setVals={[setOrderBy, setOrder]}
                        vals={[orderBy, order]}
                        resetOnClick={sortResetOnClick}
                    />
                </div>

            <StudentList
                loading = {loading}
                students={data ? data.retrieveStudents.students : undefined}
                search={
                    <MyInput className={styles.applicationListSearchBar} placeHolder="Search by Name or Id"
                             onChange={setSearch_} type="text" value={search}/>
                }
                pagination={<PaginationControlled page={page} setPage={setPage} count={count}/>}
            />
        </div>
    )
}

export default StudentSearch