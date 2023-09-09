import {GetComplaintsQuery} from "../../graphql/__generated__/graphql";
import {Typography} from "@mui/material";
import {DateRangeIcon} from "@mui/x-date-pickers";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const SingleComplaint = (props: { complaint: GetComplaintsQuery['getComplaints'][0] }) => {

    return (
        <div style={{margin: 20, width: '100%'}}>
            <div style={{color: "white", margin: 30}}>
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

export default SingleComplaint;