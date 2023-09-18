import MyCard from "../../card";
import styles from '../../../styles/studentSeat.module.scss';
import {ChangeEvent, useState} from "react";
import MUIDropdown from "../../MUIDropdown";
import * as React from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import QuestionBox from "../QuestionBox";
import Agreement from "./Agreement";
import {types} from "./StudentView";
import {useMutation} from "@apollo/client";
import {POST_NEW_APPLICATION, RESUBMIT_APPLICATION} from "../../../graphql/operations";
import {useRouter} from "next/router";
import {ApplicationDetailsQuery, ApplicationStatus} from "../../../graphql/__generated__/graphql";
import {FreeRoom} from "../freeRoom";
import {UploadedDocsList} from "../UploadedDocsList";
import {UploadDocs} from "../UploadDocs";
import {MyButton} from "../../button";
import {getDayAndMonthAndYearString, uploadFileToServer} from "../../utilities";

const Questionnaire = (props: { answers: React.Dispatch<React.SetStateAction<boolean>>[] }) => {
    return (
        <div className={styles.questionnaire}>
            <QuestionBox text="From Outside of Dhaka" checkBox={true} answer={props.answers[0]}/>
            <QuestionBox text="No Close Realtive in Dhaka" checkBox={true} answer={props.answers[1]}/>
            <QuestionBox text="School/College Outside of Dhaka" checkBox={true}/>
            <QuestionBox text="BUET Bus Route within walking distance" checkBox={true}/>
            {/* <QuestionBox text="Dummy question" checkBox={true}/>
            <QuestionBox text="Dummy question" checkBox={false} dropDown={["none", "hello", "hi"]}/>
            <QuestionBox text="Dummy question" checkBox={true}/> */}
        </div>
    )
}

const RoomAlloted = (props: {
    student?: ApplicationDetailsQuery['applicationDetails']['student']
}) => {

    let floor, roomNo, seatLabel;
    let initVal = undefined;
    if (props?.student?.residency?.seat) {
        floor = props?.student?.residency?.seat.room.floor.floorNo;
        roomNo = props?.student?.residency?.seat.room.roomNo;
        seatLabel = props?.student?.residency?.seat.seatLabel;
        initVal = {
            floorNo: floor,
            roomNo: roomNo,
            seatLabel: seatLabel
        };
    }


    return (
        <div style={{justifyContent: 'left', width: 500, paddingTop: 15, marginTop: 20}}>
            <div style={{justifyContent: 'space-between'}}>
                <FreeRoom initVal={initVal} disabled={true} setSeatId={() => {
                }} containerStyle={{}}/>
            </div>
        </div>
    )
}

const NewSeat = (props: {
    changeType: (event: SelectChangeEvent) => void,
    application?: ApplicationDetailsQuery['applicationDetails']

}) => {
    const [type, setType] = useState('New Seat');

    const [q1Ans, setQ1Ans] = useState(false);
    const [q2Ans, setQ2Ans] = useState(false);

    const [agreed, setAgreed] = useState(!!props.application);
    const [showError, setShowError] = useState(false);
    const [reqError, setReqError] = useState(false);
    const [reqErrorMsg, setReqErrorMsg] = useState('');

    const [files, setFiles] = useState<File[]>([])

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        console.log(event)
        setFiles((f) => {
            if (event.target.files && event.target.files[0] )
                return [...f, event.target.files[0]]
            return f;
        })
    }

    function removeFile(f1: File) {
        setFiles(f => {
            let fc = [...f]
            fc.splice(fc.indexOf(f1))
            return fc
        })
        // files.splice(files.indexOf(f));
    }


    const router = useRouter();

    const [newSeatApplication, {error, loading, data}] = useMutation(
        POST_NEW_APPLICATION
        , {
            onError: (error) => {
                setReqError(true)
                setReqErrorMsg(error.message)
            },
            onCompleted: (data) => {
                console.log(data);
                if (data.newSeatApplication)
                    router.push('./prevApplication');
                else
                    setReqError(true)
            }
        })

    const [resubmitQuery, {}] = useMutation(
        RESUBMIT_APPLICATION
    )

    const allQuestionsAnswered = [setQ1Ans, setQ2Ans];


    async function handleSubmit() {
        if (!agreed) {
            setShowError(true);
            return;
        }
        let id: number[] = []
        if (files.length > 0) {
            try {
                id = await uploadFileToServer(files);
            } catch (err) {
                setReqError(true);
                return;
            }
        }
        if (props.application?.status == ApplicationStatus.Revise) {
            resubmitQuery({
                variables: {
                    addedFileIds: {
                        array: id
                    },
                    removedFilesIds: {
                        array: removedFileIds
                    },
                    applicationId: props.application.applicationId
                },
                onCompleted: () => {
                    router.push('/application/prevApplication')
                },
                onError: (err) => {
                    console.log(err);
                    setReqError(true);
                    setReqErrorMsg(err.message);
                }
            })
        } else {
            newSeatApplication({
                variables: {
                    attachedFileIds: {
                        array: id
                    },
                    q1: q1Ans,
                    q2: q2Ans
                },
                onCompleted: () => {
                    router.push('/application/prevApplication')
                },
                onError: (err) => {
                    console.log(err);
                    setReqError(true);
                    setReqErrorMsg(err.message);
                }
            })
        }


    }

    const [removedFileIds, setRemovedFileIds] = useState<number[]>([]);

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
        props.changeType(event);
    };

    const handleAgreement = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAgreed(event.target.checked);
        setShowError(false);
    }

    let agreementDisabled = props.application != undefined && (props.application.status !== 'REVISE');

    return (
        <div style={{marginBottom: 20}}>
            {!props.application &&
                <div style={{display: 'flex', justifyContent: 'right', marginRight: 20, marginBottom: 20}}>
                    <MUIDropdown width={200} options={[types[0], types[1]]} val={type} change={handleChange}/>
                </div>
            }
            <div className={styles.row}>
                <MyCard title='Questionnaire'>
                    <Questionnaire answers={allQuestionsAnswered}/>
                </MyCard>

                <div style={{
                    display: "inline-block",
                    width: 500
                }}>
                    {
                        props.application &&
                        <MyCard title={(props.application ? 'Uploaded ' : 'Upload ') + 'Documents'} style={{
                            width: 500
                        }}>
                            <UploadedDocsList files={props.application.attachedFiles}
                                              removal={props.application.status == ApplicationStatus.Revise ? {
                                                  removedFileIds: removedFileIds,
                                                  setRemovedFileIds: setRemovedFileIds
                                              } : undefined}/>

                        </MyCard>
                    }
                    {
                        (!props.application || props.application.status == ApplicationStatus.Revise) &&
                        <MyCard title="Upload Documents" style={{
                            width: 500, marginTop: 10
                        }}>
                            <UploadDocs files={files} onChange={handleFileChange} removeFile={removeFile}/>
                        </MyCard>
                    }
                </div>

            </div>
            <div className={styles.row}>
                {
                    (props?.application?.status == ApplicationStatus.Accepted ||
                        props?.application?.status == ApplicationStatus.Rejected) &&
                    <MyCard title='Room Allotment'>
                        <RoomAlloted student={props?.application.student}/>
                    </MyCard>
                }
            </div>
            {
                props.application?.status == ApplicationStatus.Revise &&
                <MyCard title={"Revision Remarks"} style={{width: 500, marginLeft: 30}}>
                    <ol style={{
                        marginTop: 20
                    }}>
                        {
                            props.application.revisions && props.application.revisions.map((rev, index) => {
                                return (
                                    <li key={index}>
                                        {getDayAndMonthAndYearString(rev.createdAt)} : {rev.reason}
                                    </li>
                                )
                            })
                        }
                    </ol>
                </MyCard>
            }

            <div className={styles.agreement}>
                <MyCard title=''>
                    <Agreement disabled={agreementDisabled} handleAgreement={handleAgreement}/>
                </MyCard>
                <div style={{color: 'red', fontSize: 14, textAlign: 'center', minHeight: 30}}>
                    {
                        showError && <span>Please agree to the terms and conditions</span>
                    }
                    {
                        reqError && <span>{reqErrorMsg}</span>
                    }
                </div>
            </div>

            <div className={styles.submit}>
                {
                    !agreementDisabled &&
                    <MyButton text="Submit" type="submit" onClick={handleSubmit}/>
                }
            </div>

        </div>
    )
}

export default NewSeat;