import {DialogContent, Typography} from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";
import MyCard from "../card";
import {DateRangeIcon} from "@mui/x-date-pickers";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const CardContent = (props: { complaintDetails?: string }) => {
    return (
        <div style={{color: "white", margin: 10, fontSize: 17}}>
            {props.complaintDetails}
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
    student9DigitId?: string,
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
                <div style={{display: 'flex', justifyContent: 'space-between', margin: 20}}>
                    <div style={{color: "darkgrey", marginRight: 20}}>
                        <Typography variant={"body1"}>
                            <span><DateRangeIcon/>&nbsp;&nbsp;&nbsp;{props.date}</span>
                        </Typography>
                    </div>

                    <div style={{color: "darkgrey"}}>
                        {props.student9DigitId &&
                            <Typography variant={"body1"}>
                                <span><LocalOfferIcon/>&nbsp;Student ID: {props.student9DigitId}</span>
                            </Typography>
                        }
                    </div>

                </div>
            </Typography>
        </DialogContent>
    )
}

export default ComplaintDetailsContent;