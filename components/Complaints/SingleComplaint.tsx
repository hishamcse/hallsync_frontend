import {GetComplaintsQuery} from "../../graphql/__generated__/graphql";
import {Typography} from "@mui/material";
import {DateRangeIcon} from "@mui/x-date-pickers";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MyCard from "../card";
import { getDayAndMonthAndYearString } from "../utilities";
import { MyButton } from "../button";
import { useRouter } from "next/router";

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

export function ComplaintTitle(props : {
    title : string, type : string
}){
    return (
        <div style={{
            display : "flex",
            justifyContent : "space-between"
        }}>
            <h4 style={{
                width : "70%"
            }}>
                {props.title}
            </h4>
            <h6 style = {{
                color : "#FFE605"
            }}>
                {
                    props.type
                }
            </h6>
        </div>
    )
}

export function SingleComplaint2(props : {
    complaint: GetComplaintsQuery['getComplaints'][0]
}){
    const router = useRouter();
    return (
        <MyCard title={
            <ComplaintTitle title={props.complaint.title} type={props.complaint.type} />
        } style={{
            width : 500
        }} >
            <div style={{
                whiteSpace : "nowrap",
                overflow : "hidden",
                textOverflow : "ellipsis",
                margin : "10px 10px"
            }}>

                {props.complaint.details}
            </div>
            <ComplaintDateAndId date={props.complaint.createdAt} student9DigitId={props.complaint.student.student9DigitId} />
            {/* <div style={{
                display : "flex",
                justifyContent : "space-between",
                marginTop : 30,
                marginBottom : 10
            }}>
                <div>
                    <DateRangeIcon /> {getDayAndMonthAndYearString(props.complaint.createdAt)}
                </div>
                <div style={{
                    color : "#00FFF5"
                }}>
                    {
                        props.complaint.student.student9DigitId
                    }
                </div>
            </div> */}
            <div style={{textAlign : "center", marginTop : 20}}>
                <MyButton text="More Details" type="submit" onClick={()=>{router.push(`/complaints/${props.complaint.complaintId}`)}} />
            </div>
        </MyCard>
    )
}

export function ComplaintDateAndId(props : {
    date : string,
    student9DigitId : string
}){
    return (
        <div style={{
            display : "flex",
            justifyContent : "space-between",
            marginTop : 30,
            marginBottom : 10
        }}>
            <div>
                <DateRangeIcon /> {getDayAndMonthAndYearString(props.date)}
            </div>
            <div style={{
                color : "#00FFF5"
            }}>
                {
                    props.student9DigitId
                }
            </div>
        </div>
    )

}