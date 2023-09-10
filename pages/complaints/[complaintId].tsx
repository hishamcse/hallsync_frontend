import { useLazyQuery, useQuery } from "@apollo/client"
import { GET_COMPLAINT_BY_ID } from "../../graphql/operations"
import { useEffect } from "react";
import { useRouter } from "next/router";
import AddComplaintContent from "../../components/Complaints/AddComplaint";
import ProfileInfo from "../../components/Seat/ProvostSeat/ProfileInfo";
import MyCard from "../../components/card";
import { ComplaintDateAndId, ComplaintTitle } from "../../components/Complaints/SingleComplaint";

export default function ComplaintDetails(){

    let [query, {data}] = useLazyQuery(GET_COMPLAINT_BY_ID);
    const router = useRouter();

    useEffect(()=>{
        if(router.query.complaintId && typeof(router.query.complaintId) === 'string'){

            let complaintId = parseInt(router.query.complaintId);
            query({
                variables : {
                    complaintId : complaintId
                }
            })
        }
    }, [router.query.complaintId])
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
                    <MyCard title={<ComplaintTitle title={data.getComplaint.title} type={data.getComplaint.type} />} style={{
                        display : "inline-block",
                        marginRight : 50,
                        marginTop : 20,
                    }} >
                    <div style={{
                        color : "#FFE605"
                    }}>
                        Details
                    </div>
                    <div style={{
                        // margin
                        margin : 20
                    }}>
                        {data.getComplaint.details}
                    </div>
                    <ComplaintDateAndId date={data.getComplaint.createdAt} student9DigitId={data.getComplaint.student.student9DigitId} />
                    </MyCard>
                </>
            }
        </div>
    )
}