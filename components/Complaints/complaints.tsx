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
import { GET_COMPLAINTS, GET_COMPLAINT_BY_STD_ID,GET_INFO, GET_COMPLAINT_BY_TYPE, GET_COMPLAINT_FROM_DATE, ADD_COMPLAINT } from "../../graphql/operations";
import { MyDatePicker } from "../DatePicker";
import { ComplaintTypeDropDown } from "./complaintTypeDropDown";
import { Dayjs } from "dayjs";
import { Filters } from "../Seat/ProvostSeat/ApplicationsList/filters";
import { SortBy } from "../Seat/ProvostSeat/ApplicationsList/sortby";
import styles from '../../styles/seatManagementIndex.module.scss'
import { GET_SELECTED_COMPLAINTS } from "../../graphql/operations";

const SingleComplaint = (props: { complaint: GetComplaintsQuery['getComplaints'][0] }) => {
    
    return (
        <div style={{margin: 20, width: '100%'}}>
            <div style={{color: "white", margin: 30}}>
                {/* write text "Type:"  followed by the complaint type*/}
                <span>Type: {props.complaint.type}</span>

                
            </div>
            <div style={{color: "white", margin: 30}}>
                {props.complaint.details.substring(0, 150)}....
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: 30, marginRight: 50}}>
                <div style={{color: "darkgrey"}}>
                    <Typography variant={"body1"}>
                       <span><DateRangeIcon />&nbsp;&nbsp;&nbsp;
                           {new Date(props.complaint.createdAt).toDateString()}</span>
                    </Typography>
                </div>
                <div style={{ color: "darkgrey" }}>
                    {props.complaint.student.student9DigitId && (
                        <Typography variant={"body1"}>
                        <span><LocalOfferIcon />&nbsp;
                            Student ID: {props.complaint.student.student9DigitId}
                        </span>
                        </Typography>
                    )}
                </div>
            </div>
        </div>
    )
}

const ComplaintTitle = (props: { complaint: GetComplaintsQuery['getComplaints'][0] }) => {

    const [showDetails, setShowDetails] = useState<boolean>(false);
    const handleShowDetails = () => {
        setShowDetails(!showDetails);
    }
    const handleSubmission = () => {
        console.log("Submission");
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: 20, marginRight: 20}}>
                <Typography variant={"h6"}>
                    <span><CampaignIcon />&nbsp;&nbsp;&nbsp;<i>{props.complaint.title}</i></span>
                </Typography>
                <Button variant={"outlined"} color={"primary"} style={{marginTop: 10}} onClick={handleShowDetails}>
                    View Details
                </Button>
            </div>
            {
                showDetails &&
                <CustomizedDialog show={true} setShow={setShowDetails} cardTitle='Complaint Details'>
                    {<ComplaintDetailsContent complaintTitle={props.complaint.title}
                                                complaintDetails={props.complaint.details}
                                                complaintType={props.complaint.type}
                                                date={new Date(props.complaint.createdAt).toDateString()}
                                                studentId={props.complaint.student.studentId}
                                                sudent9DigitId={props.complaint.student.student9DigitId}
                                                studentName={props.complaint.student.name}
                    />}
                </CustomizedDialog>
            }
        </div>
    )
}

const Complaints = () => {

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

    function setFuncWrapper(f : (s : any)=>void){
        return (a : any)=>{
            f(a);
            setMessage(undefined);
        }
    }

    

    let queryVars  = {
        filters : {
            type : complaintType,
        },
        sort : {
            order : order,
            orderBy : orderBy
        },
        search : {
            searchBy : searchGT3
        },
        startDate : fromDate?.toISOString(),
        studentId : studentId,
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


    function handleOptionChange(e : React.ChangeEvent<HTMLInputElement>){
        setType(e.target.value);
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
        setComplaintType([]);
    }

    function sortResetOnClick(){
        setOrderBy('createdAt');
        setOrder('asc');
    }

    function InitialStatusSelectReset(v : string[]){
        refetch({
            ... queryVars
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



    // const {data: dataByType, loading: loadingByType, error: errorByType} = useQuery(GET_COMPLAINT_BY_TYPE, {
    //     variables: {
    //         type: complaintType[0],
    //     },
    //     onCompleted: (data) => {
    //         console.log(data);
    //         if(!isResident){
    //             setComplaints(data.getComplaintsByType);
    //         }
    //     },
    //     onError: (error) => {
    //         console.log(error);
    //     }
    // })
    // console.log(complaints);

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
            variables : {
                title : title,
                details : details,
                type : type,
            },
            onCompleted : (data) => {
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
                    <Button variant='contained' color="primary" size='large' style={{ margin: 20 }} onClick={handleShowDetails}>
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
                    vals = {[complaintType]}
                    resetOnClick={filterResetOnClick}
                />
                <SortBy
                    items={[['createdAt'], ['asc', 'desc']]}
                    setVals={[setOrderBy, setOrder]}
                    vals={[orderBy, order]}
                    resetOnClick={sortResetOnClick}
                />
                <MyDatePicker date={fromDate} handleDate={setFuncWrapper(setFromDate)} />
                {/* search option */}
                <div className={styles.searchContainer}>
                    <TextField
                        placeholder="Search"
                        style={{ width: '100%', backgroundColor: '#000', color: '#fff' }}
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

const ComplaintDetailsContent = (props: {
    complaintTitle?: string,
    complaintDetails?: string,
    complaintType?: string,
    date?: string,
    messManager?: boolean,
    studentId?: number,
    sudent9DigitId?: string,
    studentName?: string
}) => {
    return (
        <DialogContent dividers>
            <Typography variant={"h6"} gutterBottom style={{marginBottom: 20}}>
                <span><CampaignIcon/>&nbsp;&nbsp;&nbsp;<i>{props.complaintTitle}</i></span>
            </Typography>
            <Typography variant={"body1"} gutterBottom style={{marginBottom: 20}}>
                <span>Type : &nbsp;&nbsp;&nbsp;{props.complaintType}</span>
            </Typography>
            <Typography gutterBottom>
                <MyCard style={{marginTop: 10, marginBottom: 20}} title=''>
                    <CardContent complaintDetails={props.complaintDetails}/>
                </MyCard>

            </Typography>
            <Typography gutterBottom>
                <div
                    style={{display: 'flex', justifyContent: 'space-between', margin: 10}}>
                    <div style={{color: "darkgrey"}}>
                        <Typography variant={"body1"}>
                       <span><DateRangeIcon/>&nbsp;&nbsp;&nbsp;
                           {props.date}</span>
                        </Typography>
                    </div>
                    <div style={{ color: "darkgrey" }}>
                        {props.sudent9DigitId && (
                            <Typography variant={"body1"}>
                            <span><LocalOfferIcon />&nbsp;
                                Student ID: {props.sudent9DigitId}
                            </span>
                            </Typography>
                        )}
                    </div>
                    
                </div>
            </Typography>
        </DialogContent>
    )
}

const AddComplaintContent = (props: {
    studentId?: number,
    student9DigitId?: string,
    studentName?: string,
    date?: string,
    handleSubmission: (title: string, details: string, type: string) => void
}) => {

    const [title, setTitle] = useState<string>();
    const [type, setType] = useState<string>();
    const [details, setDetails] = useState<string>();

    const [error, setError] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value);
    }

    const handleSubmission = () => {
        if(!title || !details || !type) {
            setError(true);
            return;
        }
        setError(false)
        props.handleSubmission(title, details, type);
    }

    return (
        <div>
            <DialogContent dividers>
                <Typography variant={"body1"} gutterBottom style={{marginBottom: 20, alignItems: 'center'}}>
                    <span><CampaignIcon/>&nbsp;&nbsp;Title</span><br/>
                    <TextField placeholder="Complaint title"
                               style={{width: '100%', backgroundColor: '#000', color: '#fff'}}
                               onChange={handleChange} value={title} onFocus={() => setError(false)}/>
                </Typography>

                {/* drop down menu of types */}
                <Typography variant={"body1"} gutterBottom style={{marginBottom: 20, alignItems: 'center'}}>
                    <span><CampaignIcon/>&nbsp;&nbsp;Type</span><br/>
                    <ComplaintTypeDropDown val={type} setVal={setType}/>
                </Typography>


                <Typography variant={"body1"} gutterBottom style={{marginBottom: 20, alignItems: 'center'}}>
                    <span><CampaignIcon/>&nbsp;&nbsp;Description</span><br/>
                    <MUIStyledTextarea placeHolder="complaint details" rows={8} val={details}
                                       handleInput={setDetails}/>
                </Typography>

                <Typography gutterBottom>
                    <div
                        style={{display: 'flex', justifyContent: 'space-between', margin: 10}}>
                        <div style={{color: "darkgrey"}}>
                            <Typography variant={"body1"}>
                               <span><DateRangeIcon/>&nbsp;&nbsp;&nbsp;
                                   {props.date}</span>
                            </Typography>
                        </div>
                        <div style={{color: "darkgrey"}}>
                            <div style={{ color: "darkgrey" }}>
                                {props.student9DigitId && (
                                    <Typography variant={"body1"}>
                                    <span><LocalOfferIcon />&nbsp;
                                        Student ID: {props.student9DigitId}
                                    </span>
                                    </Typography>
                                )}
                            </div>

                        </div>
                    </div>
                </Typography>
            </DialogContent>
            {
                error &&
                <Typography variant={"body1"} style={{color: 'red', textAlign: 'center'}}>
                    Please fill all fields
                </Typography>
            }
            <DialogActions>
                <Button autoFocus variant='outlined' color='inherit' size='large'
                        onClick={handleSubmission}>
                    Add
                </Button>
            </DialogActions>
        </div>
    )
}

const CardContent = (props: {complaintDetails?: string}) => {
    return (
        <div style={{color: "white", margin: 10, fontSize: 17}}>
            {props.complaintDetails}
        </div>
    )
}


export default Complaints;