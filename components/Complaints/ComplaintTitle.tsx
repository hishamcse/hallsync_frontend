import {GetComplaintsQuery} from "../../graphql/__generated__/graphql";
import {useState} from "react";
import {Button, Typography} from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";
import CustomizedDialog from "../MUIDialog";
import ComplaintDetailsContent from "./ComplaintDetails";

const ComplaintTitle = (props: { complaint: GetComplaintsQuery['getComplaints'][0] }) => {

    const [showDetails, setShowDetails] = useState<boolean>(false);
    const handleShowDetails = () => {
        setShowDetails(!showDetails);
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
                                              complaintType={props.complaint.type}
                                              date={new Date(props.complaint.createdAt).toDateString()}
                                              studentId={props.complaint.student.studentId}
                                              student9DigitId={props.complaint.student.student9DigitId}
                                              studentName={props.complaint.student.name}
                    />
                </CustomizedDialog>
            }
        </div>
    )
}

export default ComplaintTitle;