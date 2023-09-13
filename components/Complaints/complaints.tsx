import {useMutation, useQuery} from "@apollo/client";
import {GetComplaintsQuery} from "../../graphql/__generated__/graphql";
import {useContext, useState} from "react";
import {userContext} from "../../pages/_app";
import {useRouter} from "next/router";
import {GET_COMPLAINT_BY_STD_ID, ADD_COMPLAINT} from "../../graphql/operations";
import AddComplaintContent from "./AddComplaint";
import {ComplaintCard} from "../../pages/complaints/[complaintId]";
import {Title} from "../Seat/ProvostSeat/AppDetailsTitle";

const Complaints = () => {

    const router = useRouter();
    const {user} = useContext(userContext);

    const [complaints, setComplaints] = useState<GetComplaintsQuery['getComplaints']>([]);

    const isResident = user?.student?.residencyStatus === 'RESIDENT';
    const studentIdWithDefault = isResident ? user?.student?.studentId : -1;

    const {data} = useQuery(GET_COMPLAINT_BY_STD_ID, {
        variables: {
            studentId: studentIdWithDefault ?? 0,
        },
        onCompleted: (data) => {
            console.log(data);
            if (isResident) {
                setComplaints(data.getComplaintsByStudent);
            }
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const [addComplaint] = useMutation(
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

    const handleSubmission = (title: string, details: string, type: string) => {
        console.log(title, details, type)

        addComplaint({
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
            <AddComplaintContent handleSubmission={handleSubmission}
                                 date={new Date().toDateString()}
                                 studentId={studentIdWithDefault}
            />
            <Title text="Your Previous Complaints"/>
            {
                complaints && complaints.map((complaint, index) => {
                    return (
                        <ComplaintCard showDetailsDefault={false} title={complaint.title} createdAt={complaint.createdAt}
                                       details={complaint.details} student9DigitId={complaint.student.student9DigitId}
                                       type={complaint.type} key={complaint.complaintId} cardStyle={{
                            marginLeft: 30,
                            marginRight: 30
                        }}/>
                    )
                })
            }
        </div>
    )
}

export default Complaints;