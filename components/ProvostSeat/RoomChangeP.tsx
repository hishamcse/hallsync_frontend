import Card from "@mui/material/Card";
import styles from "../../styles/studentSeat.module.scss";
import MyCard from "../card";
import ProfileInfo from "./ProfileInfo";
import Confirmation from "./Confirmation";
import * as React from "react";
import MUIStyledTextarea from "../MUITextArea";
import ResidentTable from "./ResidentTable";
import {ApplicationDetailsQuery} from "../../graphql/__generated__/graphql";
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {APPROVE_SEAT_CHANGE_APPLICATION, REJECT_APPLICATION} from "../../graphql/operations";
import {useRouter} from "next/router";

const ReasonForChange = (props : {reason: string}) => {
    return (
        <div style={{justifyContent: 'left', paddingTop: 15}}>
            <MUIStyledTextarea rows={10} placeHolder={props.reason} disabled={true}/>
        </div>
    )
}

const RoomPreference = (props: {room: number}) => {
    return (
        <div style={{justifyContent: 'left', width: 400, paddingTop: 15, margin: 'auto'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
                <div>
                    Room No: {props.room.toString()}
                </div>
            </div>
        </div>
    )
}

const RoomResidents = (props: {room: number,
    seatChangeApp: ApplicationDetailsQuery['applicationDetails']['seatChangeApplication']}) => {

    return (
        <div style={{justifyContent: 'left', width: 500, paddingTop: 15, margin: 'auto'}}>
            <div style={{marginBottom: 20}}>
                <h5>Room No: &nbsp; {props.room.toString()}</h5>
            </div>
            <div>
                <ResidentTable seatChangeApp={props.seatChangeApp}/>
            </div>
        </div>
    )
}

const RoomChangeP = (props: {application: ApplicationDetailsQuery['applicationDetails']}) => {

    const router = useRouter();
    const [reqError, setReqError] = useState(false);
    const [reqErrorMsg, setReqErrorMsg] = useState('');

    const temp_chng = props.application.seatChangeApplication?.reason;
    const seat = props.application.seatChangeApplication?.toSeat;

    const floor = seat?.room.floor.floorNo;
    const block = seat?.room.floor.roomLabelLen;
    const roomNo = seat?.room.roomNo;

    let num = 0;

    if(floor && block && roomNo) {
        num = Math.pow(10, block - 1);
        num = num * floor + roomNo;
    }

    const [approveMutation, {}] = useMutation(
        APPROVE_SEAT_CHANGE_APPLICATION
        , {
            onError : (error)=>{
                setReqError(true)
                setReqErrorMsg(error.message)
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
            },
            onCompleted : (data)=>{
                // console.log(data);
                router.push('/seatManagement');
            }
        }
    )

    function approve(){
        const seatId = props.application.seatChangeApplication?.toSeatId;

        console.log(seatId)
        console.log(props.application.seatChangeApplication?.seatChangeApplicationId)

        approveMutation({
            variables : {
                seatChangeApplicationId : props.application.seatChangeApplication?.seatChangeApplicationId || 0,
                seatId: seatId || 0
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

    return (
        <div style={{marginBottom: 20}}>
            <Card style={{margin: 30, textAlign: 'center', padding: 10, border: "1px solid white",
                borderRadius: 10, backgroundColor: 'black'}}>
                <h4>Room Change Application</h4>
            </Card>
            <div className={styles.newSeat} style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{margin: 25,}}>
                    <div style={{marginBottom: 50}}>
                        <MyCard style={{
                            display : "block",
                            flexGrow : "1", paddingLeft: 10
                        }} content={<ReasonForChange reason={temp_chng || ''}/>} title='Reason for change'/>
                    </div>
                    <div>
                        <MyCard content={<RoomResidents room={num} seatChangeApp={props.application.seatChangeApplication}/>}
                                title='Room Residents'/>
                    </div>
                </div>
                <div style={{margin: 25, marginRight: 25}}>
                    <div style={{marginBottom: 80}}>
                        <MyCard style={{
                            display : "block",
                            flexGrow : "1"
                        }} content={<ProfileInfo info={props.application.student}/>} title='Profile'/>
                    </div>
                    <div>
                        <MyCard style={{
                            display : "block",
                            flexGrow : "1"
                        }} content={<RoomPreference room={num}/>} title='Given Room Preference' />
                    </div>
                </div>
            </div>

            { (props.application.status == "PENDING")  &&
                <div className={styles.submit}>
                    {reqError && <div style={{color: 'red', fontSize: 14, textAlign: 'center'}}>
                        {reqErrorMsg}</div>}
                    <MyCard content={<Confirmation rejectHandler={reject} successHandler={approve}/>} title=''/>
                </div>
            }

        </div>
    )
}

export default RoomChangeP