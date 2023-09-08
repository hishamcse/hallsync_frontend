import useResidencyStatus from "../../hooks/useResidencyStatus";
import {useMutation, useQuery} from "@apollo/client";
import {GetAnnouncementsQuery, GetComplaintsQuery} from "../../graphql/__generated__/graphql";
import {useState} from "react";
import MyCard from "../card";
import {Button, DialogActions, DialogContent, TextField, Typography} from "@mui/material";
import {DateRangeIcon} from "@mui/x-date-pickers";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CampaignIcon from '@mui/icons-material/Campaign';
import CustomizedDialog from "../MUIDialog";
import {useRouter} from "next/router";
import MUIStyledTextarea from "../MUITextArea";
import { GET_COMPLAINTS, GET_COMPLAINT_BY_STD_ID, GET_COMPLAINT_BY_TYPE, GET_COMPLAINT_FROM_DATE, ADD_COMPLAINT } from "../../graphql/operations";
import { MyDatePicker } from "../DatePicker";
import { ComplaintTypeDropDown } from "./complaintTypeDropDown";
import { Dayjs } from "dayjs";

// const ComplaintView = () => {
//     const [startDate, setStartDate] = useState<Dayjs | null>(null); // State for date filter 
//     const [complaintType, setComplaintType] = useState(""); // State for complaint type filter
//     const [studentId, setStudentId] = useState(""); // State for student ID filter
//     const { attached, resident, messManager, authority } = useResidencyStatus();

//     const { data, loading, error } = useQuery(GET_COMPLAINTS, {
//         // Fetch all complaints
//         fetchPolicy: "network-only",
//     });
//     const { data: complaintTypeData, loading: complaintTypeLoading, error: complaintTypeError } = useQuery(GET_COMPLAINT_BY_TYPE, {
//         // Fetch all complaints
//         fetchPolicy: "network-only",
//     });
//     const { data: complaintDateData, loading: complaintDateLoading, error: complaintDateError } = useQuery(GET_COMPLAINT_FROM_DATE, {
//         // Fetch all complaints
//         fetchPolicy: "network-only",
//     });
//     const { data: complaintStudentIdData, loading: complaintStudentIdLoading, error: complaintStudentIdError } = useQuery(GET_COMPLAINT_BY_STD_ID, {
//         // Fetch all complaints
//         fetchPolicy: "network-only",
//     });
//     if (loading || complaintTypeLoading || complaintDateLoading || complaintStudentIdLoading) return <p>Loading...</p>;
    

//     // Filter complaints based on user roles
//     const filteredComplaints = data?.getComplaints.filter((complaint) => {
//         if (resident) {
//             // Students and residents can view all complaints
//             // and add complaints
//             return true;
//         } else if ((authority && !messManager) || attached) {
//             // Provosts and students with attached role can view complaints
//             // but not add complaints
//             return true;
//         }
//         // Handle other roles if needed
//         return false;
//     });

//     // Filter complaints based on complaint type
//     const filteredComplaintsByType = complaintTypeData?.getComplaintsByType.filter((complaint) => {
//         if (complaintType === "") {
//             return true;
//         } else if (complaintType === complaint.type) {
//             return true;
//         }
//         return false;
//     });

//     // Filter complaints based on date
//     const filteredComplaintsByDate = complaintDateData?.getComplaintsFromDate.filter((complaint) => {
//         if (startDate === null) {
//             return true;
//         } else if (startDate?.isSame(complaint.createdAt, "day")) {
//             return true;
//         }
//         return false;
//     });

//     // Filter complaints based on student ID
//     const filteredComplaintsByStudentId = complaintStudentIdData?.getComplaintsByStudentId.filter((complaint) => {
//         if (studentId === "") {
//             return true;
//         } else if (studentId === complaint.students[0].student9DigitId) {
//             return true;
//         }
//         return false;
//     });

//     // Handle filtering based on the selected date
//     const handleDateFilter = () => {
//         if (startDate) {
//             // Use the GET_COMPLAINT_FROM_DATE query to fetch complaints from date

//         } else {
//             // Handle case when no date is selected
//         }
//     };

//     // Handle filtering based on complaint type
//     const handleTypeFilter = () => {
//         if (complaintType) {
//             // Use the GET_COMPLAINT_BY_TYPE query to fetch complaints by type
//         } else {
//             // Handle case when no type is selected
//         }
//     };

//     // Handle filtering based on student ID
//     const handleStudentIdFilter = () => {
//         if (studentId) {
//             // Use the GET_COMPLAINT_BY_STD_ID query to fetch complaints by student ID
//         } else {
//             // Handle case when no student ID is entered
//         }
//     };

//     return (
//         <div>
//             asfasfas
//         </div>
//     );
// }







const SingleComplaint = (props: { complaint: GetComplaintsQuery['getComplaints'][0] }) => {
    
    return (
        <div style={{margin: 20, width: '100%'}}>
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
                {/* <div style={{color: "darkgrey"}}>
                    {props.complaint.messManager &&
                        <Typography variant={"body1"}>
                       <span><LocalOfferIcon />&nbsp;
                           Mess Manager</span>
                        </Typography>
                    }

                    {props.complaint.authority &&
                        <Typography variant={"body1"}>
                       <span><LocalOfferIcon />&nbsp;&nbsp;
                           Provost</span>
                        </Typography>
                    }
                </div> */}
                <div style={{ color: "darkgrey" }}>
                    {props.complaint.students && (
                        <Typography variant={"body1"}>
                        <span><LocalOfferIcon />&nbsp;
                            Student ID: {props.complaint.students[0].student9DigitId}
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
                    <ComplaintDetailsContent complaintTitle={props.complaint.title}
                                                complaintDetails={props.complaint.details}
                                                date={new Date(props.complaint.createdAt).toDateString()}
                                                //messManager={props.complaint.messManager}
                                                studentId={props.complaint.students[0].student9DigitId}
                                                studentName={props.complaint.students[0].name}
                    />
                </CustomizedDialog>
            }
        </div>
    )
}

const Complaints = () => {

    const router = useRouter();

    const {messManager, resident, authority} = useResidencyStatus();
    const [complaints, setcomplaints] = useState<GetComplaintsQuery['getComplaints']>([]);

    const [showDetails, setShowDetails] = useState<boolean>(false);

    const {data, loading, error} = useQuery(
        GET_COMPLAINTS, {
            fetchPolicy: "network-only",
            onCompleted: (data) => {
                console.log(data);
                setcomplaints(data.getComplaints);
            },
            onError: (error) => {
                console.log(error);
            }
        }
    )

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

    const handleSubmission = (title: string, details: string) => {
        console.log(title, details)

        addcomplaint({
            variables : {
                title : title,
                details : details,
                type : "stuff",
                // studentId : complaints[0].students[0].student9DigitId
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
            {
                (messManager || authority) && <div>
                <Button variant='contained' color="primary" size='large' style={{margin: 20}} onClick={handleShowDetails}>
                    +&nbsp;Add Complaint
                </Button>
            </div>
            }
            {
                showDetails &&
                <CustomizedDialog show={true} setShow={setShowDetails} cardTitle='Add Complaint'>
                    <AddComplaintContent handleSubmission={handleSubmission}
                                         date={new Date().toDateString()}
                                            //messManager={messManager}
                                            //student Id from complaint data
                                            studentId={complaints[0].students[0].student9DigitId}
                    />
                </CustomizedDialog>
            }
            {
                complaints.map((complaint, index) => {
                    return (
                        // my card with complaints title and details
                        //<MyCard key={index} title={<complaintTitle complaint={complaint}/>}>
                        <MyCard key={index} title={<ComplaintTitle complaint={complaint}/>}>
                            <SingleComplaint complaint={complaint}/>
                        </MyCard>

                    )
                })
            }
        </div>
    )
}





const ComplaintDetailsContent = (props: {
    complaintTitle?: string,
    complaintDetails?: string,
    date?: string,
    messManager?: boolean,
    studentId?: string,
    studentName?: string
}) => {
    return (
        <DialogContent dividers>
            <Typography variant={"h6"} gutterBottom style={{marginBottom: 20}}>
                <span><CampaignIcon/>&nbsp;&nbsp;&nbsp;<i>{props.complaintTitle}</i></span>
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
                    {/* <div style={{color: "darkgrey"}}>
                        {props.messManager &&
                            <Typography variant={"body1"}>
                       <span><LocalOfferIcon/>&nbsp;
                           Mess Manager</span>
                            </Typography>
                        }

                        {!props.messManager &&
                            <Typography variant={"body1"}>
                       <span><LocalOfferIcon/>&nbsp;&nbsp;
                           Provost</span>
                            </Typography>
                        }
                    </div> */}
                    <div style={{ color: "darkgrey" }}>
                        {props.studentId && (
                            <Typography variant={"body1"}>
                            <span><LocalOfferIcon />&nbsp;
                                Student ID: {props.studentId}
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
    studentId?: string,
    studentName?: string,
    date?: string,
    handleSubmission: (title: string, details: string) => void
}) => {

    const [title, setTitle] = useState<string>();
    const [details, setDetails] = useState<string>();

    const [error, setError] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleSubmission = () => {
        if(!title || !details) {
            setError(true);
            return;
        }
        setError(false)
        props.handleSubmission(title, details);
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
                            {props.studentId && (
                                <Typography variant={"body1"}>
                                <span><LocalOfferIcon />&nbsp;
                                    Student ID: {props.studentId}
                                </span>
                                </Typography>
                            )}
                        </div>
                            {/* {props.messManager &&
                                <Typography variant={"body1"}>
                                   <span><LocalOfferIcon/>&nbsp;
                                       Mess Manager</span>
                                </Typography>
                            }

                            {!props.messManager &&
                                <Typography variant={"body1"}>
                                   <span><LocalOfferIcon/>&nbsp;&nbsp;
                                       Provost</span>
                                </Typography>
                            } */}


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
            {/*<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias asperiores*/}
            {/*    aut culpa et excepturi illum nam numquam provident quo. Commodi dicta harum illo ipsum*/}
            {/*    itaque placeat sequi vel voluptatibus!*/}
            {/*</div>*/}
            {/*<div>Ab deleniti expedita facilis harum quam sint soluta voluptates! Animi assumenda,*/}
            {/*    delectus dicta dolorum excepturi magnam magni, odio odit omnis quae quam ratione*/}
            {/*    repudiandae rerum sint totam ut velit voluptas.*/}
            {/*</div>*/}
        </div>
    )
}


export default Complaints;