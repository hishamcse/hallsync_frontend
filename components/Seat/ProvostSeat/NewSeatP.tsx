import QuestionBox from "../QuestionBox";
import {Button} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import styles from '../../../styles/studentSeat.module.scss';
import MyCard from "../../card";
import Confirmation from "./Confirmation";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {DateTimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";
import {ApplicationDetailsQuery, ApplicationStatus} from "../../../graphql/__generated__/graphql";
import {FreeRoom} from "../freeRoom";
import {APPROVE_NEW_SEAT_APPLICATION, REJECT_APPLICATION, REVISE_APPLICATION} from "../../../graphql/operations";
import {useMutation} from "@apollo/client";
import {useRouter} from "next/router";
import ProfileInfo from "./ProfileInfo";
import { Title } from "./AppDetailsTitle";
import { UploadedDocsList } from "../UploadedDocsList";
import CustomizedDialog from "../../MUIDialog";
import MUIStyledTextarea from "../../MUITextArea";
import { MyButton } from "../../button";

const Questionnaire = (props: {answers: boolean[]}) => {
    return (
        <div className={styles.questionnaire}>
            <QuestionBox text="From Outside of Dhaka" checkBox={true} checked={props.answers[0]} disabled={true}/>
            <QuestionBox text="No Close Realtive in Dhaka" checkBox={true} checked={props.answers[1]} disabled={true}/>
            <QuestionBox text="College Outside of Dhaka" checkBox={true} disabled={true}/>
            <QuestionBox text="School Outside of Dhaka" checkBox={true} disabled={true}/>
            <QuestionBox text="Dummy question" checkBox={true} disabled={true}/>
            <QuestionBox text="Dummy question" checkBox={false} dropDown={["none", "hello", "hi"]}/>
            <QuestionBox text="Dummy question" checkBox={true} />
        </div>
    )
}


const RoomAllotment = (props : {
    setSeatId : (v : number | undefined)=>void,
    disabled: boolean,
    student?: ApplicationDetailsQuery['applicationDetails']['student']
}) => {

    let floor, roomNo, seatLabel;
    let initVal = undefined;
    if(props?.student?.residency?.seat){
        floor = props?.student?.residency?.seat.room.floor.floorNo;
        roomNo = props?.student?.residency?.seat.room.roomNo;
        seatLabel = props?.student?.residency?.seat.seatLabel;
        initVal =  {
            floorNo : floor,
            roomNo : roomNo,
            seatLabel : seatLabel
        };
    }


    return (
        <div style={{justifyContent: 'left', width: 500, paddingTop: 15, marginTop: 20}}>
            <div style={{ justifyContent: 'space-between'}}>
                {
                    !props.disabled &&
                    <FreeRoom setSeatId={props.setSeatId} autoAssign />
                }
                {
                    props.disabled &&
                    <FreeRoom initVal={initVal} disabled = {props.disabled} setSeatId={props.setSeatId} containerStyle={{
                    }} />
                }
            </div>
        </div>
    )
}

const ScheduleAppointment = () => {
    const [value, setValue] = useState<Dayjs | null>();

    return (
        <div style={{justifyContent: 'left', width: 500, paddingTop: 15, marginTop: 20}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker label="Schedule date and time" value={dayjs(value)}
                                        onChange={(newValue) => setValue(newValue)}/>
                </LocalizationProvider>
                <Button variant="outlined" color='primary'>Confirm Appointment</Button>
            </div>
        </div>
    )
}

const NewSeatP = (props: {application: ApplicationDetailsQuery['applicationDetails']}) => {
    const router = useRouter();
    const [seatId ,setSeatId] = useState<number>();

    const [blankError, setBlankError] = useState(false);
    const [reqError, setReqError] = useState(false);
    const [reqErrorMsg, setReqErrorMsg] = useState('');

    let newApplication = props.application.newApplication;

    let answers = [false, false];

    if(newApplication) {
        answers = [newApplication.questionnaire.q1, newApplication.questionnaire.q2]
    }

    const [approveMutation, {}] = useMutation(
        APPROVE_NEW_SEAT_APPLICATION
        , {
            onError : (error)=>{
                setReqError(true)
                setReqErrorMsg(error.message)
                setBlankError(false);
            },
            onCompleted : (data)=>{
                // console.log(data);
                router.push('/seatManagement');
            }
        }
    )
    const [rejectMutation, {}] = useMutation(
        REJECT_APPLICATION
        , {
            onError : (error)=>{
                setReqError(true)
                setReqErrorMsg(error.message)
                setBlankError(false);
            },
            onCompleted : (data)=>{
                // console.log(data);
                router.push('/seatManagement');
            }
        }
    )

    const [reviseMutation, {}] = useMutation(REVISE_APPLICATION,{
        onCompleted : ()=> router.push('/seatManagement')
    })

    function approve(){
        if(!seatId || !props.application?.newApplication?.newApplicationId){
            setBlankError(true);
            return;
        }

        setBlankError(false);

        approveMutation({
            variables : {
                newApplicationId : props.application?.newApplication?.newApplicationId,
                seatId : seatId
            }
        }).then(r => {
            console.log(r)
        })
    }

    function reject(){
        rejectMutation({
            variables: {
                applicationId: props.application.applicationId
            }
        }).then(r => {
            console.log(r)
        })
     }
    
    function revise(){
        if(val == undefined || val.trim() == '') return;
        reviseMutation({
            variables : {
                applicationId : props.application.applicationId,
                reason : val
            }
        })
    }

    const [show, setShow] = useState(false);
    const [val, setVal] = useState<string>();

    return (
        <div style={{marginBottom: 20}}>
            <Title text="New Seat Application" />
            <div className={styles.row}>
                
                <MyCard title='Questionnaire'>
                    <Questionnaire answers={answers}/>
                </MyCard>
                <div className={styles.profDocCol}>
                    <MyCard title='Profile' style={{
                        minWidth : 500
                    }}>
                        <ProfileInfo info={props.application.student}/>
                    </MyCard>
                    <MyCard title='Documents'>
                        <UploadedDocsList files={props.application.attachedFiles}/>
                        {/* {<Documents files={props.application.attachedFiles}/>} */}
                    </MyCard>
                </div>
            </div>
            <br/>
            <div className={styles.row}>
                
                <MyCard  title='Room Allotment'>
                    {<RoomAllotment setSeatId={setSeatId}
                    disabled={props.application.status == ApplicationStatus.Accepted ||
                    props.application.status == ApplicationStatus.Rejected} student={props.application.student} />}
                </MyCard>
                <MyCard title='Schedule Appointment'>
                    <ScheduleAppointment />
                </MyCard>
            </div>

            { (props.application.status == "PENDING")  &&
                <div className={styles.submit}>
                    <div  style={{color: 'red', fontSize: 14, textAlign: 'center', minHeight : 30}}> 
                        {
                            blankError && <span>Please fill in all the fields</span>
                        }
                        {
                            reqError && <span>{reqErrorMsg}</span>
                        }
                    </div>
                    {/* <MyCard  title=''> */}
                        <Confirmation reviseHandler={()=>{setShow(true)}} includeRevise = {true} rejectHandler={reject} successHandler={approve}/>
                    {/* </MyCard> */}
                </div>
            }
            <CustomizedDialog
                cardTitle="Revise Application"
                show={show}
                setShow={setShow}>

                <div style={{
                    padding : 10
                }}>
                    <MUIStyledTextarea placeHolder="Remark" rows={10} val={val ?? ''} handleInput={setVal} />
                </div>
                <div style={{
                    textAlign : "center",
                    marginBottom : 20
                }}>
                    <MyButton buttonProps={ {
                        disabled : val == undefined || val.trim() == '',
                    }} onClick={revise} text = "Confirm" type="submit" />
                </div>
            </CustomizedDialog>
        </div>
    )
}

export default NewSeatP;