import useResidencyStatus from "../../hooks/useResidencyStatus";
import {useMutation, useQuery} from "@apollo/client";
import {GetComplaintsQuery} from "../../graphql/__generated__/graphql";
import {useContext, useState} from "react";
import {userContext} from "../../pages/_app";
import MyCard from "../card";
import {useRouter} from "next/router";
import {GET_COMPLAINT_BY_STD_ID, ADD_COMPLAINT} from "../../graphql/operations";
import SingleComplaint from "./SingleComplaint";
import AddComplaintContent from "./AddComplaint";
import ComplaintTitle from "./ComplaintTitle";

const Complaints = () => {

    const router = useRouter();
    const {user} = useContext(userContext);

    const {messManager, resident, authority} = useResidencyStatus();

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
            {
                complaints && complaints.map((complaint, index) => {
                    return (
                        <div key={index} style={{margin: 20}}>
                            <MyCard key={index} title={<ComplaintTitle complaint={complaint}/>} style={{width: '100%'}}>
                                <SingleComplaint complaint={complaint}/>
                            </MyCard>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Complaints;