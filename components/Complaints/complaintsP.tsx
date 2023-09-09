import useResidencyStatus from "../../hooks/useResidencyStatus";
import {useMutation, useQuery, useLazyQuery} from "@apollo/client";
import {GetComplaintsQuery, GetComplaintsByStudentQuery} from "../../graphql/__generated__/graphql";
import {useContext, useEffect, useState} from "react";
import {userContext} from "../../pages/_app";
import MyCard from "../card";
import {Button, DialogActions, DialogContent, TextField, Typography} from "@mui/material";
import {DateRangeIcon} from "@mui/x-date-pickers";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CampaignIcon from '@mui/icons-material/Campaign';
import CustomizedDialog from "../MUIDialog";
import {useRouter} from "next/router";
import MUIStyledTextarea from "../MUITextArea";
import {
    GET_COMPLAINTS,
    GET_COMPLAINT_BY_STD_ID,
    GET_INFO,
    GET_COMPLAINT_BY_TYPE,
    GET_COMPLAINT_FROM_DATE,
    ADD_COMPLAINT
} from "../../graphql/operations";
import {MyDatePicker} from "../DatePicker";
import {Dayjs} from "dayjs";
import {Filters} from "../Seat/ProvostSeat/ApplicationsList/filters";
import {SortBy} from "../Seat/ProvostSeat/ApplicationsList/sortby";
import styles from '../../styles/seatManagementIndex.module.scss'
import {GET_SELECTED_COMPLAINTS} from "../../graphql/operations";
import SingleComplaint from "./SingleComplaint";
import AddComplaintContent from "./AddComplaint";
import ComplaintTitle from "./ComplaintTitle";

const ComplaintsP = () => {

    const router = useRouter();
    const {user} = useContext(userContext);

    const {messManager, resident, authority} = useResidencyStatus();

    const [complaints, setComplaints] = useState<GetComplaintsQuery['getComplaints']>([]);

    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [complaintType, setComplaintType] = useState<string[]>([]);
    const [options, setOptions] = useState<string[][]>([[]]);
    const [orderBy, setOrderBy] = useState<string>('createdAt');
    const [order, setOrder] = useState<string>('asc');
    const [search, setSearch] = useState<string>('');
    const [searchGT3, setSearchGT3] = useState<string>('');
    const [page, setPage] = useState(1);
    const [type, setType] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [fromDate, setFromDate] = useState<Dayjs | null>(null);
    const [message, setMessage] = useState<string>();


    const isResident = user?.student?.residencyStatus === 'RESIDENT';
    const studentId = isResident ? user?.student?.studentId : null;
    const studentIdWithDefault = isResident ? user?.student?.studentId : -1;

    function setFuncWrapper(f: (s: any) => void) {
        return (a: any) => {
            f(a);
            setMessage(undefined);
        }
    }


    let queryVars = {
        filters: {
            type: complaintType,
        },
        sort: {
            order: order,
            orderBy: orderBy
        },
        search: {
            searchBy: searchGT3
        },
        startDate: fromDate?.toISOString(),
        studentId: studentId,
    }


    // const {data: dataByStudent, loading: loadingByStudent, error: errorByStudent} = useQuery(GET_COMPLAINT_BY_STD_ID, {
    //     variables: {
    //         studentId: studentIdWithDefault,
    //     },
    //     onCompleted: (data) => {
    //         console.log(data);
    //         if(isResident){
    //             setComplaints(data.getComplaintsByStudent);
    //         }
    //     },
    //     onError: (error) => {
    //         console.log(error);
    //     }
    // })

    // const {data, loading, error} = useQuery(GET_COMPLAINTS, {
    //     onCompleted: (data) => {
    //         console.log(data);
    //         if(!isResident){
    //             setComplaints(data.getComplaints);
    //         }
    //     },
    //     onError: (error) => {
    //         console.log(error);
    //     }
    // })


    const {data: dataByType, loading: loadingByType, error: errorByType, refetch} = useQuery(GET_SELECTED_COMPLAINTS, {
        variables: queryVars,
        onCompleted: (data) => {
            console.log(data);

            setComplaints(data.getSelectedComplaints);
            console.log("dekha jak ki hoy");
            setOptions([['RESOURCE', 'STUFF', 'STUDENT']]);
        },
        onError: (error) => {
            console.log(error);
        }
    })


    // useEffect(()=>{
    //     query({
    //         onCompleted : (data)=>{
    //             if(data){
    //                 let arr : string[][] = [];

    //                 setOptions(arr);
    //                 console.log("dekha jak ki hoy");
    //                 console.log(arr);
    //             }
    //         }
    //     })
    // }, [complaintType])


    function handleOptionChange(e: React.ChangeEvent<HTMLInputElement>) {
        setType(e.target.value);
    }

    function pageReset(s: (s: string[]) => void) {
        return (v: string[]) => {
            s(v);
            setPage(1);
        }
    }

    function setSearch_(s: string) {
        setSearch(s);
        if (s.trim().length >= 3) {
            setSearchGT3(s);
            setPage(1);
        } else {
            setSearchGT3('');
        }
    }

    function filterResetOnClick() {
        setComplaintType([]);
    }

    function sortResetOnClick() {
        setOrderBy('createdAt');
        setOrder('asc');
    }

    function InitialStatusSelectReset(v: string[]) {
        refetch({
            ...queryVars
        });
        setComplaintType(v);
    }

    // const [query , {data : optionsData}] = useLazyQuery(
    //     GET_COMPLAINT_BY_TYPE
    // )

    // useEffect(()=>{
    //     query({
    //         onCompleted : (data)=>{
    //             if(data){
    //                 let arr : string[][] = [];
    //                 arr.push(data.getComplaintsByType.map(b => b.type));
    //                 setOptions(arr);
    //                 console.log("dekha jak ki hoy");
    //                 console.log(arr);
    //             }
    //         }
    //     })
    // }, [complaintType])

    const [addcomplaint] = useMutation(
        ADD_COMPLAINT, {
            onCompleted: (data) => {
                console.log(data);
                router.reload();
            },
            onError: (error) => {
                console.log(error);
            }
        }
    )

    const handleShowDetails = () => {
        setShowDetails(!showDetails);
    }

    const handleSubmission = (title: string, details: string, type: string) => {
        console.log(title, details, type)

        addcomplaint({
            variables: {
                title: title,
                details: details,
                type: type,
            },
            onCompleted: (data) => {
                console.log(data);
                router.reload();
            }
        })
    }

    return (
        <div>
            <div>
                <Typography variant={"h4"} style={{textAlign: 'center', color: '#fff'}}>
                    Complaints
                </Typography>
            </div>
            {!authority || messManager ? (
                <div>
                    <Button variant='contained' color="primary" size='large' style={{margin: 20}}
                            onClick={handleShowDetails}>
                        +&nbsp;Add Complaint
                    </Button>
                </div>
            ) : null}
            {/* Add filters by complaintType and sortBy date components */}
            <div className={styles.filterSortContainer}>
                <Filters
                    items={options}
                    setVals={[setComplaintType]}
                    placeHolders={['Complaint Type']}
                    vals={[complaintType]}
                    resetOnClick={filterResetOnClick}
                />
                <SortBy
                    items={[['createdAt'], ['asc', 'desc']]}
                    setVals={[setOrderBy, setOrder]}
                    vals={[orderBy, order]}
                    resetOnClick={sortResetOnClick}
                />
                <MyDatePicker date={fromDate} handleDate={setFuncWrapper(setFromDate)}/>
                {/* search option */}
                <div className={styles.searchContainer}>
                    <TextField
                        placeholder="Search"
                        style={{width: '100%', backgroundColor: '#000', color: '#fff'}}
                        onChange={(e) => setSearch_(e.target.value)}
                        value={search}
                    />
                </div>

            </div>


            {
                showDetails &&
                <CustomizedDialog show={true} setShow={setShowDetails} cardTitle='Add Complaint'>
                    <AddComplaintContent handleSubmission={handleSubmission}
                                         date={new Date().toDateString()}
                        //messManager={messManager}
                        //student Id from complaint data
                                         studentId={studentIdWithDefault}
                    />
                </CustomizedDialog>
            }
            {
                complaints && complaints.map((complaint, index) => {
                    return (
                        <div key={index} style={{margin: 20}}>
                            <MyCard key={index} title={<ComplaintTitle complaint={complaint}/>} style={{width: '100%'}}>
                                {<SingleComplaint complaint={complaint}/>}
                            </MyCard>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ComplaintsP;