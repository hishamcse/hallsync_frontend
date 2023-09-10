import { useLazyQuery, useQuery } from "@apollo/client"
import { GET_COMPLAINT_BY_ID } from "../../graphql/operations"
import { CSSProperties, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AddComplaintContent from "../../components/Complaints/AddComplaint";
import ProfileInfo from "../../components/Seat/ProvostSeat/ProfileInfo";
import MyCard from "../../components/card";
import { ComplaintDateAndId, ComplaintTitle } from "../../components/Complaints/SingleComplaint";
import useResidencyStatus from "../../hooks/useResidencyStatus";


export function ComplaintCard(props : {
    title : string,
    type : string,
    details : string,
    createdAt : string,
    student9DigitId : string,
    cardStyle? : CSSProperties,
    showDetailsDefault : boolean
}){
    let [showDetails, setShowDetails] = useState(props.showDetailsDefault);

    return (
        <MyCard title={<ComplaintTitle title={props.title} type={props.type} />} style={{
            display : "block",
            marginRight : 50,
            marginTop : 20,
            ... props.cardStyle
        }} >
        <div style={{
            color : "#FFE605",
        }}>
            Details
        </div>
        <div style={{
            // margin
            margin : 20,
            whiteSpace : "pre-wrap",
            ... (!showDetails && {
                whiteSpace : "nowrap",
                overflow : "hidden",
                textOverflow : "ellipsis",
                
            })

        }}>
            {props.details} 
        </div>
        <div style={{
            textAlign : "center"
        }}>
        {
                !showDetails && <a onClick={()=>{
                    setShowDetails(true);
                }} style={{
                    color : "#00868D",
                    cursor : "pointer"
                }}>
                    Read more
                </a>
            }
            {
                showDetails && <a onClick={()=>{
                    setShowDetails(false);
                }} style={{
                    color : "#00868D",
                    cursor : "pointer"
                }}>
                    Read less
                </a>
            }
        </div>
        <ComplaintDateAndId date={props.createdAt} student9DigitId={props.student9DigitId} />
        </MyCard>
    )
}

export function ComplaintDetails( props : {
    showSummary : boolean,
    complaintId : number
}){

    let [query, {data}] = useLazyQuery(GET_COMPLAINT_BY_ID);
    const router = useRouter();
    let [showDetails, setShowDetails] = useState(!props.showSummary);

    let detailsDivStyle = {};

    if(props.showSummary){
        detailsDivStyle = {
            whiteSpace : "nowrap",
            overflow : "hidden",
            textOverflow : "ellipsis"
        }
    }

    useEffect(()=>{

        query({
            variables : {
                complaintId : props.complaintId
            }
        })
    }, [props.complaintId])
    return (
        <div className="contentRoot">
            
            {
                data && 
                <>

                    <MyCard title={"Complaint From"} style={{
                        width : 500
                    }}>
                        <ProfileInfo info = {data?.getComplaint.student} />
                    </MyCard>
                    <ComplaintCard showDetailsDefault = {true} title={data?.getComplaint.title} 
                    type={data?.getComplaint.type} details={data?.getComplaint.details} 
                    createdAt={data?.getComplaint.createdAt} 
                    student9DigitId={data?.getComplaint.student.student9DigitId} />
                </>
            }
        </div>
    )
}

export default function ComplaintDetaislP(){
    const router = useRouter();
    const {complaintId} = router.query;
    if(typeof(complaintId) == 'string'){
        return (
            <ComplaintDetails complaintId={parseInt(complaintId)} showSummary={false} />
        )
    }
    else{
        return (
            <div className="contentRoo" style={{color : "white"}}>
                Invalid complaint id
            </div>
        )
    }
   
}